<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Shot extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $casts = [
        'flash' => 'boolean'
    ];

    protected $hidden = ['lens_id', 'roll_id'];

    protected $with = ['lens', 'roll'];

    protected $fillable = ['aperture', 'exposure', 'flash', 'pushpull', 'title', 'notes'];

    /**
     * Relations.
     */
    public function lens()
    {
        return $this->belongsTo(Lens::class);
    }

    public function roll()
    {
        return $this->belongsTo(Roll::class);
    }

    /**
     * Get a shot. Enforce that it belongs to a roll.
     */
    public static function get(int $rollId, int $shotId)
    {
        return self::where('id', $shotId)
            ->where('roll_id', $rollId)
            ->firstOrFail();
    }
}
