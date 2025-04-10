<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\AuthController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Rotas da API da aplicação, utilizando JWT para autenticação.
|
*/

// Rotas públicas
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// Rotas protegidas com JWT
Route::middleware('auth:api')->group(function () {
    // Perfil do usuário autenticado
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    // Gerenciamento de usuários
    Route::get('/users', [UserController::class, 'index']);       // Listar usuários
    Route::get('/users/{id}', [UserController::class, 'show']);   // Ver detalhes do usuário
    Route::post('/users', [UserController::class, 'store']);      // Criar usuário
    Route::put('/users/{id}', [UserController::class, 'update']); // Atualizar usuário
    Route::delete('/users/{id}', [UserController::class, 'destroy']); // Deletar usuário

    // Autenticação adicional
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::post('/refresh', [AuthController::class, 'refresh']);
    Route::get('/me', [AuthController::class, 'me']);
});
