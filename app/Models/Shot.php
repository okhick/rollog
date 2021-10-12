<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Shot extends Model
{
    use HasFactory;

    public function roll()
    {
        return $this->hasOne(Roll::class);
    }
}
