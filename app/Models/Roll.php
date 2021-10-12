<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Roll extends Model
{
    use HasFactory;

    public function photographer()
    {
        return $this->hasOne(User::class);
    }

    public function camera()
    {
        return $this->hasOne(Camera::class);
    }

    public function shots()
    {
        return $this->hasMany(Shot::class);
    }
}
