# Infos Snippet

```scss
.has-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 10px;
  padding: 10px;
  border-top: 2px solid;
  box-shadow: 0 1px 8px #0000003b;

  @include media-breakpoint-up(sm) {
    flex-direction: row;
    border-top: initial;
    border-left: 2px solid;
  }

  &::before {
    content: ''; // Icon info
    font-family: ''; // Icon font
  }

  span {
    margin-left: 15px;
    text-align: center;

    @include media-breakpoint-up(sm) {
      text-align: left;
    }
  }

  @each $state-color, $value in $state-colors {
    &--#{$state-color} {
      border-top-color: var(--#{$variable-prefix}#{$state-color});

      @include media-breakpoint-up(sm) {
        border-top-color: initial;
        border-left-color: var(--#{$variable-prefix}#{$state-color});
      }

      &::before {
        color: var(--#{$variable-prefix}#{$state-color});
      }
    }
  }
}
```

```html
<h4 class="has-info has-info--warning">
    Ceci est un message d'alerte
</h4>
```
