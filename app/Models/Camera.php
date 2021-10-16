<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Camera extends Model
{
    use HasFactory;

    public function photographer()
    {
        return $this->hasOne(User::class);
    }

    public function rolls()
    {
        return $this->hasMany(Roll::class);
    }
}
