<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProyectoUsuario extends Model
{
    use HasFactory;
    protected $table = 'proyecto_usuario';
    protected $fillable = [
        'usuario_id',
        'proyecto_id',
    ];
}
