# Pastel Web Calculator ("Divas in Engineering" Edition)

A fully functional, feature-rich on-screen calculator built as a milestone project for [The Odin Project](https://www.theodinproject.com/). Designed with a custom soft pastel aesthetic, smooth tactile micro-interactions, and robust state-management logic.

##  Features

- **Basic Arithmetic**: Supports addition, subtraction, multiplication, and division.
- **Operator Chaining**: Seamlessly evaluates intermediate pairs when chaining multiple operators (e.g., typing `12 + 7 - 1 =` evaluates `12 + 7` on the fly).
- **Smart Result Management**: Automatically rounds long decimals to prevent display overflow.
- **Defensive Error Handling**: Catches division-by-zero errors gracefully with a custom message instead of crashing.
- **Floating-Point Decimals**: Allows decimal input while safely restricting users from typing multiple decimal points in a single number.
- **Backspace & Clear**: Undo mistakes digit-by-digit with backspace or wipe the slate completely clean with clear.
- **Full Keyboard Support**: Type expressions directly using your physical keyboard (`0-9`, `+`, `-`, `*`, `/`, `Enter`, `Backspace`, and `Escape`).

## Built With

- **HTML5**: Structured semantic markup and custom data attributes.
- **CSS3**: Custom responsive layout, organic curves, and boutique pastel styling.
- **Vanilla JavaScript**: DOM manipulation, event listeners, and custom state-machine logic.