# Savoir si l'on est en local ou pas

```php
if (!function_exists('get_env')) {
    function get_env() {
        $local = [
            '127.0.0.1',
            '::1'
        ];

        $protocol = ((!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] != 'off') || $_SERVER['SERVER_PORT'] == 443) ? 'https://' : 'http://';
        $url = $protocol . $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI'];

        return [
            'env' => !in_array($_SERVER['REMOTE_ADDR'], $local) ? 'production' : 'local',
            'url' => $url,
        ];
    }
}

// utilisation
$env = get_env()['env'];
$env === 'production' ? 'enqueue minified style' : 'enqueue normal style';
```
