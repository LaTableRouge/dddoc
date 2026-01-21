# Cleaning WPML Data after Plugin Uninstallation

After uninstalling the **WPML (WordPress Multilingual Plugin)**, you might want to remove all the related data from your WordPress database.

WPML leaves behind several tables, options, and metadata that can clutter your database.

This guide will walk you through the steps to clean up all WPML-related data using SQL queries.

:::warning Backup Your Database First
Before proceeding, ensure that you have created a **backup** of your database. This is crucial in case something goes wrong.
:::

## Clean posts, terms and translations tables

```sql
DELETE FROM wptm_posts
	WHERE ID IN (
	    SELECT element_id FROM wptm_icl_translations
	    WHERE (language_code != 'fr' AND (source_language_code != 'fr' OR
source_language_code IS NULL)) AND element_type LIKE '%post_%'
	);

DELETE FROM wptm_terms
	WHERE term_id IN (
    SELECT element_id FROM wptm_icl_translations
    WHERE (language_code != 'fr' AND (source_language_code != 'fr' OR
source_language_code IS NULL)) AND element_type LIKE '%tax_%'
);
```

## 1. Drop WPML Tables

WPML creates its own set of tables for managing translations. Use the following SQL queries to remove them:

```sql
DROP TABLE IF EXISTS `wp_icl_background_task`;
DROP TABLE IF EXISTS `wp_icl_mo_files_domains`;
DROP TABLE IF EXISTS `wp_icl_reminders`;
DROP TABLE IF EXISTS `wp_icl_string_batches`;
DROP TABLE IF EXISTS `wp_icl_string_positions`;
DROP TABLE IF EXISTS `wp_icl_content_status`;
DROP TABLE IF EXISTS `wp_icl_core_status`;
DROP TABLE IF EXISTS `wp_icl_flags`;
DROP TABLE IF EXISTS `wp_icl_languages`;
DROP TABLE IF EXISTS `wp_icl_languages_translations`;
DROP TABLE IF EXISTS `wp_icl_locale_map`;
DROP TABLE IF EXISTS `wp_icl_message_status`;
DROP TABLE IF EXISTS `wp_icl_node`;
DROP TABLE IF EXISTS `wp_icl_string_packages`;
DROP TABLE IF EXISTS `wp_icl_string_pages`;
DROP TABLE IF EXISTS `wp_icl_string_status`;
DROP TABLE IF EXISTS `wp_icl_string_translations`;
DROP TABLE IF EXISTS `wp_icl_string_urls`;
DROP TABLE IF EXISTS `wp_icl_strings`;
DROP TABLE IF EXISTS `wp_icl_translate`;
DROP TABLE IF EXISTS `wp_icl_translate_job`;
DROP TABLE IF EXISTS `wp_icl_translations`;
DROP TABLE IF EXISTS `wp_icl_translation_batches`;
DROP TABLE IF EXISTS `wp_icl_translation_downloads`;
DROP TABLE IF EXISTS `wp_icl_translation_status`;
```

## 2. Remove WPML Options from `wp_options`

WPML stores several options in the `wp_options` table. You can remove them by executing the following SQL queries:

```sql
DELETE FROM `wp_options` WHERE `option_name` LIKE 'icl\_%';
DELETE FROM `wp_options` WHERE `option_name` LIKE 'wpml\_%';
```

## 3. Remove WPML Postmeta and Termmeta

WPML adds metadata to posts and terms in your WordPress site. Clean this metadata using the following SQL commands:

- **Postmeta**:

```sql
DELETE FROM `wp_postmeta` WHERE `meta_key` LIKE '%\_icl\_%';
```

- **Termmeta** (for taxonomy terms):

```sql
DELETE FROM `wp_termmeta` WHERE `meta_key` LIKE '%\_icl\_%';
```

## 4. Remove WPML Usermeta (if any)

WPML may also add metadata to users. You can remove it with this query:

```sql
DELETE FROM `wp_usermeta` WHERE `meta_key` LIKE '%\_icl\_%';
```

## 5. Remove WPML Terms from `wp_terms`

If WPML added terms related to languages in `wp_terms`, use the following query to remove them:

```sql
DELETE FROM `wp_terms` 
WHERE `term_id` IN (
    SELECT `term_id` 
    FROM `wp_termmeta` 
    WHERE `meta_key` LIKE '%\_icl\_%'
);
```

## 6. Verify Removal

After running the above queries, verify that no WPML-related data remains in your database with the following queries:

