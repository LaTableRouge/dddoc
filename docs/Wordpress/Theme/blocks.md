---
sidebar_position: 3
---

# Styling Blocks and Adding Variations with theme.json

Styling WordPress blocks is most effective when you leverage the power of `theme.json` and block style variations.

This approach ensures consistency, maintainability, and a better user experience in the block editor.

## Best Practices

- Use `theme.json` to define as much block styling as possible for maintainability and editor integration.
- Use block style variations to offer alternative looks for blocks, making it easy for users to switch styles in the editor.
- Add custom CSS only for edge cases or when you need to go beyond what `theme.json` and variations can do.
- Keep naming conventions consistent for slugs and variations.

## Block Styles with theme.json

You can target specific blocks in your `theme.json` using the `styles.blocks` section. For example, to style the core button and paragraph blocks:

```json
{
  "styles": {
    "blocks": {
      "core/button": {
        "color": {
          "background": "var(--wp--preset--color--accent-1)",
          "text": "var(--wp--preset--color--base-1)"
        },
        "border": {
          "radius": "8px"
        }
      },
      "core/paragraph": {
        "typography": {
          "fontSize": "var(--wp--preset--font-size--medium)",
          "lineHeight": "1.6"
        }
      }
    }
  }
}
```

## Block Style Variations

Block style variations allow you to offer multiple visual options for a block.

These are typically defined in JSON files within your theme's `/styles` or `/styles/blocks` directory, or registered via PHP.

Variations appear in the block's "Styles" panel in the editor, allowing users to select them with a click.

### Example: Adding a style variation for the Social Links block

1. **Create a JSON file** (e.g., `/styles/blocks/social-links/base-3.json`):

   ```json
   {
     "$schema": "https://schemas.wp.org/trunk/theme.json",
     "version": 3,
     "title": "Base 3",
     "slug": "base-3",
     "blockTypes": ["core/social-links"],
     "styles": {
       "color": {
         "background": "var(--wp--preset--color--base-3)",
         "text": "var(--wp--preset--color--black)"
       },
       "spacing": {
         "padding": {
           "bottom": "1rem",
           "left": "2rem",
           "right": "2rem",
           "top": "1rem"
         }
       },
       "blocks": {
         "core/social-link": {
           "color": {
             "text": "inherit",
             "background": "transparent"
           },
           "border": {
             "width": "1px",
             "color": "transparent",
             "radius": "0px",
             "style": "solid"
           },
           "spacing": {
             "padding": {
               "bottom": "0.5rem",
               "left": "0.5rem",
               "right": "0.5rem",
               "top": "0.5rem"
             }
           }
         }
       }
     }
   }
   ```

2. **The variation will appear in the block's "Styles" panel in the editor**, allowing users to select it with a click.

## References & Further Reading

- [Capitaine WP: Ajouter de nouvelles variations de styles aux blocs existants (FR)](https://capitainewp.io/formations/wordpress-full-site-editing/variations-blocs-natifs/)
- [Full Site Editing: Global Style Variations](https://fullsiteediting.com/lessons/global-style-variations/)
