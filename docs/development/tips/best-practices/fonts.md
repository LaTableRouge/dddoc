---
sidebar_label: 'Fonts'
sidebar_position: 2
---

# 🔤 Guidelines: Fonts

## 🔄 Converting fonts for most browsers

> **Objective:** Generate font formats compatible with all modern browsers

### 🔹 Step 1: Access the converter

Go to this website: [https://transfonter.org/](https://transfonter.org/)

### 🔹 Step 2: Add your fonts

Add the font files to convert by clicking on the `Add fonts` button

### 🔹 Step 3: Select formats

Check the following formats for maximum compatibility:

- ✅ TTF (TrueType Font)
- ✅ WOFF (Web Open Font Format)
- ✅ WOFF2 (Web Open Font Format 2)
- ✅ SVG (Scalable Vector Graphics)
- ✅ EOT (Embedded OpenType)

### 🔹 Step 4: Configure options (optional)

Make additional adjustments if necessary (particularly useful for fonts not optimized for the web):

- Hinting adjustment
- Subsetting (reducing font weight)
- Adding specific characters

### 🔹 Step 5: Convert

Click on the `Convert` button to start the conversion

### 🔹 Step 6: Download

Download the archive containing all generated formats

---

## 📥 Importing fonts into your project

### 🔹 Step 1: Organize files

Copy the contents of the previously downloaded folder (except for the `demo.html` file) into:

```text
/src/fonts/{Font Name}/
```

> 💡 **Tip:** Create one folder per font family to maintain an organized structure

### 🔹 Step 2: Import CSS declarations

Copy the contents of the `stylesheet.css` file into your SCSS file that manages fonts (usually `_fonts.scss`)

### 🔹 Step 3: Adapt paths

Add the `$fonts-path` variable defined in your SCSS variables for each `@font-face` declaration:

```scss
@font-face {
  font-family: "MerriweatherSans";
  src: url("#{$fonts-path}/MerriweatherSans/MerriweatherSans-ExtraBoldItalic.eot");
  src: url("#{$fonts-path}/MerriweatherSans/MerriweatherSans-ExtraBoldItalic.eot?#iefix") format("embedded-opentype"),
    url("#{$fonts-path}/MerriweatherSans/MerriweatherSans-ExtraBoldItalic.woff2") format("woff2"),
    url("#{$fonts-path}/MerriweatherSans/MerriweatherSans-ExtraBoldItalic.woff") format("woff"),
    url("#{$fonts-path}/MerriweatherSans/MerriweatherSans-ExtraBoldItalic.ttf") format("truetype"),
    url("#{$fonts-path}/MerriweatherSans/MerriweatherSans-ExtraBoldItalic.svg#MerriweatherSans-ExtraBoldItalic") format("svg");
  font-weight: 800;
  font-style: italic;
  font-display: swap;
}
```

### 🔹 Step 4: Configure font variables (recommended)

For consistent use in your project, add your fonts to your variables file:

```scss
$fonts: (
  "title": (
    "name": "MerriweatherSans",
    "serif": serif,
  ),
  "text": (
    "name": "AnotherFont",
  ),
);
```

## 🎨 Using your fonts in the project

### 🔹 Method 1: Direct use with SCSS variables

Use your fonts in your CSS with the `map.get()` function:

```scss
@use "sass:map";
@use "variables";

h1 {
  font-family: map.get($fonts, "title", "name");
}

p {
  font-family: map.get($fonts, "text", "name");
}
```

### 🔹 Method 2: Using CSS variables

#### Step 1: Define CSS variables

Access your `_root.scss` file and add the font loop in your `root` element:

```scss
@use "sass:map";
@use "sass:meta";
@use "variables";

:root {
  @each $font-title, $font-info in variables.$fonts {
    $font-name: map.get($font-info, "name");
    $font-serif: map.get($font-info, "serif");

    @if $font-serif {
      --font-#{$font-title}: #{$font-name}, #{$font-serif};
    } @else {
      --font-#{$font-title}: #{$font-name};
    }
  }
}
```

#### Step 2: Use CSS variables in your styles

```scss
h1 {
  font-family: var(--font-title);
}

p {
  font-family: var(--font-text);
}
```

> 💡 **Tip:** Using CSS variables makes it easy to modify fonts via JavaScript or to create themes.

---

## 🔍 Common troubleshooting

### Problem: Fonts don't display correctly

- Check that the paths to the font files are correct
- Make sure the font formats are supported by the target browsers
- Verify that the font names in the CSS exactly match the names defined in the `@font-face`

### Problem: Flash of Unstyled Text (FOUT)

Add the `font-display` property to control how the font is displayed during loading:

```scss
@font-face {
  // ... other properties
  font-display: swap; // or: block, fallback, optional
}
```

> 💡 **Tip:** `swap` is generally recommended for a better user experience.

---

## 🌐 WordPress and theme.json

> **Recommendation:** For WordPress themes using theme.json (Block Theme or FSE Theme), it is strongly recommended to define fonts in the theme.json file.

### 🔹 Why use theme.json for fonts?

- Native integration with the block editor (Gutenberg)
- Consistency between the admin interface and the front-end
- Support for theme customization features
- Better compatibility with future WordPress developments

### 🔹 Basic structure for fonts in theme.json

```json
{
  "version": 2,
  "settings": {
    "typography": {
      "fontFamilies": [
        {
          "fontFamily": "\"MerriweatherSans\", serif",
          "name": "Merriweather Sans",
          "slug": "merriweather-sans",
          "fontFace": [
            {
              "fontFamily": "MerriweatherSans",
              "fontWeight": "400",
              "fontStyle": "normal",
              "fontStretch": "normal",
              "src": ["file:./assets/fonts/MerriweatherSans/MerriweatherSans-Regular.woff2"]
            },
            {
              "fontFamily": "MerriweatherSans",
              "fontWeight": "700",
              "fontStyle": "normal",
              "fontStretch": "normal",
              "src": ["file:./assets/fonts/MerriweatherSans/MerriweatherSans-Bold.woff2"]
            }
          ]
        },
        {
          "fontFamily": "\"AnotherFont\", sans-serif",
          "name": "Another Font",
          "slug": "another-font",
          "fontFace": [
            {
              "fontFamily": "AnotherFont",
              "fontWeight": "400",
              "fontStyle": "normal",
              "src": ["file:./assets/fonts/AnotherFont/AnotherFont-Regular.woff2"]
            }
          ]
        }
      ]
    }
  }
}
```

### 🔹 Define default styles

You can also define default styles for different elements:

```json
{
  "version": 2,
  "settings": {
    "typography": {
      "fontFamilies": [
        // ... font definitions
      ]
    }
  },
  "styles": {
    "typography": {
      "fontFamily": "var(--wp--preset--font-family--merriweather-sans)"
    },
    "elements": {
      "h1": {
        "typography": {
          "fontFamily": "var(--wp--preset--font-family--merriweather-sans)",
          "fontWeight": "700"
        }
      },
      "h2": {
        "typography": {
          "fontFamily": "var(--wp--preset--font-family--merriweather-sans)",
          "fontWeight": "700"
        }
      },
      "p": {
        "typography": {
          "fontFamily": "var(--wp--preset--font-family--another-font)",
          "fontWeight": "400"
        }
      }
    }
  }
}
```

### 🔹 Usage in templates and blocks

Fonts defined in theme.json are automatically available in the block editor and can be used via CSS variables generated by WordPress:

```css
.custom-element {
  font-family: var(--wp--preset--font-family--merriweather-sans);
}
```

### 🔹 Best practices

- Primarily use the WOFF2 format for better performance
- Include only the font variants you need to reduce site weight
- Use consistent and descriptive slug names
- Test compatibility with different browsers
- Make sure the paths to the font files are correct relative to the theme root

> 💡 **Tip:** For modern WordPress themes, this approach is preferable to traditional methods using `@font-face` in CSS/SCSS files.
