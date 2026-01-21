# Gestion du support de la propriété aspect-ratio

```scss
@mixin aspect-ratio-picture($base-width, $base-height, $object-fit: contain) {
  width: 100%;

  @supports (aspect-ratio: #{$base-width} / #{$base-height}) {
    aspect-ratio: #{$base-width} / #{$base-height};
  }

  @supports not (aspect-ratio: #{$base-width} / #{$base-height}) {
    position: relative;
    padding-bottom: calc(100% / (#{$base-width} / #{$base-height}));

    img {
      position: absolute;
      top: 0;
      left: 0;
    }
  }

  img {
    width: 100%;
    height: 100%;

    @if $object-fit == 'contain' {
      object-fit: contain;
    }

    @else if $object-fit == 'cover' {
      object-fit: cover;
    }
  }
}

div {
  @include aspect-ratio-picture(16, 9, 'contain');
}
```

```html
<div>
    <img src="https://via.placeholder.com/200x197">
</div>

```
