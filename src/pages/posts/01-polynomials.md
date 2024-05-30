---
layout: ../../components/post.astro
title: Building a Computer Algebra System in Haskell
pubDate: 2024-05-29
description: Because doing calculations by hand is soo last millenium.
draft: true
---

The idea of a single-variable
[polynomial](https://en.wikipedia.org/wiki/Polynomial) and its associated
operations of addition, multiplication, and evaluation are ideas which most are
familiar with from grade-school. In calculus courses, we are further introduced
to the idea of
[differentiating](https://web.mit.edu/wwmath/calculus/differentiation/polynomials.html)
these polynomials. Of course, these calculations are fairly easy to perform --
especially for smaller polynomials, but when polynomials are more than just a
few terms, it becomes somewhat difficult to manually manipulate them.
Thankfully, computers exist; there are many programs, called
[computer algebra systems](https://en.wikipedia.org/wiki/Computer_algebra_system),
which exist to perform computations on objects like these.

### Goals

Unfortunately, most computer algebra systems are _far_ too complicated to learn
to hack/tinker with in a single day. To this end, this blog post will explore
how we can build a **basic** computer algebra system with which you can:

- construct polynomials
- represent basic operations on polynomials (e.g., addition, multiplication)
- evaluate polynomials at a certain point
- differentiate polynomials

The language I'm going to use in this blog post will be the functional
programming language [Haskell](https://www.haskell.org/). Though not required, I
would recommend that anyone who follows along uses a functional programming
language like Haskell or [OCaml](https://ocaml.org/).

The reason for this choice is twofold. Firstly, the paradigms that functional
programming uses lend themselves _really_ well to the kind of program I want to
write in this post, creating a program that explains itself very well while also
being surprisingly terse. Secondly, functional programs are a really great tool
that can be fun to use, and constructing a polynomial evaluator can serve as a
fairly gentle introduction to this useful tool.

## Setup

We need to take care of a few things before you can write Haskell code; I would
recommend going with the remote environment unless you already have some
familiarity with Haskell.

> **A note on autocompletion/AI-generated code**: I would strongly suggest that
> you disable copilot and/or Replit's AI autocompletion features if you're new
> to Haskell. It will probably impede your ability to learn, at least to some
> extent.

### Replit Setup

I have created a [Replit project](https://replit.com/@agarmu/CASStarter#app)
that can serve as a base for your work! I would recommend creating a fork of it
and working there.

### Local Setup

In order to prepare for writing Haskell code, I would recommend downloading it
via `GHCup`, as documented [here](https://www.haskell.org/downloads/) on the
Haskell website. I would also recommend some sort of development environment;
[Visual Studio Code](https://code.visualstudio.com/) with the Haskell plugin is
probably fine. You can then download the
[Replit project](https://replit.com/@agarmu/CASStarter#app) I created as a
`.zip` file, unzip it, and use it as the base directory for your project.

## Current structure

For this article, let's only worry about the `Main.hs` file you see (the rest
are build artifacts/tooling and somewhat outside the scope of this article). It
should look like this:

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

Though this may seem scary, this is a pretty basic Haskell file. At the top of
the file, we declare a module, `Main`, which Haskell expects to contain a `main`
function (seen at the bottom) of the file. The first line of the function
declares its type to be `main :: IO ()` -- that is, `main` is a function which
takes _no input_ and _returns nothing_ and performs IO operations [^1]. The next
line defines the function of `main` -- it prints the line "Ready to CAS!" to its
standard output. Above `main`, there are several lines of comments.

[^1]:
    It is natural to feel that explicityly declaring an `IO` operation
    explicitly is at least somewhat odd. Haskell is what is called a
    [pure language](https://en.wikipedia.org/wiki/Purely_functional_programming),
    which makes this explicitness necessary, but can also have many positive
    effects. For instance, pure languages are often also
    [lazy](https://en.wikipedia.org/wiki/Lazy_evaluation), which means, e.g.,
    that the fibonacci sequence can be declared as an infinite list, like so:

    ```hs
    fibs = 0 : 1 : zipWith (+) fibs (tail fibs)
    ```

    More details on this example can be found
    [here](https://stackoverflow.com/questions/6273621/understanding-a-recursively-defined-list-fibs-in-terms-of-zipwith).

In the remainder of this article, we're going to go through the steps in each of
the comments given to create a basic working CAS. At the end of each step, I
link a full copy of the `Main.hs` file linked so you can check your progress.

## Step 1: Defining a Polynomial Type

### Monomials

Let's get started understanding what the structure of our polynomial will be. At
the most basic level, a polynomial is a
[monomial](https://en.wikipedia.org/wiki/Monomial), meaning that it is of the
form $c x^n$ for some real number $c$ and some natural number $n$.

This is a good start to defining our polynomial type! In Haskell, a
user-constructed type is denoted as:

```hs
data [type_name] = ...
```

In our case, let's name our type `Polynomial` and have it be equal to
`Monomial Float Int`:

```hs
data Polynomial = Monomial Float Int
```

This essentially means that `Polynomial` has a single possible "variant" it can
be, which is a `Monomial` with an associated floating point number ($c$) and an
integer ($n$).

### Interlude: Running our program

Now that we have a basic structure present, let's actually execute some Haskell
code! In the shell, enter the following (substituting `app/Main.sh` for wherever
your Haskell file is located).

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
the monomial $25.3 x^4$:

```hs
ghci> Monomial 25.3 4
```

**Oops.** Looks like there was an error. GHCi was able to construct the monomial
just fine, but it doesn't know how to display it for your just yet (this is an
issue we will remedy later). For now, just enter the following:

```hs
ghci> :t Monomial 25.3 4
Monomial 25.3 4 :: Polynomial
```

This time, GHCi responds. The `:t` command instructs GHCi to display the type of
something; it has responded to you that you have just created a monomial! 🥳

You can play around with a few more monomials and then exit GHCi naturally with
`(^D)`.

### More than just monomials

Monomials are _fun_, but there's not that much one can do with them. It's time
to expand to other structures.

One key fact that we can use is that all polynomials $p$ can be written as
$p(x) = c_0 + c_1 x + c_2 x^2 + c_3 x^3 + ...$ -- that is, _all polynomials can
be written as the sum of monomials_.

Of course, we know that a sum of polynomials is a binary function, i.e.
$+: P \times P \mapsto P$, where $P$ is the set of polynomials (which we use).
This mathematical model can translate very directly into Haskell; we can simply
add another variant to our type definition.

```hs
data Polynomial = Monomial Float Int | Sum Polynomial Polynomial
```

Now, a polynomial can either be a _single_ term or the sum of two other
polynomials.

Though not strictly required since all polynomials can be expressed as sums of
other polynomials, it is often convenient to represent polynomial multiplication
-- it is **left as an exercise to you to do this**. Don't worry if you get
stuck, though; a potential answer is given at the end of this section.
