# Make all types of colors into one object with all color types

```scss
$colors: (
    'danger': #dc3545,
    'warning': rgb(255, 193, 7),
    'info': rgba(23, 162, 184, 0.9),
    'success': #28a745,
    'ayaya': hsl(354.251497006, 70.4641350211%, 53.5294117647%),
    'test-dan': hsla(188.198757764deg, 77.7777777778%, 40.5882352941%, 0.9)
);

@function color-mix($value, $typesToReturn: 'all') {
	@if (meta.type-of($value) == 'color') {
		$colorType: null;

		$colorType: if(string.index(#{$value}, '#') == 1, 'hex', null);

		@if (string.index(#{$value}, 'rgb')) {
			$colorType: 'rgb';
			@if (string.index(#{$value}, 'rgba')) {
				$colorType: 'rgba';
			}
		}

		@if (string.index(#{$value}, 'hsl')) {
			$colorType: 'hsl';
			@if (string.index(#{$value}, 'hsla')) {
				$colorType: 'hsla';
			}
		}

		@if ($colorType) {
			$map: ();
			@if ($colorType == 'rgba' or $colorType == 'hsla') {
				// Apply the white background to 'fake' the alpha layer
				$value: color.mix(rgb(color.red($value), color.green($value), color.blue($value)), #ffffff, color.alpha($value) * 100%);
			}

			@if ($typesToReturn == 'all' or map.has-key($typesToReturn, 'hex')) {
				$map: map.merge(
					$map,
					(
						'hex': $value
					)
				);
			}

			@if ($typesToReturn == 'all' or map.has-key($typesToReturn, 'rgb')) {
				$map: map.merge(
					$map,
					(
						'rgb': '#{color.red($value)},#{color.green($value)},#{color.blue($value)}'
					)
				);
			}

			@if ($typesToReturn == 'all' or map.has-key($typesToReturn, 'hsl')) {
				$map: map.merge(
					$map,
					(
						'hsl': '#{calc(color.hue($value) / 100 * 100)},#{color.saturation($value)},#{color.lightness($value)}'
					)
				);
			}

			@return $map;
		}

		@warn 'The color #{$value} is not valid';

		@return null;
	} @else {
		@warn 'The value #{$value} is not a color';

		@return null;
	}
}

:root {
    @each $color, $value in $colors {
        $color-mix: color-mix($value, ('hex': '', 'rgb': ''));
        @if ($color-mix) {
            $hex: map-get($color-mix, 'hex');
            @if ($hex) {
                --color-#{$color}: #{$hex};
            }

            $rgb: map-get($color-mix, 'rgb');
            @if ($rgb) {
                --color-rgb-#{$color}: #{$rgb};
            }

            $hsl: map-get($color-mix, 'hsl');
            @if ($hsl) {
                --color-hsl-#{$color}: #{$hsl};
            }
        }
    }
    // Expected output : 
    --color-danger: #dc3545;
    --color-rgb-danger: 220,53,69;
    --color-warning: #ffc107;
    --color-rgb-warning: 255,193,7;
    --color-info: #2eabbf;
    --color-rgb-info: 46,171,191;
    --color-success: #28a745;
    --color-rgb-success: 40,167,69;
    --color-ayaya: #dc3545;
    --color-rgb-ayaya: 220,53,69;
    --color-test-dan: #2eabbf;
    --color-rgb-test-dan: 46,171,191;

    @each $color, $value in $colors {
        $color-mix: color-mix($value);
        @if ($color-mix) {
            $hex: map-get($color-mix, 'hex');
            @if ($hex) {
                --color-#{$color}: #{$hex};
            }

            $rgb: map-get($color-mix, 'rgb');
            @if ($rgb) {
                --color-rgb-#{$color}: #{$rgb};
            }

            $hsl: map-get($color-mix, 'hsl');
            @if ($hsl) {
                --color-hsl-#{$color}: #{$hsl};
            }
        }
    }
    // Expected output : 
    --color-danger: #dc3545;
    --color-rgb-danger: 220,53,69;
    --color-hsl-danger: 354.251497006deg,70.4641350211%,53.5294117647%;
    --color-warning: #ffc107;
    --color-rgb-warning: 255,193,7;
    --color-hsl-warning: 45deg,100%,51.3725490196%;
    --color-info: #2eabbf;
    --color-rgb-info: 46,171,191;
    --color-hsl-info: 188.275862069deg,61.1814345992%,46.4705882353%;
    --color-success: #28a745;
    --color-rgb-success: 40,167,69;
    --color-hsl-success: 133.7007874016deg,61.3526570048%,40.5882352941%;
    --color-ayaya: #dc3545;
    --color-rgb-ayaya: 220,53,69;
    --color-hsl-ayaya: 354.251497006deg,70.4641350211%,53.5294117647%;
    --color-test-dan: #2eabbf;
    --color-rgb-test-dan: 46,171,191;
    --color-hsl-test-dan: 188.275862069deg,61.1814345992%,46.4705882353%;
}
```
