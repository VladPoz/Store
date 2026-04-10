<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProductComments extends Model
{
    //
    protected $table = 'product_comments';
    protected $fillable = [
        'product_id',
        'user_id',
        'comment',
        'rating',
    ];
}
