<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function() {
    return redirect('/web/services.html');
});

// Route::get('/', function() {
//     $routes = collect(Route::getRoutes())
//     ->filter(fn($route) => str_starts_with($route->uri(), 'api/'))
//     ->map(function ($route) {
//         return [
//             'method' => implode('|', $route->methods()),
//             'uri' => $route->uri(),
//             'name' => $route->getName(),
//             'action' => $route->getActionName(),
//             'middleware' => $route->gatherMiddleware(),
//         ];
//     });

//     return response()->json($routes);
// });