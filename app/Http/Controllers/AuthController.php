<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Testing\Fluent\Concerns\Has;
use Illuminate\Support\Facades\Hash;

/**
 * @group User management
 *
 * Those endpoints allows you to add user, login and logout.
 */
class AuthController extends Controller
{
    /**
     * 👤 Register an user
     * 
     * Name, email and password are required to register an user.
     */
    public function register(Request $request)
    {
        $fields = $request->validate([
            'name' => 'required|max:255',
            'email' => 'required|email|unique:users',
            'password' => 'required|confirmed',
        ]);

        $user = User::create($fields);

        $token = $user->createToken($request->email)->plainTextToken;

        return response()->json([
            'message' => 'Registration successful', 
            'user' => $user,
            'token' => $token], 201);
    }

    /**
     * 👤 Login an user
     *
     * This endpoint allows you to login an user.
     * The email must exist in the database, and the password must be correct.
     */
    public function login(Request $request)
    {
        $fields = $request->validate([
            'email' => 'required|email|exists:users,email',
            'password' => 'required',
        ]);

        $user = User::where('email', $fields['email'])->first();
        
        if(!$user || !Hash::check($request->password, $user->password)) {
            return response()->json(['message' => 'Invalid credentials'], 401);
        }

        $token = $user->createToken($request->email)->plainTextToken;

        return response()->json([
            'message' => 'Login successful',
            'token' => $token
        ], 200); 
    }

    /**
     * 👤 🔒 Logout an user
     *
     * This endpoint allows you to logout an user.
     * You must be authenticated to access this endpoint, and the token used for authentication will be revoked.
     * @authenticated
     */
    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();
        
        return response()->json(['message' => 'Logout successful']);
    }
}
