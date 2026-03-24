<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class BookingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $slots = DB::table('schedule_slots')->pluck('id');

        $bookings = [];

        for ($i = 0; $i < 5; $i++) {

            $statusOptions = ['pending', 'confirmed', 'cancelled', 'refunded'];
            $status = $statusOptions[array_rand($statusOptions)];

            $bookings[] = [
                'schedule_slot_id' => $slots->random(), // FK valide
                'stripe_customer_id' => 'cus_' . Str::lower(Str::random(10)),
                'stripe_checkout_session_id' => 'cs_' . Str::lower(Str::random(12)),
                'stripe_payment_intent_id' => rand(100000, 999999),
                'status' => $status,
                'created_at' => now()->subDays(rand(0, 10)),
                'updated_at' => now(),
            ];
        }

        DB::table('bookings')->insert($bookings);
    }
}
