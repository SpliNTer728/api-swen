<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Booking extends Model
{
    public function scopeCurrentWeek($query)
    {
        $today = now();
        $startOfWeek = $today->copy()->startOfWeek();
        $endOfWeek = $today->copy()->endOfWeek();

        return $query->whereBetween('start_time', [$startOfWeek, $endOfWeek]);
    }

    public function schedule()
    {
        return $this->belongsTo(ScheduleSlot::class, 'schedule_slot_id');
    }
}
