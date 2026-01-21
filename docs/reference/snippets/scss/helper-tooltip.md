# Tooltip Snippet

```scss
.has-tooltip {
  $tooltip-triangleWidth: 5px !default;
  $tooltip-width: 100px !default;
  $tolltip-text-offset-value: 3px !default;
  $tolltip-padding-value: 4px 10px !default;
  $tooltip-box-shadow-color: rgba(var(--#{$variable-prefix}rgb-black), 0.15) !default;
  $tooltip-bg-color: var(--#{$variable-prefix}white) !default;
  $tooltip-breakpoint: lg !default;

  display: inline-block;
  position: relative;
  margin-left: 5px;
  font-size: 13px;
  line-height: 1;
  white-space: normal;
  cursor: pointer;

  &::before {
    content: attr(data-tooltip) '';
    display: inline-block;
    position: absolute;
    z-index: 1;
    top: 0;
    left: 50%;
    padding: $tolltip-padding-value;
    transform: translateX(-50%) translateY(calc(-100% - (#{$tooltip-triangleWidth} + #{$tolltip-text-offset-value})));
    transition: opacity 0.2s ease-in-out;
    opacity: 0;
    background-color: $tooltip-bg-color;
    box-shadow: 0 12px 50px 0 $tooltip-box-shadow-color;
    font-family: inherit;
    font-size: 11px;
    font-weight: normal;
    text-align: left;
    text-transform: none;
  }

  &::after {
    content: '';
    display: block;
    position: absolute;
    z-index: 2;
    top: 0;
    left: 50%;
    width: 0;
    height: 0;
    transform: translateX(-50%) translateY(calc(-100% - #{$tolltip-text-offset-value}));
    transition: opacity 0.2s ease-in-out;
    border-width: $tooltip-triangleWidth $tooltip-triangleWidth 0 $tooltip-triangleWidth;
    border-style: solid;
    border-color: $tooltip-bg-color transparent transparent transparent;
    opacity: 0;
    box-shadow: 0 12px 50px 0 $tooltip-box-shadow-color;
  }

  &:hover {
    &::before,
    &::after {
      opacity: 1;
    }
  }

  &--right {
    &:hover {
      &::before {
        @include media-breakpoint-up($tooltip-breakpoint) {
          top: 50%;
          right: 0;
          left: unset;
          transform: translateY(-50%) translateX(calc(100% + (#{$tooltip-triangleWidth} + #{$tolltip-text-offset-value})));
          box-shadow: -10px 0 50px 0 $tooltip-box-shadow-color;
        }
      }

      &::after {
        box-shadow: -10px 0 50px 0 $tooltip-box-shadow-color;

        @include media-breakpoint-up($tooltip-breakpoint) {
          top: 50%;
          right: 0;
          left: unset;
          transform: translateY(-50%) translateX(calc(100% + #{$tolltip-text-offset-value}));
          border-width: $tooltip-triangleWidth $tooltip-triangleWidth $tooltip-triangleWidth 0;
          border-color: transparent $tooltip-bg-color transparent transparent;
        }
      }
    }
  }

  &--left {
    &:hover {
      &::before {
        @include media-breakpoint-up($tooltip-breakpoint) {
          top: 50%;
          left: 0;
          transform: translateY(-50%) translateX(calc(-100% - (#{$tooltip-triangleWidth} + #{$tolltip-text-offset-value})));
          box-shadow: 15px 0 50px 0 $tooltip-box-shadow-color;
        }
      }

      &::after {
        @include media-breakpoint-up($tooltip-breakpoint) {
          top: 50%;
          left: 0;
          transform: translateY(-50%) translateX(calc(-100% - #{$tolltip-text-offset-value}));
          border-width: $tooltip-triangleWidth 0 $tooltip-triangleWidth $tooltip-triangleWidth;
          border-color: transparent transparent transparent $tooltip-bg-color;
          box-shadow: 15px 0 50px 0 $tooltip-box-shadow-color;
        }
      }
    }
  }

  &--bottom {
    &:hover {
      &::before {
        @include media-breakpoint-up($tooltip-breakpoint) {
          top: unset;
          bottom: 0;
          transform: translateX(-50%) translateY(calc(100% + (#{$tooltip-triangleWidth} + #{$tolltip-text-offset-value})));
          box-shadow: 0 -12px 50px 0 $tooltip-box-shadow-color;
        }
      }

      &::after {
        @include media-breakpoint-up($tooltip-breakpoint) {
          top: unset;
          bottom: 0;
          transform: translateX(-50%) translateY(calc(100% + #{$tolltip-text-offset-value}));
          border-width: 0 $tooltip-triangleWidth $tooltip-triangleWidth $tooltip-triangleWidth;
          border-color: transparent transparent $tooltip-bg-color transparent;
          box-shadow: 0 -12px 50px 0 $tooltip-box-shadow-color;
        }
      }
    }
  }
}
```

```html
<span data-tooltip="ayaya">Hover me</span>
```
