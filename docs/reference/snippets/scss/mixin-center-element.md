# Centrer un élèment

```scss
@mixin center($position) {
  @if $position == 'vertical' {
    top: 50%;
    transform: translateY(-50%);
  }

  @else if $position == 'horizontal' {
    left: 50%;
    transform: translateX(-50%);
  }

  @else if $position == 'both' {
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}

div {
  @include center('vertical');

  position: absolute;
}

```
