<?php

namespace App\Http\Controllers;

use App\Services\StripeServices;
use Illuminate\Http\Request;
use stripe\Customer;

class CustomerController extends Controller
{
    protected StripeServices $stripeServices;

    public function __construct(StripeServices $stripeServices) {
        $this->stripeServices = $stripeServices;
    }


    /**
     * Display a listing of Stripe products.
     */
    public function index()
    {
        return $this->stripeServices->getCustomers();
    }

}