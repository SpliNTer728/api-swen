<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class Schedule_SlotSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $slots = [];
        for ($i = 0; $i < 5; $i++) {
            $date = now()->addDays($i);
            // heure de début entre 8h et 16h
            $start = (clone $date)->setTime(rand(8, 16), 0);

            // durée entre 1h et 3h
            $end = (clone $start)->addHours(rand(1, 3));

            $capacity = rand(5, 12);
            $spotsRemaining = rand(0, $capacity);

            $slots[] = [
                'stripe_product_id' => 'prod_' . strtoupper(Str::random(6)),
                'date' => $date->toDateString(),
                'start_time' => $start,
                'end_time' => $end,
                'capacity' => $capacity,
                'spots_remaining' => $spotsRemaining,
                'status' => $spotsRemaining === 0 ? 'full' : 'open',
                'women_sailing' => (bool) rand(0, 1),
                'created_at' => now(),
                'updated_at' => now(),
            ];
        }

        DB::table('schedule_slots')->insert($slots);
    }
}
