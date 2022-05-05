import "sicp";

// functions from text

function abs(x) {
  return x > 0 ? x : x === 0 ? 0 : -x;
}

/* 1.1
> 10;
10
> 5 + 3 + 4;
12
> 9 - 1;
8
> 6 / 2;
3
> 2 * 4 + (4 - 6);
6
> const a = 3;
undefined
> const b = a + 1;
undefined
> a + b + a * b;
19
> a === b;
false
> b > a && b < a * b ? b : a;
4
> .editor
// Entering editor mode (Ctrl+D to finish, Ctrl+C to cancel)
a === 4
? 6
: b === 4
? 6 + 7 + a
: 25;

16
> 2 + (b > a ? b : a);
6
> .editor
// Entering editor mode (Ctrl+D to finish, Ctrl+C to cancel)
(a > b
? a
: a < b
? b
: -1)
*
(a + 1);

16
  
 */

// 1.2
(5 + 4 + (2 - (3 - (6 + 4 / 5)))) / (3 * (6 - 2) * (2 - 7));

// 1.3

function square(a) {
  return a * a;
}

function sum_of_squares(a, b) {
  return square(a) + square(b);
}

// using the style of the chapter
function sum_of_squares_of_largest(a, b, c) {
  return a > b
    ? b > c
      ? sum_of_squares(a, b)
      : sum_of_squares(a, c)
    : b > a
    ? a > c
      ? sum_of_squares(b, a)
      : sum_of_squares(b, c)
    : c > a
    ? a > b
      ? sum_of_squares(c, a)
      : sum_of_squares(c, b)
    : sum_of_squares(a, b); // all equal
}

console.assert(sum_of_squares_of_largest(4, 2, 1) === 20);
console.assert(sum_of_squares_of_largest(4, 1, 2) === 20);
console.assert(sum_of_squares_of_largest(2, 4, 1) === 20);
console.assert(sum_of_squares_of_largest(1, 2, 4) === 20);
console.assert(sum_of_squares_of_largest(1, 4, 4) === 32);
console.assert(sum_of_squares_of_largest(4, 1, 4) === 32);
console.assert(sum_of_squares_of_largest(4, 4, 1) === 32);
console.assert(sum_of_squares_of_largest(4, 4, 4) === 32);

// 1.4

// a_plus_abs_b determines which function to used based on whether b is negative.
//If b is negative it selects the minus function, and if positive the plus,
//it then applies the arguments a and b to that function expression

// 1.5

// normal-order evaluation will return 0, as it will expand and then apply

function p() {
  return p();
}
function test(x, y) {
  return x === 0 ? 0 : y;
}

// console.log(test(0, p()));
// applicative-order evaluation will evaluate the arguments first, and recurse forever;

// 1.6
function is_good_enough(guess, x) {
  return abs(square(guess) - x) < 0.001;
}

function improve(guess, x) {
  return average(guess, x / guess);
}

function average(x, y) {
  return (x + y) / 2;
}

function sqrt_itr(guess, x) {
  return is_good_enough(guess, x) ? guess : sqrt_itr(improve(guess, x), x);
}

function sqrt(x) {
  return sqrt_itr(1, x);
}

function conditional(predicate, then_clause, else_clause) {
  return predicate ? then_clause : else_clause;
}

function sqrt_itr_conditional(guess, x) {
  return conditional(
    is_good_enough(guess, x),
    guess,
    sqrt_itr_conditional(improve(guess, x), x)
  );
}

// sqrt_itr_conditional(5); // this fails because sqrt_iter_conditional tries to expand conditional infinitely, as the arguments are evaluated in conditional every time

// 1.7

function is_good_enough_delta(oldGuess, newGuess) {
  return abs(oldGuess - newGuess) < 0.001;
}

function sqrt_itr_delta(oldGuess, newGuess, x) {
  return is_good_enough_delta(oldGuess, newGuess)
    ? newGuess
    : sqrt_itr_delta(newGuess, improve(newGuess, x), x);
}

function sqrt_delta(x) {
  return sqrt_itr_delta(0, 1, x);
}

// 1.8

function cube_improve(guess, x) {
  return (x / square(guess) + 2 * guess) / 3;
}

function cubert_itr(oldGuess, newGuess, x) {
  return is_good_enough_delta(oldGuess, newGuess)
    ? newGuess
    : cubert_itr(newGuess, cube_improve(newGuess, x), x);
}

function cubert(x) {
  return cubert_itr(0, 1, x);
}
