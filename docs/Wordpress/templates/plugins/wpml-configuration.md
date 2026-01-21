# Cheatsheet: Configuration du plugin WPML avec ACF

1. ➡️ **Installer le module Advanced Custom Fields Multilingual et l'activer**
2. ➡️ **Réglages généraux WPML**

   1. Allez dans "WPML > Paramètres > Traduction des types de publication"
   La préférence de "Groupes de champs (acf-field-group)" devrait être "Non traduisible". Enregistrer ce parametre.

3. ➡️ **Réglages des champs acf**

Selon le type de champ, le réglage sera différent.

1. Si vous ne souhaitez pas traduire le champ mais garder la même valeur, par exemple pour les couleurs, les vrai/faux, images etc... Utiliser `Copy`.
2. Pour les champs spéciaux "Repeater" et "Flexible" utiliser `Copy once`.
3. Pour tous les champs que vous souhaitez traduire tels que les textes, les WYSIWYG etc... Utiliser `Translate`
4. Pour les champs ne necessitant pas de traduction, utiliser `Copy` et non `Don't translate`.

***Extrait de la doc :*** 

- Translate – This option makes your custom field values available for translation.

It is recommended for text fields (e.g. Text, Text Area, WYSIWYG, Message).

- Copy – This option copies the field value from the default language into the secondary language(s), which keeps your custom field value in sync across all languages.

It is recommended for fields like Number, Range, True/False, and similar. Please note that with this option, the value of the field will not be available in WPML's Advanced Translation Editor.

- Copy Once – This option copies the value of the field from the default language, but the value of the field can be changed later in the WordPress native editor.

After the first copy, it will not be kept in synchronization with the default language.

Please note that when you use this option, the value of the field will not be available in WPML's Advanced Translation Editor. You need to translate your content manually.

- Don't translate – The field is not available for translation.

This is the default setting for fields which you have not yet set a translation preference for.

However, if you have any custom fields you don't want to translate, you should change them to use the Copy option.

Ici un tableau regroupant les differents champs et réglages :

https://wpml.org/documentation/related-projects/translate-sites-built-with-acf/recommended-custom-fields-translation-preferences-for-acf-and-wpml/



