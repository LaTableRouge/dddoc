# Gestion du support de la propriété "inset"

```scss
@mixin inset($number) {
  @supports (inset: $number) {
    inset: $number;
  }

  @supports not (inset: $number) {
    top: $number;
    right: $number;
    bottom: $number;
    left: $number;
  }
}

div {
  @include inset(0);

  position: fixed;
}
```
