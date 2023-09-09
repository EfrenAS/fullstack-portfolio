<?php

require_once  __DIR__ . '/../includes/app.php';

use MVC\Router;
use Controllers\PortfolioController;

$router = new Router();

// Implements all routes here
$router->get('/', [PortfolioController::class, 'index']);

$router->checkRoutes();
