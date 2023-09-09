<?php

define('TEMPLATES_PATH', __DIR__.'/templates');
define('FUNCTIONS_PATH', __DIR__.'functions.php');
define('PATH', __DIR__);

function includeTemplates(string $template) {
  include TEMPLATES_PATH . "/$template.php";
}
