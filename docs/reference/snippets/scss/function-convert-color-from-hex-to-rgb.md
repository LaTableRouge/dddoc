# Convert hexadecimal color to RGB

```scss
@function hexToRGBString($hexColor) {
  @return '#{red($hexColor)},#{green($hexColor)},#{blue($hexColor)}';
}

:root {
  --white: #{hexToRGBString('#FF00FF')};
}
```
