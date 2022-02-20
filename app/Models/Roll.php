<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Roll extends Model
{
    use HasFactory;

    protected $casts = [
        'completed' => 'boolean'
    ];

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

    /**
     * Get a roll. Enforce that it belongs to a user.
     */
    public static function getRoll(int $rollId, int $userId)
    {
        return self::where('id', $rollId)->where('user_id', $userId)->firstOrFail();
    }
}
