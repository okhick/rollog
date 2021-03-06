<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Camera extends Model
{
    use HasFactory;
    use SoftDeletes;

    public function photographer()
    {
        return $this->hasOne(User::class);
    }

    public function rolls()
    {
        return $this->hasMany(Roll::class);
    }

    /**
     * Get a camera. Enforce that it belongs to a user.
     */
    public static function get(int $cameraId, int $userId)
    {
        return self::where('id', $cameraId)
            ->where('user_id', $userId)
            ->firstOrFail();
    }
}
