# Presque un sélecteur parent 🤔

```scss
@mixin when-inside($context) {
  #{$context} & {
    @content;
  }
}

#ayaya {
  @include when-inside(body[data-modal]) {
    overflow: hidden;
  }
}
```
