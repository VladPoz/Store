<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProductImage extends Model
{
    //
    protected $table = 'product_images';
    public $timestamps = false;
    protected $fillable = [
        'product_id',
        'pathToImage',
        'is_main_image',
    ];
}
