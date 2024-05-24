---
layout: ../../components/post.astro
title: Polynomial Evaluation with OCaml
---

## Introduction

Type theory is a nice field!

```ocaml
let rec fibs: int -> int = function
    | 0 -> 0
    | 1 -> 1
    | n = (fibs (n - 1)) + (fibs (n - 2));;
```