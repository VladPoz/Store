<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Basket extends Model
{
    //
    protected $table = 'baskets';
    public $timestamps = false;
    protected $fillable = [
        'user_id',
        'product_id',
    ];
}
