<?php
 
namespace App\Services;

use Stripe\Stripe;
use Stripe\Product;
use Stripe\Customer;

class StripeServices
{
    protected array $products = [];
    
    public function __construct()
    {
        Stripe::setApiKey(env('STRIPE_KEY'));
        $this->loadProducts();
    }

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
                'product_name' => $product->name ?? null,
                'description' => $product->description ?? null,
                'active' => $product->active ?? null,

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
}