```sql
SELECT * FROM `wp_options` WHERE `option_name` LIKE '%\_icl\_%';
SELECT * FROM `wp_postmeta` WHERE `meta_key` LIKE '%\_icl\_%';
```

If these queries return no results, the data cleanup was successful.

---

## Additional Cleanup of WPML Data after Plugin Uninstallation

After uninstalling the **WPML (WordPress Multilingual Plugin)**, some additional data beyond the basic tables, options, and metadata might remain in your WordPress database.

This guide will cover all the necessary steps to completely clean up any residual WPML data, ensuring your database is free of unnecessary clutter.

## 7. Remove WPML Terms from Taxonomies

WPML may create terms in taxonomies to manage content translations. You can check for and remove these terms using the following SQL queries:

### Find WPML-related terms:
```sql
SELECT * FROM `wp_terms` WHERE `name` LIKE '%\_icl\_%';
```

### Delete WPML-related terms:
```sql
DELETE FROM `wp_terms` WHERE `name` LIKE '%\_icl\_%';
```

## 8. Remove WPML Custom Post Types

WPML often creates custom post types to store translation data. You can identify and delete these custom post types by running the following queries:

### Find WPML custom post types:
```sql
SELECT * FROM `wp_posts` WHERE `post_type` LIKE '%\_icl\_%';
```

### Delete WPML custom post types:
```sql
DELETE FROM `wp_posts` WHERE `post_type` LIKE '%\_icl\_%';
```

## 9. Remove WPML Transients

WPML might use WordPress **transients** to store temporary data. These transients are stored in the `wp_options` table. You can remove them with the following queries:

### Remove WPML transients:
```sql
DELETE FROM `wp_options` WHERE `option_name` LIKE '_transient_icl_%';
DELETE FROM `wp_options` WHERE `option_name` LIKE '_transient_timeout_icl_%';
```

## 10. Check for Additional WPML-related Tables

If you used additional WPML modules or extensions, they may have created custom tables. You can check for tables containing "icl" or "wpml" in their names with the following commands:

### Find additional WPML-related tables:
```sql
SHOW TABLES LIKE '%icl%';
SHOW TABLES LIKE '%wpml%';
```

### Delete additional WPML-related tables:
If any tables are found, you can delete them using `DROP TABLE` as appropriate.

## 11. Check for WPML-related Redirections

If WPML set up URL redirections for different languages, you should check your redirection plugins or `.htaccess` file for any WPML-related entries.

These may need to be manually removed to ensure proper functioning of your site.

## 12. Remove WPML Files from WordPress

While not directly related to your database, it's important to check if any WPML files are still present in your WordPress directory. Ensure that all WPML files and folders have been deleted from:

- `wp-content/plugins/`
- Any custom plugin directories or subfolders related to WPML.

## 13. Verify WPML Data Cleanup

After completing the above steps, run the following queries to verify that no WPML-related data remains in your database:

### Verify no WPML options remain:
```sql
SELECT * FROM `wp_options` WHERE `option_name` LIKE '%\_icl\_%';
```

### Verify no WPML postmeta remains:
```sql
SELECT * FROM `wp_postmeta` WHERE `meta_key` LIKE '%\_icl\_%';
```

If these queries return no results, you have successfully removed all WPML-related data from your site.

## 14. Remove WPML Language Switcher Widgets and Menu Items

If WPML language switchers were added via widgets or menus, they may still exist in your WordPress setup.

### Delete WPML Widgets:
Run the following query to check for WPML-related widgets:

```sql
SELECT * FROM `wp_options` WHERE `option_name` LIKE '%widget_icl%';
```

If any entries are found, you can manually delete the corresponding widgets.

### Delete WPML Menu Items:
If WPML added menu items for language management, remove them with the following query:

```sql
DELETE FROM `wp_term_relationships` 
WHERE `object_id` IN (
    SELECT `ID` 
    FROM `wp_posts` 
    WHERE `post_type` = 'nav_menu_item' 
    AND `post_title` LIKE '%\_icl\_%';
);
```

## 15. Check for WPML REST API Endpoints

WPML may have added custom REST API endpoints.

After uninstalling WPML, ensure there are no lingering references in `.htaccess` or `nginx` configuration files, particularly if you set up language redirection rules.

## 16. Remove Custom User Roles or Capabilities

WPML might have created custom user roles or capabilities to manage translation permissions. You can search for these in the `wp_usermeta` table.

### Find WPML-related capabilities:
```sql
SELECT * FROM `wp_usermeta` WHERE `meta_key` LIKE 'wp_capabilities' AND `meta_value` LIKE '%\_icl\_%';;
```

If any WPML-related capabilities exist, remove them manually or use a plugin to manage user roles.

