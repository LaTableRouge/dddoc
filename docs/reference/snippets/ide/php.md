# IDE - Snippet php

## VSCode
```json
{
    "Var_Dump": {
		"prefix": "vd",
		"body": [
			"var_dump($1);",
			"$2"
		],
		"description": "var_dump"
	},
	"Var_Dump & Die": {
		"prefix": "vdd",
		"body": [
			"echo '<pre>';",
			"var_dump($1);",
			"echo '</pre>';",
			"die();",
			"$2"
		],
		"description": "var_dump & die"
	},

	"exit": {
        "prefix": "ddd",
        "body": [
            "echo __FILE__.':'.__LINE__; exit();"
        ],
        "description": "$post"
    },
	
    "filter-input-post": {
        "prefix": "ffp",
        "body": [
            "filter_input(INPUT_POST, '$0');"
        ],
        "description": "filter-input-post"
    },
    "filter-input-get": {
        "prefix": "ffg",
        "body": [
            "filter_input(INPUT_GET, '$0');"
        ],
        "description": "filter-input-get"
    },

    "lorem": {
        "prefix": "lo",
        "body": [
            "echo 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vitae turpis ac urna condimentum sagittis. '",
            ". 'Morbi egestas rhoncus lectus, vel semper sem dignissim nec. Phasellus mollis augue ac vulputate congue. '",
            ". 'Integer at elit imperdiet, egestas magna sit amet, gravida lacus. Ut volutpat sem lectus, at cursus arcu sagittis ac. '",
            ". 'Donec vehicula felis vitae ipsum fermentum, sed tempus neque varius. Interdum et malesuada fames ac ante ipsum primis in faucibus. '",
            ". 'Aenean turpis nisl, interdum sit amet sagittis quis, semper ut est. Duis sagittis sagittis urna ut maximus. '",
            ". 'Interdum et malesuada fames ac ante ipsum primis in faucibus. Duis volutpat ornare condimentum.';",
            "\n",
            "echo 'Pellentesque risus urna, vulputate sit amet maximus id, viverra at ligula. '",
            ". 'Nam auctor suscipit congue. Nam convallis hendrerit lacus non ullamcorper. '",
            ". 'Nulla vitae risus vitae ligula dictum tempor cursus ut tortor. '",
            ". 'Nulla facilisi. Morbi condimentum massa eu fringilla sagittis. Praesent commodo dictum risus vel consequat. '",
            ". 'Vivamus sit amet commodo metus, a tempus sapien. Morbi eu egestas augue. Nullam arcu magna, bibendum ac gravida sit amet, '",
            ". 'dignissim in turpis. Suspendisse vel dolor eget orci dictum maximus.';",
            "\n",
            "echo 'Nunc aliquam sapien a finibus gravida. Interdum et malesuada fames ac ante ipsum primis in faucibus. '",
            ". 'Ut sit amet cursus nunc, quis eleifend nibh. Cras vel erat suscipit, tincidunt felis nec, gravida lacus. '",
            ". 'Integer id venenatis sapien, eget condimentum elit. Donec vehicula nibh quis pulvinar mollis. Donec a cursus purus. '",
            ". 'Duis congue nunc tortor, vitae maximus leo ultrices vel. Sed at ante rhoncus, ultricies nisi id, viverra nunc. '",
            ". 'Cras sit amet ultricies ex. Suspendisse tempor tempor metus. Duis eu malesuada mi. Nulla nibh risus, consequat ut velit ut, '",
            ". 'sollicitudin tempus orci. Mauris hendrerit dignissim leo ac tempor. Sed nibh lectus, rutrum vitae nibh in, '",
            ". 'sollicitudin scelerisque libero. Integer at purus sollicitudin, blandit mauris sit amet, imperdiet est.';",
        ]
    },


    "$this->": {
        "prefix": "tt",
        "body": [
            "\\$this->$0"
        ],
        "description": "$this->"
    },


    "->": {
        "prefix": "!!",
        "body": [
            "->$0"
        ],
        "description": "->"
    },

    "phr": {
        "prefix": "phr",
        "body": [
            "echo '<hr />';"
        ],
        "description": "<hr />"
    },

    "Debug": {
        "prefix": "ecv",
        "body": [
           "echo '<div style=\"border: solid 2px #F00\">';",
               "    echo '<div style=\"; background-color:#CCC\">@'.__FILE__.' : '.__LINE__.'</div>';",
                "    echo '<pre style=\"background-color: rgba(255,255,255, 0.8);\">';",
                   "    print_r($0);",
                "    echo '</pre>';",
           "echo '</div>';",
        ],
        "description": "Log output to console"
    },

    "foreachComplete": {
        "prefix": "fff",
        "body": [
            "foreach(\\$$1 as \\$${2:index} => \\$${3:value}) {",
            "    $0",
            "}"
        ],
        "description": "foreachComplete"
    },

    "foreach": {
        "prefix": "ff",
        "body": [
            "foreach(\\$$1 as \\$${2:index}) {",
            "    $0",
            "}"
        ],
        "description": "foreach"
    },

    "aaa": {
        "prefix": "aaa",
        "body": [
            "//===========================================================",
            "//$1",
            "//===========================================================",
            "//$2",

        ],
        "description": "separator"
    },

    "pbr": {
        "prefix": "pbr",
        "body": [
            "echo '<br/>';",
            "$0"
        ],
        "description": "br"
    },

    "da": {
        "prefix": "da",
        "body": [
            "//$CURRENT_YEAR-$CURRENT_MONTH-$CURRENT_DATE-$CURRENT_HOUR-$CURRENT_MINUTE-$CURRENT_SECOND==============",
            "//$0",
            "//=================================="

        ],
        "description": "date comment"
    },

    "post": {
        "prefix": "po",
        "body": [
            "\\$_POST['$0']"
        ],
        "description": "$post"
    },
    "get": {
        "prefix": "ge",
        "body": [
            "\\$_GET['$0']"
        ],
        "description": "$get"
    },

    "while": {
        "prefix": "ww",
        "body": [
            "while($1) {",
            "    $0",
            "}"
        ],
        "description": "$while"
    },

    "array": {
        "prefix": "ttt",
        "body": [
            "\\$$0[]",
        ],
        "description": "array"
    },

    "eol": {
        "prefix": "eee",
        "body": [
            "PHP_EOL",
        ],
        "description": "eol"
    },



    "if": {
        "prefix": "fi",
        "body": [
            "if(\\$$1 ${2:===} $3) {",
            "    $0",
            "}"
        ],
        "description": "if"
    },

    "ifelse": {
        "prefix": "fie",
        "body": [
            "if(\\$$1 ${2:===} $3) {",
            "    $0",
            "} else {",
            "    ",
            "}"
        ],
        "description": "if + else"
    },

    "!if": {
        "prefix": "fii",
        "body": [
            "if(\\$$1 !== $2) {",
            "    $0",
            "}"
        ],
        "description": "!if"
    },

    "if!f": {
        "prefix": "fif",
        "body": [
            "if(!isset(${PREFIX_CHILD . '_$1'})) {",
            "     ${PREFIX_CHILD . '_$1'} = function ()",
            "{",
            "$0",
            "}",
            "}"
        ],
        "description": "if(!isset"
    },

    "if!fh": {
        "prefix": "fifh",
        "body": [
            "if(!isset(${PREFIX_CHILD . '_$1'})) {",
            "     ${PREFIX_CHILD . '_$1'} = function ()",
            "{",
            "$0",
            "};",
            "add_action('$2', ${PREFIX_CHILD . '_$1'});",
            "};"
        ],
        "description": "if(!isset+hook"
    },
}
```

## PHPStorm
