<?php

namespace App\Policies;

use App\Models\User;
use Illuminate\Auth\Access\Response;

class UserPolicy
{
    public function admin(User $user): Response
    {
        return $user->role === 'admin'
            ? Response::allow()
            : Response::deny('You do not have access to this user.');
    }

    public function show(User $user, $id): Response
    {
        if($user->role === 'admin'){
            return Response::allow();

        } else if ($user->id == $id) {
            return Response::allow();
        }
        return Response::deny('You do not have access to this user.');
    }
}
