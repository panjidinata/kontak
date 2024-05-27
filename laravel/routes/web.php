<?php

use App\Http\Controllers\ContactController;
use Illuminate\Support\Facades\Route;

Route::get("/", [ContactController::class, "index"])->name("index");
Route::resource("contacts", ContactController::class);
