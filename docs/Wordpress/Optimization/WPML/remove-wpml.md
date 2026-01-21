---
sidebar_position: 5
---

# How to remove WPML

## Intro
This documentation will explain how to split a multi-language website into a simple website for each language / geo.
This documentation works only with WPML plugin and will use Bedrock and docker.

### What's Bedrock

Bedrock is an advanced WordPress boilerplate that enhances the management, organization, and security of a WordPress installation.

Bedrock separates WordPress core files from the custom content (such as themes and plugins), allowing for better version control and a more secure structure.

It introduces modern development practices like dependency management with Composer, environment configuration, and a cleaner file structure, making WordPress development more efficient and scalable.

### What's docker

Docker is a tool that helps developers package their applications so they can run smoothly on any computer.

Think of it like putting an app into a "box" that contains everything it needs to work properly—like code, settings, and tools.

This way, whether you're using your laptop or a server somewhere else, the app will always run the same way.

Docker also makes it easier and faster to move applications from one place to another and ensures they work without issues.

This reduces the time spent on setup and makes managing apps simpler.


## Steps

### 1- Clone the wordpress with the new structure (under Docker & Bedrock)
The documentation to do it is [available here](https://docusaurus.n10.xyz/docs/Wordpress/Bedrock/migrate).

### 2- Change to the language you will keep
Change the default language to the one you want to keep.

### 3- Delete other languages
Change the XXX with the code country you need to remove (ex: arg).
Please change the table's prefix if needed.
```sql
DELETE FROM wptm_posts
WHERE ID IN (
  SELECT element_id FROM wptm_icl_translations
  WHERE language_code = 'XXX' AND element_type LIKE '%post_%'
);

DELETE FROM wptm_terms
WHERE term_id IN (
  SELECT element_id FROM wptm_icl_translations
  WHERE language_code = 'XXX' AND element_type LIKE '%tax_%'
);
```
### Note
Somes posts type and categories aren't translated and exist only on the main language (such has ACF fields).
So to delete the main language you will need to select the current elements to delete. 
The "element_type" query is just and example that comes from TM. 
Replace XXX with the main language of the website.
```sql
DELETE FROM wptm_posts
WHERE ID IN (
SELECT element_id FROM wptm_icl_translations
WHERE language_code = 'XXX' AND element_type IN (
  'post_post', 'post_page', 'post_attachment', 'post_revision', 'post_oembed_cache',
  'post_post_type_questionna', 'post_pretty-link', 'post_clubs', 'post_joueurs',
  'post_competitions', 'post_repost', 'post_gp_elements', 'post_wpcode', 'post_nav_menu_item'
)
);

DELETE FROM wptm_terms
WHERE term_id IN (
SELECT element_id FROM wptm_icl_translations
WHERE language_code = 'XXX' AND element_type IN ( 'tax_category', 'tax_pays', 'tax_post_tag', 'tax_quiz', 'tax_nav_menu' )
);
```

### 4- Change page for homepage
Change 'id_of_the_new_homepage' for the ID of the new homepage (only if you aren't in the original language).
```bash
wp option update page_on_front id_of_the_new_homepage
```

### 5- Delete items by lang in Widgets

### 6- Set defaut category
Change the 'XXX' by the category ID you want as a primary category
```bash
wp option update default_category XXX
```

### 7- Set option WPLANG
Change 'XXX' bythe language code of the new website (ex: es_PE).
```bash
wp option update WPLANG 'XXX'
```

### 8- Deactivate WPML plugins

### 9- Load .MO files
```php
add_action( 'after_setup_theme', function () {

    $mofiles = array(
        'generatepress-child',
        'generatepress',
    );

    foreach ( $mofiles as $mofile ) {
        load_textdomain( $mofile, get_stylesheet_directory() . '/languages/' . $mofile . '-' . get_locale() . '.mo' );
    }

}, 12, 2 );
```

### 10- Delete orphan meta
You can use a plugin for that, WP-Optimize is a good choice.

### 11- Update permalink in admin

### 12- Delete old option
```sql
DELETE FROM `wp_options` WHERE `option_name` LIKE '_wpml_%';
```

### 13- Cleaning WPML Data after Plugin Uninstallation
After doing this, we need to clean the database so it will be lighter and faster.
There is some technical documentation on how to do it here: [Clean WPML tables](https://docusaurus.n10.xyz/docs/Wordpress/Optimization/Cleaning_WPML_data)

### 14- Run wp cli search-replace for attachment (for bedrock structure)
As we change the Wordpress structure we need to update the attachment's path.
We can do it with wp-cli, with this command:
```bash
wp search-replace "/wp-content/uploads" "/app/uploads"
```

### 15- Redirect old attachment folders to the new one

A redirection for Google is required for the attachement.

As the old WP structure is /wp-content/uploads/ and the new one /app/uploads.

This should be added by the Server's team.

### 16- HrefLang
Add the plugin [HrefLang](https://gitlab.example.com/organization/wordpress/plugins/hreflang) and set the hreflang you had.

It might be possible to have the list of it by a crawl, please consult your SEO Team.
