# Remove les couleurs par défaut de Wordpress


```php
// https://fullsiteediting.com/lessons/how-to-filter-theme-json-with-php/

function removeDefaultValuesFromCSSVariables($themeJSON) {
    // Only do this in the front-end
    if (!is_admin()) {
        $data = $themeJSON->get_data();

        if (!empty($data)) {
            // Remove les couleurs de Wordpress
            if (isset($data['settings']['color'])) {
                $data['settings']['color']['defaultPalette'] = false;
                $data['settings']['color']['defaultGradients'] = false;
                $data['settings']['color']['defaultDuotone'] = false;
                $data['settings']['color']['duotone'] = [];
                $data['settings']['color']['gradients'] = [];
                $data['settings']['color']['palette'] = [];
            }

            // Remove les ombres de Wordpress
            if (isset($data['settings']['shadow'])) {
                $data['settings']['shadow']['defaultPresets'] = false;
                $data['settings']['shadow']['presets'] = [];
            }

            // Remove les tailles de typo de Wordpress
            if (isset($data['settings']['typography'])) {
                $data['settings']['typography']['fontSizes'] = [];
            }
        }
    }

    return $themeJSON->update_with($data);
}
add_filter('wp_theme_json_data_default', 'removeDefaultValuesFromCSSVariables');
```
