<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

use App\Services\StripeServices;

class Schedule_SlotSeeder extends Seeder
{
     protected $slots;

    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $this->slots = array();
        $journaliers = array();
        $soirees = array();

        $stripe = app(StripeServices::class);

        $slot_products = $stripe->getSlots();
        $journaliers = array_filter($slot_products, fn($p) => $p['format'] === 'Journalier');
        $soirees = array_filter($slot_products, fn($p) => $p['format'] === 'Soirée');

        $origin_date = now()->next('Monday');
        $finale_date = $origin_date->copy()->addMonths(1);
        $day_finale = $origin_date->diffInDays($finale_date);

        for($day=0; $day<$day_finale; $day++) 
        {
            $rand_key = array_rand($journaliers, 1);
            $product = $journaliers[$rand_key] ?? null;
            if(!empty($product)) 
            {
                $this->createSlot($product, $origin_date, $day);
            }
        }

        for($day=0; $day<$day_finale; $day++) 
        {
            $rand_key = array_rand($soirees, 1);
            $product = $soirees[$rand_key] ?? null;
            if(!empty($product)) 
            {
                $this->createSlot($product, $origin_date, $day, 17);
            }
        }

        dump($this->slots);
        DB::table('schedule_slots')->insert($this->slots);
    }

    /**
     * Crée un créneau à partir d'un produit Stripe
     */
    private function createSlot($product, $origin_date, $day, $debut=9)
    {
        if(!empty($product)) 
        {
            $duree = intval($product['duree_heures']) ?? 0;
            $date = (clone $origin_date)->addDays($day);
            $start = (clone $date)->setTime($debut, 0);
            $end = (clone $start)->addHours($duree);
            
            $spots_remaining = intval($product['max_spots']) - rand(0, intval($product['max_spots']));

            $this->slots[] = [
                'stripe_product_id' => $product['stripe_product_id'],
                'date' => $date->toDateString(),
                'start_time' => $start->toTimeString(),
                'end_time' => $end->toTimeString(),
                'capacity' => $product['max_spots'],
                'spots_remaining' => $spots_remaining,
                'status' => $spots_remaining === 0 ? 'full' : 'open',
                'women_sailing' => (bool) rand(0, 1),
                'created_at' => now()->toDateString(),
                'updated_at' => now()->toDateString(),
            ];
        }
    }
}
