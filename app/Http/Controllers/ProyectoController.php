<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Proyecto;
use App\Models\ProyectoUsuario;
use DB;

class ProyectoController extends Controller
{
    public function proyectos(Request $request, $usuario_id){
        $proyectos = DB::table('proyecto')
        ->join('proyecto_usuario', 'proyecto_usuario.proyecto_id', '=', 'proyecto.id')
        ->where('proyecto_usuario.usuario_id', '=', $usuario_id)
        ->orderBy('proyecto.created_at', 'desc')
        ->get();
        return response()->json($proyectos, 200);
    }
    public function guardarProyecto(Request $request, $usuario_id){
        $proyecto = Proyecto::create([
            'titulo' => $request->titulo,
            'descripcion' => $request->descripcion,
            'sprints' => $request->sprints,
            'estado' => $request->estado,
            'fecha_inicio' => $request->fecha_inicio,
            'fecha_fin' => $request->fecha_fin
        ]);
        $proyecto_usuario = ProyectoUsuario::create([
            'usuario_id' => $usuario_id,
            'proyecto_id' => $proyecto->id
        ]);
        return response()->json($proyecto, 201);
    }
}
