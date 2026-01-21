---
sidebar_position: 4
---

# Caching with W3cache

## Redis

:::warning Remove transients
When you enable Redis caching, it is important to delete the entries with 'transients' from the wp_options database as this can prevent Redis from functioning correctly.
```sql
DELETE FROM `wp_options` WHERE `option_name` LIKE '_transient%';
```
:::

