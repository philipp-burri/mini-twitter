<?php

use Illuminate\Support\Facades\Route;

Route::get('/{any}', function () {
    return view('app'); // Change this to the view that includes your Vue app
})->where('any', '^(?!api).*$');