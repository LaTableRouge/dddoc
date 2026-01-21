# Modèle .htaccess

:::tip
**Security Best Practices:** For a comprehensive WordPress security checklist covering file protection, HTTPS enforcement, and security headers, see: [WordPress security checklist](https://holdmywp.com/en/wordpress-security-checklist/)
:::

```apache
# Protect .htaccess file
<files .htaccess>
order allow,deny
deny from all
</files>

# Directories read protection
Options -Indexes

# Protect wp-config.php file
<files wp-config.php>
order allow,deny
deny from all
</files>

# Block Readme file(s) access
<IfModule mod_rewrite.c>
RewriteEngine On
RewriteBase /
RewriteRule (/|^)(readme|changelog)\.(txt|html|md)$ - [R=404,L,NC]
</IfModule>

# Hide WordPress version in HTTP head
<IfModule mod_headers.c>
Header unset X-Powered-By
</IfModule>
```

```apache
# Redirect HTTP to HTTPS
<IfModule mod_rewrite.c>
RewriteEngine On
RewriteCond %{HTTPS} !=on
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301,NE]
</IfModule>
```

```apache
# Redirect www to non-www
<IfModule mod_rewrite.c>
RewriteEngine on
RewriteCond %{HTTP_HOST} ^www\.name\.domain [NC]
RewriteRule ^(.*)$ https://name.domain/$1 [L,R=301]
</IfModule>

# Redirect non-www to www
<IfModule mod_rewrite.c>
RewriteEngine On
RewriteCond %{HTTP_HOST} ^name.domain
RewriteRule (.*) https://www.name.domain/$1 [L,R=301]
</IfModule>
```

```apache
# Force trailing slashes
<IfModule mod_rewrite.c>
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_METHOD} GET
RewriteCond %{REQUEST_URI} !(.*)/$
RewriteRule ^(.*)$ https://%{HTTP_HOST}/$1/ [L,R=301]
</IfModule>
```
