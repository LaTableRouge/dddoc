# Emailings / Newsletter

## Limitations techniques

- ```font-style: italic;```  pour l'**Arabe** → ne s'affiche pas sur Outlook

- ```dir="rtl"``` & ```direction: rtl;``` → ne fonctionne pas sur Outlook **pour le texte**

- Animations → ne fonctionnent pas sur la plupart des logiciels de messageries, privilégier les gifs

## Tips

- Config VSCode pour une édition toute en souplesse & de l'indentation claire

  - ```json
    "[html]": {
        "editor.defaultFormatter": "vscode.html-language-features",
        "editor.formatOnSave": true
        },
    "html.format.endWithNewline": true,
    "html.format.indentHandlebars": true,
    "html.format.templating": false,
    "html.format.wrapAttributes": "force-expand-multiline",
    "html.format.wrapLineLength": 0,
    ```

- liste numérotée

  - ```html
    <ol style="margin: 0; margin-left: 25px; padding: 0;" align="left" type="1">
    	<li style="list-style-position: inside;"></li>
    </ol>
    ```

- Bouton arrondis (sauf pour Outlook... mais ça rend bien quand même)

  - ```html
    <a
        style="line-height: normal; letter-spacing: normal; text-align: center;"
        title="{YOUR_TITLE}"
        href="{YOUR_LINK}"
        target="_blank"
    >
        <table
            align="center"
            style="text-align:center"
            border="0"
            cellspacing="0"
            cellpadding="0"
        >
    		<tr>
                <td
                    bgcolor="#e30613"
                    style="padding: 12px 18px 12px 18px;
                        border-radius:20px;"
                    align="center"
                >
                    <a
                        href="{YOUR_LINK}"
                        title="{YOUR_TITLE}"
                        target="_blank"
                        style="line-height: 0.8; font-size:20px; font-weight: bold;background-color:#e30613;color: #ffffff; text-transform:uppercase; text-decoration: none; display: inline-block;"
                    >
                        {YOUR_BUTTON_TEXT}
                    </a>
    			</td>
    		</tr>
    	</table>
    </a>
    ```

- Séparateur (alternative aux < br>)

  - ```html
    <table
        cellpadding="0"
        cellspacing="0"
        border="0"
        width="{SEPARATOR_WIDTH}"
        align="center"
        style="border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; margin: auto; clear: both; width: {SEPARATOR_WIDTH}px;"
        role="presentation"
    >
    	<tr>
            <td
                height="{SEPARATOR_HEIGHT}"
                style="border-collapse: collapse; mso-line-height-rule: exactly; height: {SEPARATOR_HEIGHT}px; font-size: {SEPARATOR_HEIGHT}px; line-height: {SEPARATOR_HEIGHT}px;"
            >
            	&nbsp;
    		</td>
    	</tr>
    </table>
    ```

- Image

  - ```html
    <a
    	style="text-decoration: none; mso-line-height-rule: exactly; color: #000000; outline: none; border: none;"
        title="{YOUR_PICTURE_TITLE}"
    >
        <img
            src="https://via.placeholder.com/200x200"
            alt="{YOUR_PICTURE_ALT}"
            width="300"
            style="outline: none; text-decoration: none; -ms-interpolation-mode: bicubic;
                font-family: Arial, Helvetica, sans-serif; font-size: 13px; line-height: 13px;
                display: block; border: none; width: 300px;"
        >
    </a>
    ```

    