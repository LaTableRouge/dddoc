# Wordpress Enable/Disable plugins based on the environment type

```php
/*
* ================================ Back-office notices plugins environnement
*/
function env_plugins_notice() {
    $all_plugins = get_plugins();
    $local_plugins = ['Query Monitor' => 'query-monitor/query-monitor.php'];
    $prod_plugins = [
        'WP Rocket' => 'wp-rocket/wp-rocket.php',
        'Google Tag Manager for Wordpress' => 'duracelltomi-google-tag-manager/duracelltomi-google-tag-manager-for-wordpress.php'
    ];

    $to_enable = [];
    $to_disable = [];

    $isProd = wp_get_environment_type() === 'production';

    if (is_admin()) {
        foreach ($local_plugins as $plugin_name => $plugin_directory) {
            if (array_key_exists($plugin_directory, $all_plugins)) {
                if ($isProd) {
                    if (is_plugin_active($plugin_directory)) {
                        $to_disable[$plugin_name] = $plugin_directory;
                    }
                } else {
                    if (!is_plugin_active($plugin_directory)) {
                        $to_enable[$plugin_name] = $plugin_directory;
                    }
                }
            }
        }

        foreach ($prod_plugins as $plugin_name => $plugin_directory) {
            if (array_key_exists($plugin_directory, $all_plugins)) {
                if ($isProd) {
                    if (!is_plugin_active($plugin_directory)) {
                        $to_enable[$plugin_name] = $plugin_directory;
                    }
                } else {
                    if (is_plugin_active($plugin_directory)) {
                        $to_disable[$plugin_name] = $plugin_directory;
                    }
                }
            }
        }

        if (!empty($to_enable) || !empty($to_disable)) {
            echo '<div class="notice notice-error is-dismissible">';
            echo sprintf(__('<p><strong>Plugin activation/deactivation (Current environment: %s)</strong><br/>'), wp_get_environment_type());
            if (!empty($to_enable)) {
                echo sprintf(__('The following plugins will be enabled: %s<br/>'), implode(', ', array_keys($to_enable)));
            }
            if (!empty($to_disable)) {
                echo sprintf(__('The following plugins will be disabled: %s'), implode(', ', array_keys($to_disable)));
            }
            echo '</p>';

            $action_url = admin_url('plugins.php');
            $action_url = add_query_arg(['action' => 'setup_plugins_env'], $action_url);

            echo sprintf(__('<p><a href="%s" class="button-primary">Enable / Disable plugins for %s environment</a></p>'), esc_url($action_url), wp_get_environment_type());
            echo sprintf(__('<p><em>You\'re not on the %s server? Check the environment configured in wp-config.php.</em></p>'), wp_get_environment_type());
            echo '</div>';
        }

        global $pagenow;
        if (
            isset($_GET['action'])
            && $_GET['action'] == 'setup_plugins_env'
            && $pagenow == 'plugins.php'
        ) {
            if (!empty($to_enable)) {
                activate_plugins($to_enable);
            }

            if (!empty($to_disable)) {
                deactivate_plugins($to_disable);
            }

            wp_redirect(admin_url($pagenow));
        }
    }
}
add_action('admin_notices', 'env_plugins_notice');
```
