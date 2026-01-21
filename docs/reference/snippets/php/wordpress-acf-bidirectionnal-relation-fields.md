# Rendre un champ 'relation' ACF bidirectionnel

**Si deux produits ont un champ relation commun, la mise à jour depuis l'un mettra l'autre à jour et vice versa.**

```php
function h5_bidirectional_relation($value, $post_id, $field) {
    // set the two fields that you want to create a two way relationship for (can be the same)
    $key_a = 'FIELD_KEY_A';
    $key_b = 'FIELD_KEY_B';

    if ($key_a != $field['key']) {
        $temp = $key_a;
        $key_a = $key_b;
        $key_b = $temp;
    }

    $field_a = acf_get_field($key_a);
    $field_b = acf_get_field($key_b);

    $name_a = $field_a['name'];
    $name_b = $field_b['name'];

    $old_values = get_post_meta($post_id, $name_a, true);

    if (!is_array($old_values)) {
        if (empty($old_values)) {
            $old_values = [];
        } else {
            $old_values = [$old_values];
        }
    }

    $new_values = $value;

    if (!is_array($new_values)) {
        if (empty($new_values)) {
            $new_values = [];
        } else {
            $new_values = [$new_values];
        }
    }

    $add = $new_values;
    $delete = array_diff($old_values, $new_values);

    $add = array_values($add);
    $delete = array_values($delete);

    if (!count($add) && !count($delete)) {
        return $value;
    }

    // loop through all of the posts that need to have the relationship removed
    for ($i = 0; $i < count($delete); $i++) {
        $related_values = get_post_meta($delete[$i], $name_b, true);
        if (!is_array($related_values)) {
            if (empty($related_values)) {
                $related_values = [];
            } else {
                $related_values = [$related_values];
            }
        }
        $related_values = array_diff($related_values, [$post_id]);
        update_post_meta($delete[$i], $name_b, $related_values);
        update_post_meta($delete[$i], '_' . $name_b, $key_b);
    }

    // loop through all of the posts that need to have the relationship added
    for ($i = 0; $i < count($add); $i++) {
        $related_values = get_post_meta($add[$i], $name_b, true);
        if (!is_array($related_values)) {
            if (empty($related_values)) {
                $related_values = [];
            } else {
                $related_values = [$related_values];
            }
        }
        if (!in_array($post_id, $related_values)) {
            $related_values[] = $post_id;
        }
        update_post_meta($add[$i], $name_b, $related_values);
        update_post_meta($add[$i], '_' . $name_b, $key_b);
    }

    return $value;
}

// Si le champ est identique, ne laisser qu'un add_filter.
add_filter('acf/update_value/key=FIELD_KEY_A', 'h5_bidirectional_relation', 10, 3);
add_filter('acf/update_value/key=FIELD_KEY_B', 'h5_bidirectional_relation', 10, 3);
```
