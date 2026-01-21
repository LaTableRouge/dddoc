# Native (React) Block Configuration Example with Timber

This guide explains how to create and configure native (React) blocks for WordPress, using a modern workflow and best practices. For details on processing and registering blocks, see [Processing Blocks](processing-blocks.md).

## Folder Structure


- 📂 your-block
  - [block.json](#block-configuration-blockjson)
  - 📂 assets
    - [index.jsx](#main-entry-point-indexjsx)
    - view.js
    - 📂 scripts
      - [save.jsx](#save-component-savejsx)
      - [edit.jsx](#edit-component-editjsx)
    - 📂 styles
      - [style.scss](#frontend-styles-stylescss)
      - [editor.scss](#editor-styles-editorscss)


## Block Configuration (block.json)

The `block.json` file is the central configuration file for your block. It defines metadata, settings, and supported features.

```json
{
  "$schema": "https://schemas.wp.org/trunk/block.json",
  "apiVersion": 3,
  "name": "namespace/your-block",
  "title": "Your block",
  "icon": "block-default",
  "description": "A custom react block.",
  "category": "widgets",
  "keywords": ["block", "example"],
  "version": "1.0.0",
  "textdomain": "your-textdomain",
  "attributes": {},
  "supports": {},
  "viewScript": "file:./assets/view.js",
  "editorScript": "file:./assets/index.js",
  "editorStyle": "file:./assets/index.css",
  "style": "file:./assets/style-index.css",
  "viewStyle": "file:./assets/view.css"
}
```

## Main Entry Point (index.jsx)

This file registers the block and links the edit/save components and styles.

```jsx
/**
 * Let webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * All files containing `style` keyword are bundled together. The code used
 * gets applied both to the front of your site and to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import "./styles/style.scss";

/**
 * Registers a new block provided a unique name and an object defining its behavior.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
import {registerBlockType} from "@wordpress/blocks";

import metadata from "../block.json";

/**
 * Internal dependencies
 */
import Edit from "./scripts/edit";
import Save from "./scripts/save";

/**
 * Every block starts by registering a new block type definition.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
registerBlockType(metadata.name, {
  /**
   * @see ./edit.js
   */
  edit: Edit,

  /**
   * @see ./save.js
   */
  save: Save,
});
```

## Edit Component (edit.jsx)

The edit component defines the block's editor interface.

```jsx
import "../styles/editor.scss";

import {useBlockProps} from "@wordpress/block-editor";
import {__} from "@wordpress/i18n";

export default function Edit({attributes, isSelected, setAttributes}) {
  // ---------- attributes are the states stored by WordPress
  // They are defined in the block.json
  // ----------

  // ---------- BlockProps are the data that will be inserted into the main html tag of the block (style, data-attr, etc...)
  const blockProps = useBlockProps();
  // ----------

  // ---------- States that aren't stored by WordPress
  // They are only useful for the preview
  // ----------

  // ---------- Other variables
  // ----------

  return (
    <section {...blockProps}>
      <h1>{__("this is my custom block", "your-textdomain")}</h1>
    </section>
  );
}
```

## Save Component (save.jsx)

The save component defines the block's frontend markup.

```jsx
import {useBlockProps} from "@wordpress/block-editor";
import {__} from "@wordpress/i18n";

export default function Save({attributes}) {
  const blockProps = useBlockProps.save();

  return (
    <section {...blockProps}>
      <h1>{__("this is my custom block", "your-textdomain")}</h1>
    </section>
  );
}
```

## Styles

### Frontend Styles (style.scss)

```scss
.wp-block-namespace-your-block {
  border: 1px solid #ccc;
  min-height: 200px;
}
```

### Editor Styles (editor.scss)

```scss
.wp-block-namespace-your-block {
  // Editor-specific styles
}
```

## Using Timber Inside a React Block

To integrate Timber with your React block, use a PHP render callback (`render.php`) to process block attributes and render a Twig template.

### 1. Folder Structure Update

```plaintext
📂 your-block
├── 📂 includes
│   └── render.php         # PHP render callback
└── 📂 views
    └── view.twig          # Twig template
```

### 2. Block Configuration Update (block.json)

Add the `render` parameter to your `block.json` to specify the PHP render callback:

```json
{
  "render": "file:./includes/render.php",
}
```

### 3. PHP Render Callback (includes/render.php)

```php
use Timber\Timber;

if (!isset($block) || !isset($attributes)) {
    return '';
}

$context = Timber::context();

// Put all the block context in one variable so that we can scope it before passing it to the view
$block_context = [];

$inner_blocks = $block->inner_blocks;
$inner_blocks_html = '';
if (!empty($inner_blocks)) {
    foreach ($inner_blocks as $inner_block) {
        $inner_blocks_html .= $inner_block->render();
    }
}

$block_context['inner_blocks'] = $inner_blocks_html;

$context['your-block'] = $block_context;

Timber::render('views/view.twig', $context['your-block']);
```

### 4. Twig Template (views/view.twig)

```twig
<section class="block-react---your-block">
  {{ inner_blocks|raw }}
</section>
```

## Best Practices

1. **Block Structure**

   - Keep a consistent folder structure
   - Separate editor and frontend code
   - Use meaningful file names

2. **Code Organization**

   - Use ES6+ features
   - Follow WordPress coding standards

3. **Performance**

   - Use dynamic imports for heavy dependencies
   - Optimize bundle size
   - Implement proper caching strategies

4. **Internationalization**
   - Use `@wordpress/i18n` for translations
   - Provide translation strings
   - Test with different languages

## References

- [WordPress Block Editor Handbook](https://developer.wordpress.org/block-editor/)
- [@wordpress/scripts](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-scripts/)
- [Block API Reference](https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/)
- [Timber Documentation](https://timber.github.io/docs/)
