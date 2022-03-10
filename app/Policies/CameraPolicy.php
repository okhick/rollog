<?php

namespace App\Policies;

use App\Models\Camera;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class CameraPolicy
{
    use HandlesAuthorization;

    public function useCamera(User $user, Camera $camera)
    {
        return $user->id === $camera->user_id;
    }
}
