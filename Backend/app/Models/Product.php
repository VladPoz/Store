<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    //
    protected $table = 'products';
    protected $fillable = [
        'name',
        'category_id',
        'user_id',
        'description',
        'price',
        'count',
        'slug',
    ];

    public function images(){
        return $this->hasMany(ProductImage::class);
    }
}
