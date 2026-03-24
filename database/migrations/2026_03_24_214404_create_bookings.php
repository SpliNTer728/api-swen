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
        Schema::create('bookings', function (Blueprint $table) {
        $table->id();
        $table->foreignId('schedule_slot_id')->constrained();
        $table->string('stripe_customer_id');
        $table->string('stripe_checkout_session_id');
        $table->integer('stripe_payment_intent_id');
        $table->enum('status', ['pending', 'confirmed', 'cancelled', 'refunded'])->default('pending');
        $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('bookings');
    }
};
