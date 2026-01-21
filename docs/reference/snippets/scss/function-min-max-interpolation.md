# Min-Max Interpolation

Inspired by : 
- https://min-max-calculator.9elements.com/
- https://chriskirknielsen.com/blog/modern-fluid-typography-with-clamp/

```scss
@function get-unit($value) {
  @return str-slice($value * 0 + '', 2, -1);
}

@function strip-unit($number) {
  @if type-of($number) == 'number' and not unitless($number) {
    $temp: $number * 0 + 1;
    @return calc($number / ($temp));
  }

  @return $number;
}

@function calculateRem($size) {
  @return calc(($size / 16) * 1rem);
}

@function min-max-interpolation($min-value, $max-value, $min-breakpoint, $max-breakpoint, $container-unit: 1vw) {
  // Convert en rem si la valeur est en pixels
  @if get-unit($min-value) == 'px' {
    $min-value: calculateRem(strip-unit($min-value));
  }
  // Convert en rem si la valeur n'a pas d'unité
  @if unitless($min-value) {
    $min-value: calculateRem($min-value);
  }

  @if get-unit($max-value) == 'px' {
    $max-value: calculateRem(strip-unit($max-value));
  }
  @if unitless($max-value) {
    $max-value: calculateRem($max-value);
  }

  @if get-unit($min-breakpoint) == 'px' {
    $min-breakpoint: calculateRem(strip-unit($min-breakpoint));
  }
  @if unitless($min-breakpoint) {
    $min-breakpoint: calculateRem($min-breakpoint);
  }

  @if get-unit($max-breakpoint) == 'px' {
    $max-breakpoint: calculateRem(strip-unit($max-breakpoint));
  }
  @if unitless($max-breakpoint) {
    $max-breakpoint: calculateRem($max-breakpoint);
  }

  $factor: calc(1 / ($max-breakpoint - $min-breakpoint) * ($max-value - $min-value));
  $calc-value: unquote('#{$min-value - ($min-breakpoint * $factor)} + #{calc((100 * $container-unit) * $factor)}');
  @return clamp(
    #{if($min-value > $max-value, $max-value, $min-value)},
    #{$calc-value},
    #{if($min-value > $max-value, $min-value, $max-value)}
  );
}

body{
    // Si vous souhaitez que la taille de la typo se base sur la taille de l'écran
    font-size: min-max-interpolation(18px, 22px, 960px, 1200px);
    // OR
    font-size: min-max-interpolation(18, 22, 960, 1200);
    
    
    // Si vous souhaitez que la taille de la typo se base sur la taille du container parent
    font-size: min-max-interpolation(18px, 22px, 960px, 1200px, 1cqw);
    // OR
    font-size: min-max-interpolation(18, 22, 960, 1200, 1cqw);
    
    // Return clamp( 1.125rem, 0.125rem + 1.6666666667vw, 1.375rem )
}
```
