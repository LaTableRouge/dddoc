# Les Signatures Emails

## Les fonts

Vous devez utiliser les fonts systèmes :

- **Arial**
- **Verdana**
- **Helvetica**
- **Georgia**
- **Tahoma**
- **Lucida**
- **Trebuchet**
- **Times**

Le pôle Créa est au courant. (vérifier quand même les fonts utilisées dans la maquette).

## Le problème d’espacement entre les éléments

Il arrive que des espacements importants s’affichent entre les paragraphes `<p>` quand la signature s’affiche dans un client mail (Exemple : Gmail mobile).

Pour empêcher cela, Il faut entourer chaque texte présent dans vos balises `<td></td>` avec ceci :

```html
<p style="margin:0.1pt;"></p>
```

## Créer une colonne vide

```html
<td style="border-collapse: collapse; mso-line-height-rule: exactly;">
    <table
        border="0"
        cellpadding="0"
        cellspacing="0"
        width="35"
        style="background-color: #fff; width: 35px; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt;clear: both;"
    >
        <tr>
            <td
                width="8"
                style="width: 8px;"
            >
                &nbsp;
            </td>
        </tr>
    </table>
</td>
```

## Créer un saut de ligne

A mettre dans votre `<td></td>`.

```html
<table
    cellpadding="0"
    cellspacing="0"
    border="0"
    width="292"
    align="center"
    style="border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; margin: auto; clear: both; width: 292px;"
    role="presentation"
>
    <tr>
        <td
            height="6"
            style="border-collapse: collapse; mso-line-height-rule: exactly; height: 6px; font-size: 6px; line-height: 6px;"
        >
            <p style="margin:0.1pt; line-height:8pt">&nbsp;</p>
        </td>
    </tr>
</table>
```

---
