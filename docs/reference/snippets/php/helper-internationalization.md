# Traduire une string à partir d'un objet de traductions

```php
$translationsObject = '{
    "je bénis la pluie en afrique" : "",
    "j\'aime le pain" : "I like bread",
    "##STRING## aime le pain" : "##STRING## likes bread"
}';
$translationsObject = json_decode($translationsObject, true);
define('TRANSLATIONS', serialize($translationsObject));

function _e($key, $stringToReplace = null) {
    $translations = unserialize(TRANSLATIONS);
    $string = $key;
    if (isset($translations[$key])) {
        $string = !empty($translations[$key]) ? $translations[$key] : $string;
    }
    if ($stringToReplace) {
        $string = str_replace('##STRING##', $stringToReplace, $string);
    }
    echo $string;
}

function __($key, $stringToReplace = null) {
    $translations = unserialize(TRANSLATIONS);
    $string = $key;
    if (isset($translations[$key])) {
        $string = !empty($translations[$key]) ? $translations[$key] : $string;
    }
    if ($stringToReplace) {
        $string = str_replace('##STRING##', $stringToReplace, $string);
    }

    return $string;
}

echo __('ayaya');
echo __('je bénis la pluie en afrique');
echo __('j\'aime le pain');
$name = 'Quentin';
echo __('##STRING## aime le pain', $name);

_e('ayaya');
_e('je bénis la pluie en afrique');
_e('j\'aime le pain');
$name = 'Quentin';
_e('##STRING## aime le pain', $name);
```