## 17. Clean WPML Language Directories from Cache

If you used a caching plugin like **WP Super Cache**, **W3 Total Cache**, or **WP Rocket**, WPML may have left cached language-related files or rules.

Clear your cache and delete any WPML-related cache directories.

- Check and delete WPML cache files in:
  - `/wp-content/cache/`
  - `/wp-content/uploads/cache/`

## 18. Remove WPML Cron Jobs

WPML may have scheduled cron jobs to handle language synchronization or translations. These jobs can be removed manually from the `wp_options` table.

### Find and delete WPML cron jobs:
```sql
SELECT * FROM `wp_options` WHERE `option_name` LIKE '%cron%';
```

Search for any cron jobs related to "icl" or "wpml" and delete them manually.

---

In addition to the steps already mentioned, there are a few more actions you can take to ensure a **complete cleanup** of WPML-related data and configurations.

These steps help ensure that no lingering traces of WPML remain in your WordPress site.

## 19. **Review `.htaccess` or Nginx Configurations for WPML Rules**

If WPML added language-specific redirection rules to your `.htaccess` file (or **Nginx** configuration), these rules may still exist after uninstallation.

You should manually check these files and remove any WPML-related rules.

### Example of a possible `.htaccess` rule:
```bash
# BEGIN WPML Rules
RewriteRule ^fr/(.*)$ /$1 [R=301,L]
RewriteRule ^de/(.*)$ /$1 [R=301,L]
# END WPML Rules
```

Delete or comment out any similar lines that are no longer needed.

## 20. **Check for WPML Plugin Dependencies**

If you were using other plugins or themes that integrate with WPML (such as **Elementor**, **WooCommerce Multilingual**, etc.), check for settings or configurations that might still reference WPML.

- **Multilingual plugins**: Disable or remove plugins like **WooCommerce Multilingual** that are dependent on WPML.
- **Themes**: Some themes come with WPML compatibility features or language-specific templates. Review your theme settings or custom code for any remaining WPML references.

## 21. **Check for Database Bloat**

Even after manually deleting WPML-related tables and options, it's good practice to optimize your database to clean up any unused space or orphaned data.

You can use a plugin like **WP-Optimize** or run database optimization queries.

### Optimize tables to free up space:
```sql
OPTIMIZE TABLE `wp_options`, `wp_postmeta`, `wp_termmeta`, `wp_posts`, `wp_terms`;
```

## 22. **Verify SEO Settings**

If you were using WPML for multilingual SEO (with plugins like **Yoast SEO** or **Rank Math**), review the multilingual SEO settings.

Ensure there are no broken links or conflicting settings after WPML removal.

- **Yoast SEO**: Re-check sitemap settings for any multilingual entries.
- **Rank Math**: Verify that your **hreflang** tags are correctly updated or removed if you are no longer running a multilingual site.

## 23. **Redirects from Language URLs**

If you were using WPML with separate language URLs (like `/en/`, `/fr/`), ensure that any old language-specific URLs are redirected to the correct pages on your now single-language site.

This prevents 404 errors for users or SEO crawlers.

- Use a redirection plugin (like **Redirection**) to manage 301 redirects from old language-specific URLs to their new equivalents.
- Check your **Google Search Console** for any crawl errors that might have occurred due to language URL changes.

## 24. **Clear CDN Caches (If Applicable)**

If you're using a **Content Delivery Network (CDN)** like Cloudflare or a caching plugin with CDN integration, clear the CDN cache.

This ensures that no WPML-related files or settings are still being served to your visitors.

- Log into your CDN dashboard and perform a **purge** to remove all cached content.
- In your caching plugin, ensure that **cached language files** or resources have been fully deleted.

---

## Final WPML Cleanup Checklist After Uninstallation

Even after removing WPML and its primary data, there may still be some residual settings or configurations affecting your site.

This guide provides a final checklist to ensure a complete and thorough WPML cleanup.

## 25. Review `.htaccess` or Nginx Configurations

Check your `.htaccess` (for Apache) or Nginx configuration for any WPML-related rules, particularly language redirections. Remove or comment out any leftover WPML rules.

```bash
# Example:
# BEGIN WPML Rules
RewriteRule ^fr/(.*)$ /$1 [R=301,L]
RewriteRule ^de/(.*)$ /$1 [R=301,L]
# END WPML Rules
```

## 26. Check for WPML Plugin Dependencies

Review your plugins and themes for any lingering WPML dependencies:

- **Multilingual plugins**: Disable or remove plugins like **WooCommerce Multilingual** that were dependent on WPML.
- **Themes**: Check your theme settings for WPML compatibility features or code.

