# Afficher différent guillemets en fonctions des langues

```scss
q {
  &::before {
    content: open-quote;
  }

  &::after {
    content: close-quote;
  }
}

:lang(en) q {
  quotes: '“' '”';
}

:lang(fr) q {
  quotes: '«' '»';
}

:lang(de) q {
  quotes: '»' '«';
}

```
