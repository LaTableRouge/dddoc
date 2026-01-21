# IDE - Snippet scss

## VSCode
```json
{
    "Media query up": {
		"prefix": "@up",
		"body": [
			"@include media-breakpoint-up($1) {",
			"$2",
			"}",
		],
		"description": "Media query up"
	},
	"Media query down": {
		"prefix": "@down",
		"body": [
			"@include media-breakpoint-down($1) {",
			"$2",
			"}",
		],
		"description": "Media query down"
	},
	"Media query only": {
		"prefix": "@only",
		"body": [
			"@include media-breakpoint-only($1) {",
			"$2",
			"}",
		],
		"description": "Media query only"
	},
    "Container query up": {
		"prefix": "@contup",
		"body": [
			"@include container-breakpoint-up($1) {",
			"$2",
			"}",
		],
		"description": "Container query up"
	},
	"Container query down": {
		"prefix": "@contdown",
		"body": [
			"@include container-breakpoint-down($1) {",
			"$2",
			"}",
		],
		"description": "Container query down"
	},
	"Container query only": {
		"prefix": "@contonly",
		"body": [
			"@include container-breakpoint-only($1) {",
			"$2",
			"}",
		],
		"description": "Container query only"
	},
	"For loop": {
		"prefix": "@for",
		"body": [
			"@for $i from $1 through $2 {",
			"$3",
			"}",
		],
		"description": "For loop"
	}
}
```

## PHPStorm
