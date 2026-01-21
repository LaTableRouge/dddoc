# set font-families variables

```scss
$fonts: (
  'text': (
    'name': 'Futura PT',
    'serif': sans-serif
  ),
  'title': (
    'name': 'Futura PT',
  ),
  'quote': (
    'name': 'Playfair Display',
  )
);


:root {
  @each $font-title, $font-info in $fonts {
    $font-name: map-get($font-info, 'name');
    $font-serif: map-get($font-info, 'serif');
    @if $font-serif {
      --font-#{$font-title}: #{$font-name}, #{$font-serif};
    } @else {
      --font-#{$font-title}: #{$font-name};
    }
  }
}
```
