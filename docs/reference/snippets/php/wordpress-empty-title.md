# Wordpress add a placeholder to page or post when no title is defined

```php
add_filter(
	'the_title',
	function( $title ) {
		if (!is_admin() && empty($title)) {
			$title = _x( '(No title)', 'Used if post or pages has no title');
		}

		return $title;
	}
);
```
