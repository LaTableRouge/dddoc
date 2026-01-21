# Modèle robots.txt

```text
# We block some types of content
User-agent: *
Disallow: /wp-login.php
Disallow: */trackback
Disallow: /*/feed
Disallow: /*/comments
Disallow: /cgi-bin
Disallow: /*.php$
Disallow: /*.inc$
Disallow: /*.gz
Disallow: /*.cgi
# We let Google Images
User-agent: Googlebot-Image
Disallow:
# We let the Google advertising network do its job
User-agent:
```
