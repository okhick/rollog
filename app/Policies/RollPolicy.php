<?php

namespace App\Policies;

use App\Models\Roll;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class RollPolicy
{
    use HandlesAuthorization;

    /**
     * Ensure user owns this roll.
     */
    public function modifyRoll(User $user, Roll $roll)
    {
        return $user->id === $roll->user_id;
    }
}
