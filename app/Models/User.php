<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var string[]
     */
    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    /**
     * The attributes that should be included.
     *
     * @var array
     */
    protected $with = ['cameras', 'lenses'];

    public function rolls()
    {
        return $this->hasMany(Roll::class);
    }

    public function cameras()
    {
        return $this->hasMany(Camera::class);
    }

    public function lenses()
    {
        return $this->hasMany(Lens::class);
    }

    public static function get(int $userId)
    {
        return self::where('id', $userId)
            ->firstOrFail();
    }

    /**
     * Get a list of all the filmstocks that user has entered.
     */
    public function scopeFilmStocks()
    {
        $stocks = Roll::select('film_stock')
            ->where('user_id', $this->id)
            ->orderBy('film_stock')
            ->distinct()
            ->get();

        return $stocks->pluck('film_stock');
    }
}
