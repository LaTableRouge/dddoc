# Get the unit of a number
## !! à peaufiner pour les rems etc !!

```scss
@function strip-unit($number) {
  @if type-of($number) == 'number' and not unitless($number) {
    @return str-slice($value * 0 + '', 2, -1);
  }

  @return $number;
}

```
