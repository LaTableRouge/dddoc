# Convert hexadecimal color to HSL

```scss
@function hexTohslString($hexColor) {
  $h: hue($hexColor);
  $s: saturation($hexColor);
  $l: lightness($hexColor);

  @return '#{calc($h / 100 * 100%)} #{$s} #{$l}';
}

:root {
  --white: #{hexTohslString('#FF00FF')};
}
```
