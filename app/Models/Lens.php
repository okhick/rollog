<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Lens extends Model
{
    use HasFactory;

    /**
     * List of possible apertures.
     */
    public const APERTURES = [1, 2, 2.8, 4, 5.6, 8, 11, 16, 22, 32];

    public function shots()
    {
        return $this->hasMany(Shot::class);
    }
}
