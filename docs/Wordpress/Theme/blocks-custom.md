# Handling Supported Styles for ACF Blocks

This guide explains how to declare, override, and output supported styles for custom blocks—including ACF blocks—in WordPress.

It covers how to use `block.json`, `theme.json`, and PHP helpers to ensure your blocks are fully integrated with the WordPress editor and design system.

## Declaring Supported Styles in block.json

Declare which style features (such as spacing, color, typography, etc.) your block supports in its `block.json` file. This enables users and theme authors to control these styles via the editor and theme.json.

```json
{
  "apiVersion": 2,
  "name": "myplugin/my-custom-block",
  "title": "My Custom Block",
  "supports": {
    "spacing": {
      "margin": true
    }
  },
  "attributes": {
    "style": {
      "type": "object",
      "default": {
        "spacing": {
          "margin": {
            "bottom": "1rem"
          }
        }
      }
    }
  }
}
```

## Overriding or Setting Defaults in theme.json

Set default values or override supported styles for your custom block in your theme's `theme.json`:

```json
{
  "styles": {
    "blocks": {
      "myplugin/my-custom-block": {
        "spacing": {
          "margin": {
            "bottom": "3rem"
          }
        }
      }
    }
  }
}
```

This sets a default margin for your custom block. Users can still override this in the editor if the block supports it.

## Handling Styles for ACF Blocks

For ACF blocks, you often need to fetch and format the block styles set in the editor and output them as inline styles in your template.

See the [ACF Block Helper Functions](../Blocks/block-acf.md#acf-block-helper-functions) section for reusable PHP helpers to convert block attributes and style arrays into valid CSS.

## Best Practices

- Always declare supported styles in your block's `block.json` for clarity and editor integration.
- Use `theme.json` to provide sensible defaults or enforce design consistency across your theme.
- Use helper functions to ensure ACF/dynamic blocks respect editor and theme.json styles.
- Document which styles are supported for your custom blocks to help theme authors and users.

## References

- [Block Supports Reference (WordPress Developer Docs)](https://developer.wordpress.org/block-editor/reference-guides/block-api/block-supports/)
- [Global Settings and Styles (theme.json)](https://developer.wordpress.org/themes/global-settings-and-styles/)
