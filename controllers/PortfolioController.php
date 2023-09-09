<?php

namespace Controllers;

use MVC\Router;

class PortfolioController {
  
  public static function index(Router $router) {
    $router->render('portfolio/index');
  }
}
