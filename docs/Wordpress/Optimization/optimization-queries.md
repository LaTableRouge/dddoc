---
sidebar_position: 5
---

# Optimization Queries

When managing a WordPress site, you might encounter metadata values that are empty or NULL. To clean up these values from your database, you can use the following SQL queries.

## Cleaning Metadata Values

To identify metadata entries with empty or NULL values, use the following SELECT query:

```sql
SELECT * FROM wptm_postmeta
WHERE meta_value = '' OR meta_value IS NULL;
```

This query will retrieve all records in the `wptm_postmeta` table where the `meta_value` is either empty or NULL.

To remove these unwanted entries, execute the following DELETE query:

```sql
DELETE FROM wptm_postmeta
WHERE meta_value = '' OR meta_value IS NULL;
```

This will delete all records with empty or NULL `meta_value` from the `wptm_postmeta` table.

By running these queries, you can help maintain the cleanliness and efficiency of your WordPress database.

---

Feel free to add any other optimization tips or queries relevant to your setup!