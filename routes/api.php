<?php

use App\Http\Controllers\CameraController;
use App\Http\Controllers\LensController;
use App\Http\Controllers\RollController;
use App\Http\Controllers\ShotController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Tightenco\Ziggy\Ziggy;

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

Route::get('/ziggy', fn () => response()->json(new Ziggy));

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    Route::get('film-stocks', [UserController::class, 'getFilmStocks'])
        ->name('film-stocks');

    Route::resource('roll', RollController::class);
    Route::resource('roll.shot', ShotController::class);
});

Route::resource('/cameras', CameraController::class);
Route::resource('/lenses', LensController::class);

Route::get('/health', function () {
    return true;
});
