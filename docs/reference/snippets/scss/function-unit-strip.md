# Remove the unit of a number

```scss
@function strip-unit($number) {
  @if type-of($number) == 'number' and not unitless($number) {
    $temp: $number * 0 + 1;
    @return calc($number / ($temp));
  }

  @return $number;
}

```
