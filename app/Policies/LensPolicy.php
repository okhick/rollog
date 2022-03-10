<?php

namespace App\Policies;

use App\Models\Lens;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class LensPolicy
{
    use HandlesAuthorization;

    public function useLens(User $user, Lens $lens)
    {
        return $user->id === $lens->user_id;
    }
}
