<?php

namespace App\Models;

use Dyrynda\Database\Support\CascadeSoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Roll extends Model
{
    use HasFactory;
    use SoftDeletes;
    use CascadeSoftDeletes;

    protected $casts = [
        'completed' => 'boolean'
    ];

    protected $fillable = [
        'film_stock', 'film_iso', 'pushpull', 'completed', 'notes'
    ];

    protected $cascadeDeletes = ['shots'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function camera()
    {
        return $this->belongsTo(Camera::class);
    }

    public function shots()
    {
        return $this->hasMany(Shot::class)
            ->with('lens')
            ->latest();
    }
}
