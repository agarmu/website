+++
title = " Simple Algebra System in Haskell"
date = "2024-06-02"
description = "We build a tool to handle polynomials in Haskell"
+++
The idea of a single-variable
[polynomial](https://en.wikipedia.org/wiki/Polynomial) and its associated
operations of addition, multiplication, and evaluation are ideas that most are
familiar with from grade school. In calculus courses, we are further introduced
to the idea of
[differentiating](https://web.mit.edu/wwmath/calculus/differentiation/polynomials.html)
these polynomials. Of course, these calculations are fairly easy to perform,
especially for smaller polynomials. Yet when polynomials are more than just a
few terms, it becomes difficult to manipulate them manually. Thankfully,
computers exist; there are many programs called
[computer algebra systems](https://en.wikipedia.org/wiki/Computer_algebra_system),
which exist to perform computations on objects like these.

### Goals

Unfortunately, most computer algebra systems are too complicated to learn to
hack/tinker within a single day. To this end, this blog post will explore how we
can build a **basic** computer algebra system with which you can:

- construct polynomials
- represent basic operations on polynomials (e.g., addition, multiplication)
- evaluate polynomials at a certain point
- differentiate polynomials

The language I'm going to use in this blog post will be the functional
programming language [Haskell](https://www.haskell.org/). Though not required, I
would recommend that anyone who follows along uses a functional programming
language like Haskell or [OCaml](https://ocaml.org/).

The reason for this choice is twofold. Firstly, the paradigms that functional
programming uses lend themselves well to the kind of program I want to write in
this post, creating a program that explains itself very well while also being
surprisingly terse. Secondly, functional programs are a useful great tool that
can be fun to use, and constructing a polynomial evaluator can serve as a fairly
gentle introduction to this useful tool.

## Setup

We need to take care of a few things before you can write Haskell code; I
recommend going with the remote environment unless you already have some
familiarity with Haskell.

### Replit Setup

I have created a [Replit project](https://replit.com/@agarmu/CASStarter#app)
that can serve as a base for your work! I would recommend creating a fork of it
and working there.

### Local Setup

To prepare for writing Haskell code, I would recommend downloading it via
`GHCup`, as documented
[here on the Haskell website](https://www.haskell.org/downloads/). I would also
recommend some kind of development environment;
[Visual Studio Code](https://code.visualstudio.com/) with the Haskell plugin is
probably fine. You can then download the
[Replit project](https://replit.com/@agarmu/CASStarter#app) I created as a
`.zip` file, unzip it, and use it as the base directory for your project.

## Current structure

For this article, let's only worry about the `Main.hs` file you see (the rest
are build artifacts/tooling and are somewhat outside the scope of this article).
It should look like this:

```hs
module Main where

-- define a polynomial type here

-- pretty-printing a polynomial

-- evaluate a polynomial at a given point

-- differenting a polynomial

{--
challenge: extensions!
--}
main :: IO ()
main = putStrLn "Ready to CAS!"
```

Don't worry if this seems intimidating -- we're going to break down this Haskell
file. At the top of the file, we declare a module, `Main`, which Haskell expects
to contain a `main` function (seen at the bottom) of the file. The first line of
the function declares its type to be `main :: IO ()` -- that is, `main` is a
function which takes _no input_ and _returns nothing_ and performs IO operations
[^1]. The next line defines the function of `main` -- it prints the line "Ready
to CAS!" to its standard output. Above `main`, there are several lines of
comments.

[^1]:
    It is natural to feel that declaring an `IO` operation explicitly is at
    least somewhat odd. Haskell is what is called a
    [pure language](https://en.wikipedia.org/wiki/Purely_functional_programming),
    which makes this explicitness necessary but can also have many positive
    effects. For instance, pure languages are often also
    [lazy](https://en.wikipedia.org/wiki/Lazy_evaluation), which means, e.g.,
    that the Fibonacci sequence can be declared as an infinite list, like so:

    ```hs
    fibs = 0 : 1 : zipWith (+) fibs (tail fibs)
    ```

    More details on this example are found
    [at this StackOverflow post](https://stackoverflow.com/questions/6273621/understanding-a-recursively-defined-list-fibs-in-terms-of-zipwith).

In the remainder of this article, we will go through the steps in each comment
to create a basic CAS. At the end of each step, I link a full copy of the
`Main.hs` file so you can check your progress.

## Step 1: Defining a Polynomial Type

### Monomials

Let's get started understanding what the structure of our polynomial will be. At
the most basic level, a polynomial is a
[monomial](https://en.wikipedia.org/wiki/Monomial), meaning that it is of the
form \(c x^n\) for some real number \(c\) and some natural number \(n\).

This is a good start to defining our polynomial type! In Haskell, a
user-constructed
[algebraic datatype](https://en.wikipedia.org/wiki/Algebraic_data_type) is
denoted as:

```hs
data [type_name] = ...
```

In our case, let's name our type `Polynomial` and have it be equal to
`Monomial Float Int`:

```hs
data Polynomial = Monomial Float Int
```

This essentially means that `Polynomial` has a single possible "variant" it can
be, which is a `Monomial` with an associated floating point number (\(c\)) and an
integer (\(n\)).

### Interlude 1: Running our program

Now that we have a basic structure, let's execute some Haskell code! In the
shell, enter the following (substituting `app/Main.sh` for wherever your Haskell
file is located).

```sh
$ ghci app/Main.sh
```

You should get a response similar to the following:

```
GHCi, version 9.4.8: https://www.haskell.org/ghc/  :? for help
[1 of 2] Compiling Main             ( app/Main.hs, interpreted )
Ok, one module loaded.
```

This means that the module we've been working with has been successfully loaded
into GHCi (the interactive version of the Glasgow Haskell Compiler).

Let's try to construct a monomial! Enter the following into `ghci` to construct
the monomial \(25.3 x^4\):

```hs
ghci> Monomial 25.3 4
```

**Oops.** Looks like there was an error. GHCi was able to construct the monomial
just fine, but it doesn't know how to display it for you just yet (this is an
issue we will remedy later). For now, just enter the following:

```hs
ghci> :t Monomial 25.3 4
Monomial 25.3 4 :: Polynomial
```

This time, GHCi responds. The `:t` command instructs GHCi to display the type of
something; it has responded to you that you have just created a monomial!

You can play around with a few more monomials and then exit GHCi naturally with
`(^D)`.

### More than just monomials

Monomials are _fun_, but there's not much one can do with them. It's time to
expand to other structures.

One key fact that we can use is that all polynomials \(p\) can be written as
\(p(x) = c_0 + c_1 x + c_2 x^2 + c_3 x^3 + ...\) -- that is, _all polynomials can
be written as the sum of monomials_.

Of course, we know that a sum of polynomials is a binary function, i.e.
\[+: P \times P \mapsto P,\] where \(P\) is the set of polynomials (which we use).
This mathematical model can be translated directly into Haskell; we can add this
behavior with another variant for our type definition.

```hs
data Polynomial = Monomial Float Int | Sum Polynomial Polynomial
```

Now, a polynomial can either be a _single_ term or the sum of two other
polynomials.

### Try it yourself!

Though not strictly required since all polynomials can be expressed as sums of
other polynomials, it is often convenient to represent polynomial
multiplication. Try doing this on your own!

Once you're done with that, we've successfully defined a polynomial type, which
we will continue to work with. If you get stuck/lost anywhere, here's a
[GitHub Gist](https://gist.github.com/agarmu/975719dfaf66e37d719f4c94d9bf62d3)
with the source code at this step.

## Step 2: Printing our polynomials

Now that we've defined a polynomial type, we should find a way to view it easily
in GHCi. Doing this requires a function that maps a polynomial to a string. In
fact, we will write a special type of function -- one that implements the `Show`
typeclass for `Polynomial`.

A typeclass in Haskell is similar to an "interface" in another language; all
members of a typeclass have certain properties & behaviors. Members of the
`Show` typeclass, in particular, are recognizable by GHCi as things that can be
"printed".

To do this, we must have as the first line of our declaration:

```hs
instance Show Polynomial where
```

This declares the type `Polynomial` to be a member of the typeclass `Show`;
Haskell now expects that you provide an implementation of the associated `show`
function for `Polynomial`.

It is now that Haskell's abilities truly shine. Haskell has very strong pattern
matching, which makes defining the `show` function fairly easy. For each variant
of `Polynomial` we define a separate line that explains how the contents must be
shown.

First, let's look at a monomial. Both `Float` and `Int` are members of the
typeclass `Show`, so we can run the `show` function upon them to get string
representations of each. We also use the `++` operator for concatenation. We put
the defintion for showing a monomial indented under our previous line, yielding:

```hs
instance Show Polynomial where
 show (Monomial c n) = show c ++ "x^" ++ show n
```

Similarly, for addition, we know that if we take the sum of two polynomials,
then their string representation can be achieved by placing a `+` between the
two individual polynomials.

```hs
instance Show Polynomial where
 show (Monomial c n) = show c ++ "x^" ++ show n
 show (Sum p1 p2) = show p1 ++ " + " show p2
```

It's _that_ simple.

### Try it yourself!

As before, try to implement `Show` for a product of two polynomials. Make sure
to include parentheses as necessary to preserve the order of operations.

Also, notice that if you have the polynomial \(p(x) = 15\), then it will be
rendered by `show` as `15x^0`, which is perhaps not the most optimal way to
render it. By using the knowledge that Haskell picks earlier definitions before
later ones, can you modify your definition such that it renders polynomials like
the above correctly?

You can test your program with the following inputs/outputs in GHCi:

A simple sum:

```hs
ghci> Sum (Monomial 25 1) (Sum (Monomial 3 2) (Monomial 4 0))
25.0x^1 + 3.0x^2 + 4.0
```

A sum within a product:

```hs
ghci> Product (Monomial 25 1) (Sum (Monomial 3 2) (Monomial 4 0))
(25.0x^1) * (3.0x^2 + 4.0)
```

Lots of nesting:

```hs
ghci> Sum (Product (Monomial 3 0) (Sum (Monomial 4 1) (Monomial 3 5))) (Product (Monomial 1 1) (Monomial 1 4))
(3.0) * (4.0x^1 + 3.0x^5) + (1.0x^1) * (1.0x^4)
```

If you get stuck somewhere, here's a
[GitHub Gist](https://gist.github.com/agarmu/2f7abd000873076a6e6bef1bd7d2f9dc)
to help you get back on track.

## Step 3: Evaluation

### Interlude 2: Type signatures

This is a pretty easy step compared to the last one, so I'm going to use it to
explain some things about Haskell. Imagine that we are about to write a function
that maps a polynomial to a floating point value, which in Haskell would be
written as:

```hs
mapper :: Polynomial -> Float
```

That's not too bad. But now imagine that our function took a polynomial, a
floating point value, and then evaluated the polynomial at that floating point
value. Then the type signature would be:

```hs
eval :: Polynomial -> Float -> Float
```

Why are there _two_ arrows? It turns out Haskell exhibits a behavior called
[currying](https://en.wikipedia.org/wiki/Currying), where a function that takes
multiple inputs is actually a _sequence_ of functions that take one input at a
time. Using this paradigm, we can create functions of type `Float -> Float` by
[partially applying](https://en.wikipedia.org/wiki/Partial_application) the
first argument of `eval`. Thankfully, we don't have to deal with this _just_
yet, but don't be alarmed if you see something of this sort; it's just a
function that takes multiple inputs.

### Implementing `eval`

The `eval` function we define is not related to a typeclass, so we define it
with less syntax:

```hs
eval :: Polynomial -> Float -> Float
eval (Monomial c n) x = c * (x ^ n)
```

### Try it yourself!

Try implementing `eval` for sums and products on your own. Try evaluating the
examples from the last section at several different points and checking to make
sure that the values you see are correct.

If you get stuck, here is a
[GitHub Gist](https://gist.github.com/agarmu/6c4f74a685fad1fc4eebd73592d5ad0e)
to help you get back on track.`

## Step 4: Differentiation

We're ready to differentiate polynomials now. Thankfully, the derivative of a
polynomial is another polynomial, so our function will have the type signature:

```hs
differentiate :: Polynomial -> Polynomial
```

There are four useful differentiation rules we can use:

1. **Constant differentiation:** \(\frac{\mathrm{d}}{\mathrm{d}x} c = 0\)
2. **Power Rule**: When \(n \neq 0\), then
   \(\frac{\mathrm{d}}{\mathrm{d}x} \left(x^n\right) = n \cdot x^{n-1}\)
3. **Sum Rule**:
   \(\frac{\mathrm{d}}{\mathrm{d}x} \left(f + g\right) = \frac{\mathrm{d}f}{\mathrm{d}x} + \frac{\mathrm{d}g}{\mathrm{d}x}\)
4. **Product Rule**:
   \(\frac{\mathrm{d}}{\mathrm{d}x} \left(f \cdot g\right) = \frac{\mathrm{d}f}{\mathrm{d}x} \cdot g + \frac{\mathrm{d}g}{\mathrm{d}x} \cdot f\)

These four rules are enough to differentiate all the polynomials we have
constructed so far. We differentiate a product:

```hs
differentiate :: Polynomial -> Polynomial
differentiate (Product p1 p2) =
 Sum
 (Product p1 (differentiate p2))
 (Product p2 (differentiate p1))
```

### Try it yourself!

Try implementing differentiation for sums and monomials using the rules stated
above.

> Hint: you can't directly multiply a floating point number with an integer in
> Haskell, because the `*` operator expects that both its arguments be of the
> same type. You can use Haskell's `fromIntegral` function, which can convert
> integers to other numeric types.

Here's the final
[GitHub Gist](https://gist.github.com/agarmu/d28519dfec611d1b16c4e4cf0247e0e6)
containing our creation.

## Conclusion

Congratulations! You're done creating a basic computer algebra system in
Haskell. It's now time for you to extend your program. Here are some ideas to
get you started.

- Try adding a `Power` variant to your polynomial type so you can represent
  polynomials like \((x+1)^{15}\) easily. Remember that you can use the
  [chain rule](https://en.wikipedia.org/wiki/Chain_rule) when computing
  derivatives.

- Try differentiating the polynomial
  `Product (Monomial 15 0) (Sum (Monomial 1 1) (Monomial 1 0))`. Is there a way
  you can represent this in a more simple way than your program does already?
  Maybe try to implement a function that simplifies polynomials.

- Write a function that converts a list of numbers to a polynomial, e.g.,
  `[1,2,3,4,6]` becomes `1 + 2x + 3x^2 + 4x^3 + 6x^4`.

- Write a parsing program that converts a string representing a polynomial to a
  `Polynomial` (i.e., invert the `show` function we previously wrote)

You might have to learn some more Haskell to achieve this! I would suggest the
book [Learn You a Haskell for Great Good](https://learnyouahaskell.com/) by
Miran Lipovača.