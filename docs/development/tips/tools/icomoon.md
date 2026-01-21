---
sidebar_label: 'Icomoon'
sidebar_position: 3
---

# 📑 Icomoon - Icon Font Guidelines

Icomoon is an online tool that allows you to generate an icon library usable as a font from SVG files.

## 🔗 Useful Links

- [Icomoon App](https://icomoon.io/app) - Create and manage your icon sets
- [Icomoon App Documentation](https://icomoon.io/docs#app) - Official documentation

## 🔄 How to update an existing icon library?

### 🔹 Step 1: Access Icomoon

Go to the Icomoon website: [https://icomoon.io/app/](https://icomoon.io/app/)

### 🔹 Step 2: Clear the workspace

Click on the menu in the top right, then on `Remove Set`. This clears the Icomoon history.

### 🔹 Step 3: Import your existing library

Drag and drop the `selection.json` file from your project.

> 💡 This file is usually found in a `/fonts/icomoon` folder

Click on `Yes` in the modal displaying the message:

> **Your icon selection was loaded. Would you like to load all the settings stored in your selection file?**

### 🔹 Step 4: Add new icons

To add icons:

1. Drag and drop the SVG files of the icons you want to add
2. Edit the icons to remove colors or paddings present in the SVG
3. Modify the "Names" field to use a clear and descriptive name
   - **Example:** `icon_CHECK-BIG` → `check`
   - ⚠️ This name will be used to generate the CSS class
4. Select the icons by clicking on them (they should have a yellow frame)

### 🔹 Step 5: Generate the icon font

In the menu at the bottom of the screen, click on `Generate Font` on the right.

### 🔹 Step 6: Check and rename icons

If not already done, rename the previously added icons:

- Use lowercase names
- Separate words with hyphens (-)

```text
Examples:
icon_CHECK-BIG → check
icon_FLECHE-DROITE → right-arrow
```

### 🔹 Step 7: Configure preferences

Click on `Preferences` at the top:

- In the `Version` section, increment the value in the `Minor` field
- In the `Generate preprocessor variables for:` section, select `Sass (with @use)`

### 🔹 Step 8: Download the files

In the menu at the bottom of the screen, click on `Download` on the right.

### 🔹 Step 9: Update your project

Copy and replace the following files where you found the `selection.json` file:

- The `fonts` folder
- The `selection.json` file
- The `style.scss` file
- The `variables.scss` file

---

## 🚀 How to Use the Icons in Your Project (example)

### 📥 Import Icomoon

#### 1. Configure Variables

- Access your `_variables.scss` file
- Add your icon font name to the `$fonts` list:
  ```scss
  $fonts: (
    "icons": (
      "name": "icomoon",
    ),
  );
  ```

#### 2. Configure Fonts

- Access your `_fonts.scss` file
- Import the `Icomoon` files and replace the default variables:
  ```scss
  @use "sass:map";
  @use "/src/styles/abstracts/variables" as *;
  @use "/src/fonts/icomoon/variables" with (
    $icomoon-font-path: "#{$fonts-path}/icomoon/fonts",
    $icomoon-font-family: map.get($fonts, "icons", "name")
  );
  @use "/src/fonts/icomoon/style";
  ```

### 📋 Add the Icons List to CSS Variables (Optional)

#### 1. In the Fonts File

- Access your `_fonts.scss` file
- Create a list with all your icons like this:
  ```scss
  $icons: (
    "right-arrow": variables.$icon-right-arrow,
  );
  ```

#### 2. In the Root File

- Access your `_root.scss` file
- Add the icon loop in your `root` element (can be `:root` or another selector):

  ```scss
  @use "sass:map";
  @use "sass:meta";
  @use "../abstracts/variables";
  @use "../base/fonts";

  :root {
    @each $font-title, $font-info in variables.$fonts {
        $font-name: map.get($font-info, 'name');
        $font-serif: map.get($font-info, 'serif');

        @if $font-serif {
            --font-#{$font-title}: #{$font-name}, #{$font-serif};
        } @else {
            --font-#{$font-title}: #{$font-name};
        }
    }
    
    @each $icon, $value in fonts.$icons {
        --icon-#{$icon}: "#{$value}";
    }
  }
  ```

### 💻 Using with CSS Classes

Add the icon class to your element:

```html
<span class="icon-right-arrow"></span>
```

This element will display a `::before` containing your icon.

### 🎨 Using with CSS Variables

Requires the "[Add the Icons List to CSS Variables (Optional)](#-add-the-icons-list-to-css-variables-optional)" step

```scss
.your-element {
  &::before {
    font-family: var(--font-icons);
    content: var(--icon-right-arrow);
    margin-inline-end: 5px;
    font-weight: 400;
  }
}
```

> 💡 **Tip:** You can check all available variables in the root element via the web browser inspector.
