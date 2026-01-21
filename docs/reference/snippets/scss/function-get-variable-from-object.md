# Récupère une variable d'un objet scss

```scss
@function variable-get($group-name, $variable-name) {
  @if map-has-key($group-name, $variable-name) {
    @return map-get($group-name, $variable-name);
  }

  @else {
    @warn 'Unfortunately, no value could be retrieved from `#{$variable-name}`. ' + 'Please make sure it is defined in `#{$group-name}` map.';

    @return null;
  }
}

$container-max-widths: (
  sm: 540px,
  md: 720px,
  lg: 960px,
  xl: 1140px,
  xxl: 1320px,
  fhd: 1440px,
  2th: 2000px
);

#ayaya {
  max-width: variable-get($container-max-widths, 'fhd');
}
```
