<?php
 
namespace App\Services;

use Stripe\Stripe;
use Stripe\Product;
use Stripe\Customer;

class StripeServices
{
    protected array $products = [];
    protected array $customers = [];

    public function __construct()
    {
        Stripe::setApiKey(env('STRIPE_KEY'));
        $this->loadProducts();
        $this->loadCustomers();
    }

    /** ------------------------- PRODUCTS ------------------------- */
    private function loadProducts()
    {
        $products = Product::all();
        $this->products = $products->data;
    }

    /**
     * Get products based on filters
     * @param array $filters
     * @return array
     */
    private function getProducts($filters = [])
    {
        $filteredProducts = $this->products;

        if (isset($filters['type'])) {
            $filteredProducts = array_filter($filteredProducts, function($product) use ($filters) {
                return isset($product->metadata['type']) && $product->metadata['type'] === $filters['type'];
            });
        }

        if (isset($filters['format'])) {
            $filteredProducts = array_filter($filteredProducts, fn($p) => $p->metadata['format'] === $filters['format']);
        }

        if (isset($filters['active'])) {
            $filteredProducts = array_filter($filteredProducts, fn($p) => $p->active === $filters['active']);
        }

        return array_values($filteredProducts);
    }

    /**
     * Get all Stripe products with type "slot"
     * @return array
     */
    public function getSlots()
    {
        $products = $this->getProducts(['type' => 'slot']);
        return StripeServices::formatProduct($products);
    }

    /**
     * Get all Stripe products with type "formule"
     * @return array
     */
    public function getFormules()
    {
        $products = $this->getProducts(['type' => 'formule']);
        return StripeServices::formatProduct($products);
    }

    /**
     * Get all Stripe products
     * @return array
     */
    public function getAllProducts()
    {
        return StripeServices::formatProduct($this->products);
    }

    /** ------------------------- CUSTOMERS ------------------------- */
    private function loadCustomers()
    {
        $customers = Customer::all();
        $this->customers = $customers->data;
    }

    /**
     * Get all Stripe customers
     * @return array
     */
    public function getCustomers()
    {
        return StripeServices::formatCustomer($this->customers);
    }

    /**
     * Get customers based on filters
     * @param array $filters
     * @return array
     */
    private function getCustomersWithFilter($filters = [])
    {
        $filteredCustomers = $this->customers;

        if (isset($filters['name'])) {
            $filteredCustomers = array_filter($filteredCustomers, function($customer) use ($filters) {
                if (!isset($customer['name'])) {
                    return false;
                }

                $pattern = '/' . preg_quote($filters['name'], '/') . '/i';

                return preg_match($pattern, $customer['name']);
            });
        }

        if (isset($filters['email'])) {
            $filteredCustomers = array_filter($filteredCustomers, function($customer) use ($filters) {
                return isset($customer['email']) && $customer['email'] === $filters['email'];
            });
        }

        return array_values($filteredCustomers);
    }

    /** ------------------------- FORMATTING ------------------------- */

    /**
     * Format a Stripe product into a flat array with metadata
     * @param Product $product
     * @return array
     */
    static function formatProduct(array $products) : array
    {
        $flat_products = array();

        foreach($products as $product) {
            $flat_products[] = [
                'stripe_product_id' => $product->id,
                'default_price' => $product->default_price ?? null,
                'images' => $product->images ?? null,
                'marketing_features' => $product->metadata->marketing_features ?? null,
                'product_name' => $product->name ?? null,
                'description' => $product->description ?? null,
                'active' => $product->active ?? null,
                'url' => $product->metadata->url ?? null,

                'duree_heures' => $product->metadata->duree_heures ?? null,
                'format' => $product->metadata->format ?? null,
                'lieu' => $product->metadata->lieu ?? null,
                'max_spots' => $product->metadata->nb_max_personnes ?? null,
                'niveau' => $product->metadata->niveau ?? null,
                'type' => $product->metadata->type ?? null,

                'start_hour' => $product->start_hour ?? null,
                'end_hour' => $product->end_hour ?? null,
                'created' => $product->created,
                'updated' => $product->updated,
            ];
        }
        return $flat_products;
    }

    /**
     * Format a Stripe product into a flat array with metadata
     * @param Customer $product
     * @return array
     */
    static function formatCustomer(array $customers) : array
    {
        $flat_products = array();

        foreach($customers as $customer) {
            $flat_customers[] = [
                'stripe_customer_id' => $customer->id,
                'country' => $customer->address->country ?? null,
                'city' => $customer->address->city ?? null,
                'line1' => $customer->address->line1 ?? null,
                'postal_code' => $customer->address->postal_code ?? null,
                'state' => $customer->address->state ?? null,
                'email' => $customer->email ?? null,
                'name' => $customer->name ?? null,
                'created' => $customer->created,
                'updated' => $customer->updated,
            ];
        }
        return $flat_customers;
    }
}