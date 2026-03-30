<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\StripeServices;

class ScheduleController extends Controller
{
    protected StripeServices $stripe;

    public function __construct(StripeServices $stripe) {
        $this->stripe = $stripe;
    }

    /**
     * 
     */
    public function index() {
        return response()->json([
            'message' => 'ScheduleController index',
        ]);
    }
}
