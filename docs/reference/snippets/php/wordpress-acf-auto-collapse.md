# Auto collapse des champs acf sur la page désignée

```php
function h5_admin_home_page_meta_boxes_collapse() {
    global $my_admin_page;
    $screen = get_current_screen();

    if (is_admin() && ($screen->id == '[NOM_DE_LA_PAGE')) {
        echo "<script type='text/javascript'>

        (function ($) {
            $(document).ready(function(){
                $('#postbox-container-2 .postbox').addClass('closed');

            });
        })(jQuery);

    </script>";
    }
}
add_action('admin_notices', 'h5_admin_home_page_meta_boxes_collapse');
```
