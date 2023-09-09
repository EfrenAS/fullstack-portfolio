<?php

namespace MVC;

class Router {

  public $requestGET = [];

  public function get($url, $fn): void {
    $this->requestGET[$url] = $fn;
  }

  public function checkRoutes(): void {

    $url = $_SERVER['REQUEST_URI'] === '' ? '/' : $_SERVER['REQUEST_URI'];
    $fn = $this->requestGET[$url] ?? null;

    if ($fn) {
      call_user_func($fn, $this);
    } else {
      echo 'pagina no encontrada';
    }
  }

  public function render(string $view, $data = []): void {
    foreach ($data as $key => $value) {
      $key = $value;
    }

    ob_start();
    include_once __DIR__ . "/views/$view.php";
    $content = ob_get_clean();
    include_once __DIR__ . "/views/layout.php";
  }
}
