<?php

namespace App\Http\Controllers;

use App\Services\StripeServices;
use Illuminate\Http\Request;
use Stripe\Product;

class ProductController extends Controller
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
        return $this->stripeServices->getAllProducts();
    }

    /**
     * Display a listing of Stripe products filtered by type="slot".
     */
    public function indexSlots()
    {
        return $this->stripeServices->getSlots();
    }

    /**
     * Display a listing of Stripe products filtered by type="formule".
     */
    public function indexFormules()
    {
        return $this->stripeServices->getFormules();
    }
}