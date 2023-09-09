<?php

//Only en dev version for production delete this line

ini_set('display_errors', 1);

require __DIR__ . '/../vendor/autoload.php';

// Load config for database from file .env
$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->safeload();

require 'functions.php';
