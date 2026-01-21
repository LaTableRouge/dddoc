# Remplacer les valeur booléenne en format string par un boolean dans un array multidimensionnel

```php
if (!function_exists('boolify')) {
    function boolify($arr) {
        foreach ($arr as $key => $val) {
            if (is_array($val)) {
                $arr[$key] = boolify($val);
            } else {
                if ($val == 'true') {
                    $arr[$key] = true;
                } elseif ($val == 'false') {
                    $arr[$key] = false;
                }
            }
        }

        return $arr;
    }
}

// utilisation
$array = [
    'ayaya' => 'true',
    'oyoyoy' => [
        'uwu' => 'false',
        'owo' => 'true',
    ]
];
$arrayBoolified = boolify($array);
```
