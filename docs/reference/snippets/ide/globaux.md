# IDE - Snippet globaux

## VSCode
```json
{
        "php opening & closing": {
            "prefix": "ppk",
            "body": [
                "<?php $1 ?> ",
            ],
            "description": "ouverture fermeture php"
        },
        "php opening & closing with space": {
            "prefix": "ppp",
            "body": [
                "<?php",
                "$1",
                "?>",
            ],
            "description": "ouverture fermeture php à la ligne"
        },

        "php open and closing + if": {
            "prefix": "fii",
            "body": [
                "<?php if( $1 ){ ?>",
                "$2",
                "<?php }; ?>"
            ],
            "description": "if(!function_exists+hook"
        },
}
```

## PHPStorm
