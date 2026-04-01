<?php
 
namespace App\Services;

use Stripe\Stripe;
use Stripe\Product;
use Stripe\Customer;

class StripeService
{
    public function __construct()
    {
        Stripe::setApiKey(env('STRIPE_KEY'));
    }

    public function getProducts()
    {
        return Product::all();
    }

    public function getCustomers()
    {
        return Customer::all();
    }
}