## 27. Optimize Your Database

After removing WPML-related data, it’s a good idea to optimize your database to free up space and remove orphaned data.

### Run this query to optimize key tables:
```sql
OPTIMIZE TABLE `wp_options`, `wp_postmeta`, `wp_termmeta`, `wp_posts`, `wp_terms`;
```

## 28. Verify SEO Settings

If WPML was managing multilingual SEO for your site, review your SEO plugin settings to ensure no issues remain:

- **Yoast SEO**: Re-check your sitemaps for language-specific entries.
- **Rank Math**: Verify **hreflang** tags are removed or updated.

## 29. Redirect Language URLs

If WPML was using language-specific URLs, set up proper 301 redirects for those URLs to avoid 404 errors:

- Use a plugin like **Redirection** to redirect `/en/` or `/fr/` URLs to the appropriate single-language URLs.

## 30. Clear CDN and Cache

If you use a CDN like Cloudflare or a caching plugin, make sure to clear the cache to remove any WPML-related files or settings still being served.

- Perform a full **purge** of your CDN cache to remove outdated WPML content.

--- 

## Final Cleanup Checklist

At this point, you've covered almost every possible aspect of WPML cleanup. However, here are **a few more advanced checks** you could perform to ensure there are no remaining WPML traces:

## 31. **Check for Multisite Installations (If Applicable)**

If your WordPress installation is part of a **multisite network**, WPML may have stored data for each individual site.

In a multisite network, each site has its own set of tables prefixed with `wp_X_` (where `X` is the site ID).

### Check and remove WPML-related tables for each site:
For multisite installations, repeat the earlier SQL queries for each set of site-specific tables (`wp_X_posts`, `wp_X_options`, `wp_X_postmeta`, etc.).

```sql
SHOW TABLES LIKE 'wp_X_icl%';
```

## 32. **Custom Code in `functions.php` or Child Theme Files**

If you or a developer added any **custom code** to your `functions.php` file or within your theme (or child theme) to integrate with WPML, this code should be removed to avoid unnecessary execution.

- Open your theme's `functions.php` file and search for any **WPML-specific code**.
- Remove any conditional logic, filters, or actions related to WPML (e.g., calls to WPML functions like `icl_get_languages()`, `wpml_object_id()`).

## 33. **Check for Shortcodes in Content**

WPML can sometimes leave shortcodes in your posts, pages, or custom post types.

If these shortcodes are not removed after WPML uninstallation, they may still appear in your content (e.g., `[wpml_language_selector]` or similar).

### Search for WPML-related shortcodes:
You can run the following query to search for posts or pages containing any WPML shortcodes:

```sql
SELECT * FROM `wp_posts` WHERE `post_content` LIKE '%[wpml_%';
```

If you find any, you can either manually edit the posts or use a search-and-replace plugin to remove those shortcodes.

## 34. **Clear Object Caches (e.g., Redis or Memcached)**

If your site uses **object caching** solutions like **Redis** or **Memcached**, some WPML-related data might still be stored in the object cache.

Clearing the object cache ensures that no stale WPML data is served after plugin removal.

- **Redis**: Run `redis-cli FLUSHALL` to clear the Redis cache.
- **Memcached**: Use your caching tool's command or dashboard to clear the cache.

## 35. **Database Trigger and Event Scheduler Checks**

In some rare cases, plugins may create **triggers** or utilize the MySQL **event scheduler** to execute actions periodically.

WPML generally doesn't do this, but you can check for any triggers or events that might have been created by WPML or any integration with it.

### List all triggers in your database:
```sql
SHOW TRIGGERS;
```

### Check for scheduled events:
```sql
SHOW EVENTS;
```

If you find any triggers or events referencing WPML data, you can drop them using appropriate SQL commands.

## 36. **Clean Up `wp_uploads` Folder for Language-Specific Media**

If WPML was used to manage **translated media** (e.g., separate image versions for different languages), some language-specific media files might still be present in the `wp-content/uploads/` folder.

- **Manually review** the uploads folder to see if any language-specific directories or media files (e.g., `/en/`, `/fr/`) are still present.
- Delete these files if they are no longer needed.

## 37. **Review Error Logs**

Check your **PHP error logs** or **server logs** for any warnings or errors related to WPML after uninstallation.

Some residual configuration or orphaned functions may cause errors, which you can catch and resolve by reviewing the logs.

- Look for any calls to WPML functions or database tables that might still be active post-uninstallation.
- Clear those references by either editing files or removing database entries.