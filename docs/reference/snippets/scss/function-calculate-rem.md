# Calculate rem

```scss
@function calculateRem($size) {
  @return calc(($size / 16) * 1rem);
}

body{
    font-size: calculateRem(14);
}
```
