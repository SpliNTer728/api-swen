<?php

namespace App\Http\Controllers;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use Illuminate\Http\Request;
use App\Models\User;


/**
 * @group User resources
 *
 * Those endpoints allows you to fetch users resources.
 */
class UserController extends Controller
{
    /**
     * 👤 Fetch all users
     * 
     * This endpoint allows you to fetch all users.
     */
    public function index()
    {
        $Users = User::where('role', '!=', 'admin')
        ->where('actif', true)
        ->get();

        return response()->json($Users);
    }


}
