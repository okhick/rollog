<?php

use App\Http\Controllers\CameraController;
use App\Http\Controllers\LensController;
use App\Http\Controllers\RollController;
use App\Http\Controllers\ShotController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::resource('/cameras', CameraController::class);
Route::resource('/lenses', LensController::class);
Route::resource('/rolls', RollController::class);
Route::resource('/shots', ShotController::class);

Route::get('/health', function () {
    return true;
});
