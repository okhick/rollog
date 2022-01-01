<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Shot extends Model
{
    use HasFactory;

    protected $hidden = ['lens_id', 'roll_id'];

    protected $with = ['lens', 'roll'];

    public function lens()
    {
        return $this->belongsTo(Lens::class);
    }

    public function roll()
    {
        return $this->belongsTo(Roll::class);
    }
}
