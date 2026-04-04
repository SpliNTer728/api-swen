<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ScheduleSlot extends Model
{
    protected $table = 'schedule_slots';

    public function scope() {
        $today = now();
        $startOfWeek = $today->copy()->startOfWeek();
        $endOfWeek = $today->copy()->endOfWeek();

        return $this->whereBetween('date', [$startOfWeek, $endOfWeek])->get();
    }
    
    public function scopeCurrentWeek($query)
    {
        $today = now();
        $startOfWeek = $today->copy()->startOfWeek();
        $endOfWeek = $today->copy()->endOfWeek();

        return $query->whereBetween('start_time', [$startOfWeek, $endOfWeek]);
    }

    public function bookings()
    {
        return $this->hasMany(Booking::class, 'schedule_slot_id');
    }
}
