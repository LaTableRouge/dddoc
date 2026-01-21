# Export all databases (dans un dossier 'dbdump')


```bash
#!/bin/bash

databases=`mysql -u root --password= -e "SHOW DATABASES;" | grep -Ev "(Database|information_schema|performance_schema)"`

for db in $databases; do
    mysqldump -u root --password= $db > "./dbdump/$db.sql"
done
```

