---
sidebar_position: 4
---

# Cleaning Yoast SEO Tables in WordPress

Yoast SEO can accumulate redundant data over time, especially when posts or terms are deleted. This can impact the performance of your WordPress database.

Below are SQL queries to clean up unnecessary data in the Yoast SEO tables.

## Clean up Orphaned `post` Entries in `wptm_yoast_indexable`

This query identifies `post` entries in the `wptm_yoast_indexable` table that no longer have corresponding posts in the `wptm_posts` table.

```sql
SELECT i.id, i.object_id, i.object_type, p.ID AS post_id
FROM wptm_yoast_indexable i
LEFT JOIN wptm_posts p ON i.object_id = p.ID
WHERE i.object_type = 'post'
AND p.ID IS NULL;
```

To delete these orphaned entries:

```sql
DELETE FROM wptm_yoast_indexable
WHERE object_type = 'post'
AND object_id NOT IN (SELECT ID FROM wptm_posts);
```

## Clean up Orphaned `term` Entries in `wptm_yoast_indexable`

This query identifies `term` entries in the `wptm_yoast_indexable` table that no longer have corresponding terms in the `wptm_terms` table.

```sql
SELECT i.id, i.object_id, i.object_type, t.term_id
FROM wptm_yoast_indexable i
LEFT JOIN wptm_terms t ON i.object_id = t.term_id
WHERE i.object_type = 'term'
AND t.term_id IS NULL;
```

To delete these orphaned entries:

```sql
DELETE FROM wptm_yoast_indexable
WHERE object_type = 'term'
AND object_id NOT IN (SELECT term_id FROM wptm_terms);
```

## Clean up Invalid Internal Links

Yoast SEO keeps track of internal links between posts and terms. Sometimes, these links can point to content that no longer exists.

The following query identifies invalid links pointing to deleted or missing entries in the `wptm_yoast_indexable` table.

### Identify Invalid Links

```sql
SELECT l.id, l.url, l.target_indexable_id, i.id AS indexable_id
FROM wptm_yoast_seo_links l
LEFT JOIN wptm_yoast_indexable i ON l.target_indexable_id = i.id
WHERE i.id IS NULL;
```

### Delete Invalid Links

```sql
DELETE l
FROM wptm_yoast_seo_links l
LEFT JOIN wptm_yoast_indexable i ON l.target_indexable_id = i.id
WHERE i.id IS NULL;
```

## Important Notes

- **Backup your database**: Before running any SQL queries directly on your WordPress database, make sure to back up your database to avoid accidental data loss.
- **Test in a staging environment**: Always test these queries in a staging environment before applying them to a production site.

These queries should help in optimizing your WordPress database by cleaning up unnecessary data in Yoast SEO tables.