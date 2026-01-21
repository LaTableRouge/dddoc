# Wrap une chaine de caractère donnée dans une string avec de l'html

```php
if (!function_exists('stringhighlightWords')) {
    function stringhighlightWords($sentence, $search) {
    $words = explode(' ',$search); //explode every search word

    foreach ($words as $word) {
        $matchWords[] = "/{$word}/i";
    }

    return preg_replace($matchWords, '<span class="match">$0</span>', $sentence);
}
}

// utilisation
$string = 'Ayayay OYOYO UYUYUYUYU';
$stringWithMatches = stringhighlightWords($string, 'OYOYO');
```
