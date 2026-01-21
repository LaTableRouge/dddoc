# Récupère la dernière variable d'un objet

```scss
@function variable-get-last-item($group-name) {
  @each $key, $value in $group-name {
    $var: index(($group-name), ($key $value));

    @if $var == length($group-name) {
      @return $value;
    }
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
  max-width: variable-get-last-item($container-max-widths);
}
```
