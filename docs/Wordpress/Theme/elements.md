# Elements

Theme.json elements allow you to style specific HTML elements (such as headings, links, buttons, captions, and citations) globally or within specific blocks.

This provides more granular control over your site's design, ensuring consistency across both core blocks and custom HTML elements.

## Best Practices

- Use `styles.elements` for global element styles to ensure consistency across your theme.
- Use block-specific `styles.blocks.blockname.elements` for exceptions or customizations within a block.
- Prefer using CSS variables (from theme.json) for colors, font sizes, etc., to maintain a scalable design system.
- Avoid overusing element selectors for things that should be handled by block or utility classes.

## Supported Elements

WordPress supports a limited set of elements in theme.json. As of WordPress 6.1+, you can use:

| Element | Selector(s)                                                                       | Notes                          |
| ------- | --------------------------------------------------------------------------------- | ------------------------------ |
| heading | h1, h2, h3, h4, h5, h6                                                            | All heading levels             |
| h1-h6   | Individual heading levels                                                         |                                |
| button  | .wp-element-button, .wp-block-button\_\_link                                      | Not all HTML `<button>` elements |
| link    | a                                                                                 | For all `<a>` elements         |
| caption | .wp-element-caption, .wp-block-audio figcaption, .wp-block-embed figcaption, etc. | For captions in media blocks   |
| cite    | cite                                                                              | For citations in quote blocks  |

## Basic Usage Example

Define global element styles in your theme.json:

```json
{
  "styles": {
    "elements": {
      "heading": {
        "typography": {
          "fontWeight": "700"
        }
      },
      "h2": {
        "typography": {
          "fontSize": "var(--wp--preset--font-size--xxl)",
          "fontFamily": "var(--wp--preset--font-family--source-serif-pro)"
        }
      },
      "button": {
        "typography": {
          "fontWeight": "700",
          "fontSize": "1.2rem"
        },
        "color": {
          "background": "#fafafa",
          "text": "#111111"
        },
        "border": {
          "radius": "0",
          "width": "2px",
          "style": "solid"
        }
      },
      "link": {
        "color": {
          "text": "#111111"
        }
      }
    }
  }
}
```

## Advanced Usage

### Pseudo-classes (e.g., :hover)

You can add pseudo-class styles (like `:hover`) for supported elements, especially links:

```json
{
  "styles": {
    "elements": {
      "link": {
        "color": {
          "text": "#111111"
        },
        ":hover": {
          "color": {
            "text": "#00ff00"
          }
        }
      }
    }
  }
}
```

## References

- [Theme.json elements](https://fullsiteediting.com/lessons/theme-json-elements/)
