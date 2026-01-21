---
sidebar_position: 3
---

# ACF Block configuration example with Timber

This guide explains how to create and configure ACF blocks in a Timber environment, using native WordPress block features alongside ACF fields.

For details on processing and registering blocks, see [Processing Blocks](processing-blocks.md).

## Folder Structure


- 📂 your-block
    - [block.json](#blockjson-configuration)
    - 📂 assets
        - [index.js](#editor-scripts-assetsindexjs)
        - [view.js](#front-end-scripts-assetsviewjs)
        - 📂 styles
            - [style.scss](#front-end-styles-assetsstylesstylescss)
            - [editor.scss](#editor-styles-assetsstyleseditorscss)
    - 📂 includes
        - [Fields.php](#1-includesfieldsphp)
        - [Render.php](#2-includesrenderphp)
    - 📂 views
        - [view.twig](#3-viewsviewtwig)


## block.json Configuration

The `block.json` file defines both ACF-specific settings and native WordPress block features.

```json
{
  "$schema": "https://schemas.wp.org/trunk/block.json",
  "apiVersion": 3,
  "name": "acf/your-block",
  "title": "Your ACF block",
  "description": "Displays a your acf block.",
  "category": "your-category",
  "icon": "block-default",
  "textdomain": "your-namespace",
  "keywords": ["timber", "acf"],
  "supports": {
    "html": false,
    "anchor": true,
    "align": false,
    "spacing": {"padding": false, "margin": true},
    "color": {"background": false, "text": false},
    "interactivity": true
  },
  "attributes": {
    "style": {
      "type": "object",
      "default": {
        "spacing": {
          "margin": {
            "bottom": "24px"
          }
        }
      }
    }
  },
  "acf": {
    "mode": "preview",
    "renderCallback": "YourProjectNamespace\\Blocks\\YourBlock\\Render::render_callback"
  },
  "viewScript": "file:./assets/view.js",
  "viewStyle": "file:./assets/style-view.css",
  "editorScript": "file:./assets/index.js",
  "editorStyle": "file:./assets/index.css"
}
```

## Key Files Explained

### 1. includes/Fields.php

Defines the ACF fields for the block. Example (excerpt):

```php
namespace YourProjectNamespace\Blocks\YourBlock;

class Fields
{
    public static function register()
    {
        if (! function_exists('acf_add_local_field_group')) {
            return;
        }
        acf_add_local_field_group([
            'key' => 'group_your_block',
            'title' => 'Your Block Fields',
            'fields' => [
                [
                    'key' => 'field_your_field',
                    'label' => 'Your Field',
                    'name' => 'your_field',
                    'type' => 'text',
                    // ... other field settings
                ],
                // Add more fields as needed
            ],
            'location' => [
                [
                    [
                        'param' => 'block',
                        'operator' => '==',
                        'value' => 'acf/your-block',
                    ],
                ],
            ],
        ]);
    }
}
```

### 2. includes/Render.php

Processes block data and prepares the context for Timber/Twig.

```php
/**
 * ACF Block Template
 *
 * Available variables:
 * @var array    $block      The block settings and attributes
 * @var string   $content    The block inner HTML (empty)
 * @var boolean  $is_preview True during backend preview render
 * @var integer  $post_id    The Post ID of the current context
 * @var array    $context    The context provided to the block
 */
namespace YourProjectNamespace\Blocks\YourBlock;

use Timber\Timber;

class Render
{
    public static function render_callback($block)
    {
        // Get ACF fields
        $field = get_field('field_your_field');

        // Render the Twig template
        Timber::render('views/view.twig', [
            'field' => !empty($field) ? $field : 'placeholder'
        ]);
    }
}
```

### 3. views/view.twig

Twig template for rendering the block:

```twig
<section class="your-block">
    {{ field }}
</section>
```

## Using Native Block Features

You can use native WordPress block features (like spacing, color, typography, etc.) in your ACF blocks.

To do this, process the values from the `$block` variable in your `Render.php` file and pass them to your template for inline styles or classes.

### Example: Handling spacing and outputting inline styles

```php
// In Render.php
$style_to_apply = BlockHelpers::getBlockStyleInline($block);
$block_context['style_to_apply'] = $style_to_apply;
```

Then in your Twig template:

```twig
{# In your Twig template #}
<section class="your-block" style="{{ style_to_apply }}">
  {{ field }}
</section>
```

The same pattern applies to other block features like colors, typography, and alignment. Just access the values from the `$block` variable and process them as needed.

## ACF Block Helper Functions

When working with ACF blocks, you often need to convert block attributes and style arrays (from the editor or theme.json) into valid CSS for inline styles or classes.

The following PHP helper functions can be used in your render callbacks or templates to streamline this process.

### Helper Functions

```php
namespace YourProjectNamespace\Blocks;

class BlockHelpers
{
    /**
     * Converts custom property strings to CSS variable format.
     *
     * @param string $value The custom property string to convert.
     * @return string The converted CSS variable string.
     */
    public static function convertCustomProperties(string $value): string
    {
        $prefix = 'var:';
        $token_in = '|';
        $token_out = '--';
        if (str_starts_with($value, $prefix)) {
            $unwrapped_name = str_replace(
                $token_in,
                $token_out,
                mb_substr($value, mb_strlen($prefix))
            );
            $value = "var(--wp--{$unwrapped_name})";
        }

        return $value;
    }

    /**
     * Returns inline block style properties as a CSS string.
     *
     * @param array $block The block data.
     * @return string The inline CSS style properties.
     */
    public static function getBlockStyleInline(array $block): string
    {
        $attrs = [];

        // Map of preset properties to their CSS variable formatters
        // Each formatter is a closure that generates the appropriate CSS variable string
        // e.g., fontSize: 'large' -> var(--wp--preset--font-size--large)
        $presetMap = [
            'fontSize' => fn ($v) => "var(--wp--preset--font-size--{$v})",
            'textColor' => fn ($v) => "var(--wp--preset--color--{$v})",
            'backgroundColor' => fn ($v) => "var(--wp--preset--color--{$v})",
        ];

        // Process each preset property if it exists in the block
        foreach ($presetMap as $key => $formatter) {
            if (isset($block[$key])) {
                // Convert camelCase property names to kebab-case CSS properties
                $cssKey = match ($key) {
                    'fontSize' => 'font-size',
                    'textColor' => 'color',
                    'backgroundColor' => 'background-color',
                };
                $attrs[$cssKey] = $formatter($block[$key]);
            }
        }

        // Spacing
        if (isset($block['style']['spacing'])) {
            foreach (['margin', 'padding'] as $prop) {
                $spacing = $block['style']['spacing'][$prop] ?? null;
                if (is_array($spacing)) {
                    foreach ($spacing as $dir => $value) {
                        $attrs["{$prop}-{$dir}"] = self::convertCustomProperties($value);
                    }
                }
            }
        }

        // Colors
        if (isset($block['style']['color'])) {
            foreach (['text' => 'color', 'background' => 'background-color'] as $key => $cssKey) {
                $color = $block['style']['color'][$key] ?? null;
                if ($color) {
                    $attrs[$cssKey] = self::convertCustomProperties($color);
                }
            }
        }

        // Convert attributes array to CSS string
        // If no attributes exist, return empty string
        // Otherwise, map each key-value pair to "key:value" format and join with semicolons
        return empty($attrs) ? '' : implode(';', array_map(
            fn ($k, $v) => "{$k}:{$v}",
            array_keys($attrs),
            $attrs
        ));
    }

    /**
     * Retrieves block classes based on back-office settings.
     *
     * @param array $block The block data.
     * @return string The block classes as a space-separated string.
     */
    public static function getBlockClass(array $block): string
    {
        $classes = [];

        if (isset($block['align'])) {
            $align = $block['align'];
            $classes[] = "align{$align}";
        }

        if (isset($block['className'])) {
            $classes[] = $block['className'];
        }

        return implode(' ', $classes);
    }

    /**
     * Gets theme color value from a color label.
     *
     * @param string $label The color label to look up.
     * @param string $returnKey The key to return from the color data (default: 'slug').
     * @return string The color value or empty string if not found.
     */
    public static function getThemeColorsFromLabel(string $label, string $returnKey = 'slug'): string
    {
        $theme_json = \WP_Theme_JSON_Resolver::get_merged_data('theme');
        $theme_data = $theme_json->get_raw_data();
        $theme_colors = $theme_data['settings']['color']['palette']['theme'] ?? [];

        if (empty($theme_colors)) {
            return '';
        }

        // Use array_filter to find the color with matching name
        $matching_colors = array_filter($theme_colors, function ($color) use ($label) {
            return $color['name'] === $label;
        });

        // If we found a match, return its color value
        if (!empty($matching_colors)) {
            $first_match = reset($matching_colors);
            return is_string($first_match[$returnKey] ?? null) ? $first_match[$returnKey] : '';
        }

        // Return empty string if no match found
        return '';
    }
}
```

Refer to these helpers in your render callbacks or templates to streamline style and class output for your ACF blocks.

## Styles

### Front-end Styles (assets/styles/style.scss)

```scss
// Style for the block
.block-acf---your-block {
  border: 1px solid #ccc;
  min-height: 200px;
}
```

### Editor Styles (assets/styles/editor.scss)

```scss
// Style for the gutenberg editor part of the block
@use 'style.scss';

.block-acf---your-block {}
```

## Scripts

### Front-end Scripts (assets/view.js)

```js
// This file is for the front-end part of the block
import './styles/style.scss'

```

### Editor Scripts (assets/index.js)

```js
// This file is for the gutenberg editor part of the block
import './styles/editor.scss'

```

## Best Practices

- **Structure:** Keep all block assets and logic together for portability.
- **ACF Fields:** Use groups and repeaters for complex data.
- **Styling:** Use CSS custom properties for dynamic styles.
- **Helpers:** Use PHP helpers to convert block attributes to CSS.
- **Twig:** Keep templates clean and logic-free.

## Resources

- [ACF Blocks Documentation](https://www.advancedcustomfields.com/resources/acf-block-configuration-via-block-json/)
- [WordPress Block Editor Handbook](https://developer.wordpress.org/block-editor/)
- [Timber Documentation](https://timber.github.io/docs/)
