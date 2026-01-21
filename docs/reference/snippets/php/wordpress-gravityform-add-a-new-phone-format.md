# Add a new phone format

```php
function gform_french_phone_format($phone_formats) {
    $phone_formats['fr'] = [
        'label' => 'FR',
        'mask' => false,
        'regex' => '/^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/',
        'instruction' => false,
    ];

    return $phone_formats;
}
add_filter('gform_phone_formats', 'gform_french_phone_format', 10, 2);
```
