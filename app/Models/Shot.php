<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Shot extends Model
{
    use HasFactory;

    protected $hidden = ['lens_id'];

    public function roll()
    {
        return $this->belongsTo(Roll::class);
    }

    public function lens()
    {
        return $this->belongsTo(Lens::class);
    }
}
