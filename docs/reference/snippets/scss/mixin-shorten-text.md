# Gestion de l'overflow ellipsis pour un texte

```scss
@mixin text-shorten {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

p {
  @include text-shorten();
}
```
