# IDE - Snippet javascript

## VSCode
```json
{
    "Print to console": {
        "prefix": "log",
        "body": [
            "console.log('$1');",
            "$2"
        ],
        "description": "Log output to console"
	},
    "console - f01": {
        "prefix": "ec0",
        "body": [
            "console.log('%c' + $0, 'color: #0bf; font-size: 1rem; background-color:#fff');"
        ],
        "description": "Log output to console"
    },
    "console - f02": {
        "prefix": "ec1",
        "body": [
            "console.log('%c' + $0, 'color: #baf; font-size: 1rem; background-color:#fff');"
        ],
        "description": "Log output to console"
    },
	"addEventListener arrow function": {
		"prefix": "aela",
		"body": [
			"${1:document}.addEventListener('${2:type}', (${3:event}) => {",
			"$4",
			"})",
			"$5"
		],
		"description": "addEventListener arrow function"
	},
	"For-Each loop": {
		"prefix": "foreach",
		"body": [
			"if (${1:array}.length) {",
			"  ${2:array}.forEach(${3:element} => {",
			"$4",
			"  })",
			"}",
			"$5"
		],
		"description": "For-Each loop"
	},
	"Window resize": {
		"prefix": "resize",
		"body": [
			"let timeout = false",
			"const delay = ${1:250}",
			"window.addEventListener('resize', () => {",
			"  clearTimeout(timeout)",
			"  timeout = setTimeout(() => {",
			"$2",
			"  }, delay)",
			"})",
			"$3"
		],
		"description": "Window resize"
	},
	"Document ready": {
		"prefix": "ready",
		"body": [
			"window.addEventListener('DOMContentLoaded', event => {",
			"$1",
			"})",
            "$2"
		],
		"description": "Document ready"
	}
}
```

## PHPStorm
