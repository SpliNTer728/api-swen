<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('schedule_slots', function (Blueprint $table) {
            $table->id();
            $table->string('stripe_product_id');
            $table->date('date');
            $table->time('start_time');
            $table->time('end_time');
            $table->integer('capacity');
            $table->integer('spots_remaining');
            $table->enum('status', ['open', 'full', 'cancelled'])->default('open');
            $table->boolean('women_sailing')->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('schedule_slots');
    }
};
