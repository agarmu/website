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

_**A note on autocompletion/AI-generated code**: I would strongly suggest that
you disable copilot and/or Replit's AI autocompletion features if you're new to
Haskell. It will probably impede your ability to learn, at least to some
extent._

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
takes _no input_ and _returns nothing_ and performs IO operations [^1].

[^1]:
    It is natural to feel that declaring and `IO` operation explicitly is at
    least somewhat odd. Haskell is what is called a
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
