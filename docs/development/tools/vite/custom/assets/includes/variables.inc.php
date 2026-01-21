<?php

define('IS_VITE_DEVELOPMENT', false);
define('VITE_SERVER', 'http://localhost:5173');

define('DIST_FOLDER', 'build');
define('DIST_PATH', DIST_FOLDER);

define('LANG', isset($_GET['lang']) ? $_GET['lang'] : 'fr');

/*
 * ================================
 *  Get le fichier de traduction
 */
$translationFilePath = realpath(__DIR__) . '/../../assets/lang/' . LANG . '.json';
$translationsObject = [];
if (file_exists($translationFilePath)) {
    $translationsObject = file_get_contents($translationFilePath);
    $translationsObject = json_decode($translationsObject, true);
}

define('TRANSLATIONS', serialize($translationsObject));
