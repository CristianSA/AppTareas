<?php

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

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
Route::group(['middleware' => ['web']], function(){
    Route::post('login', 'App\Http\Controllers\UserController@validarLogin');
    Route::post('registro', 'App\Http\Controllers\UserController@validarRegistro');
    Route::post('logout','App\Http\Controllers\UserController@logout');
    Route::get('usuario', 'App\Http\Controllers\UserController@usuarioData');
    Route::get('proyectos/{usuario_id}', 'App\Http\Controllers\ProyectoController@proyectos');
    Route::post('proyecto/nuevo/{usuario_id}', 'App\Http\Controllers\ProyectoController@guardarProyecto');
});