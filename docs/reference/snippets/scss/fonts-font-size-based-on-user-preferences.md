# Font size based on user preferences

## Function
```scss
@function calculateRem($size) {
  @return calc(($size / 16) * 1rem);
}
```

## Variable
```scss
$typography-font-sizes: (
  1: 40,
  2: 35,
  3: 30,
  4: 25,
  5: 20,
  6: 17,
  7: 14
);

@each $font-size, $value in $typography-font-sizes {
    --font-level-#{$font-size}: #{calculateRem($value)};
}
```

## Example
```scss
body{
  font-size: var(--font-level-7);
}

h1{
  font-size: var(--font-level-1);
}

h2{
  font-size: var(--font-level-2);
}

h3{
  font-size: var(--font-level-3);
}

h4{
  font-size: var(--font-level-4);
}

h5{
  font-size: var(--font-level-5);
}

h6{
  font-size: var(--font-level-6);
}
```
