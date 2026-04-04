<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Booking;

class BookingController extends Controller
{
    /**
     * Retrieve a list of all booking for the current week
     */
    public function index() {
        return Booking::all();
    }
}
