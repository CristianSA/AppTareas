<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Hash;
use Auth;
class UserController extends Controller
{
    public function __construct()
    {
        $this->middleware('guest')->except('logout');
    }
    public function validarLogin(Request $request){
        if(auth()->guard('web')->attempt(['email' => $request->email, 'password' => $request->password])){
            $user = Auth::user();
            return response()->json([
                'status' => true,
                'class' => 'success',
                'text' => 'You have successfully logged in',
                'usuario_data' => $user
            ]);
        }else{
            return response()->json([
                'status' => false,
                'class' => 'danger',
                'text' => 'Unregistered user'
            ]);
        }
    }
    public function validarRegistro(Request $request){
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password)
        ]);
        return response()->json($user, 201);
    }
    public function logout(Request $request){
        Auth::logout();
        return response()->json(201);
    }
    public function usuarioData(){
        $user = Auth::user();
        return $user;
    }
}
