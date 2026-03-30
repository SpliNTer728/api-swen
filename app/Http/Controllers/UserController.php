<?php

namespace App\Http\Controllers;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use Illuminate\Support\Facades\Gate;
use Illuminate\Http\Request;
use App\Models\User;


/**
 * @group 👤 User resources
 *
 * Those endpoints allows you to fetch users resources.
 */
class UserController extends Controller implements HasMiddleware
{

    public static function middleware()
    {
        return [
            new Middleware('auth:sanctum'),
        ];
    }   

    /**
     * 👤 Fetch all users
     * 
     * This endpoint allows you to fetch all users.
     */
    public function index(Request $request)
    {
       //$user = User::find($request->user()->id);

        $user = $request->user();

        return response()->json($user);
    }

    /**
     * 👤 Fetch all users
     * 
     * This endpoint allows you to fetch all users.
     */
    public function indexAll(Request $request)
    {
        Gate::authorize('admin', User::class);

        $users = User::where('role', '!=', 'admin')
            ->where('actif', true)
            ->get();

        return response()->json($users);
    }

    /**
     * 👤 Fetch current user
     * 
     * This endpoint allows you to fetch data for a specific user.
     */
    public function show(Request $request, $id)
    {
        Gate::authorize('show', $request->user(), $id);

        $user = User::find($id);

        return response()->json($user);
    }


}
