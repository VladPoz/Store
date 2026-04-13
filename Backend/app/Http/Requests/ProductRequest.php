<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class ProductRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return auth('sanctum')->check();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:32'],
            'category_id' => ['required', 'integer', 'exists:categories,id'],
            'description' => ['required', 'string'],
            'price' => ['required', 'numeric'],
            'count' => ['required', 'numeric'],
            'slug' => ['required', 'string', 'max:32', 'unique:products,slug'],
            'images' => ['required'],
            'images.*' => ['image', 'mimes:jpeg,jpg,png', 'max:2048'],
        ];
    }
    public function messages(): array{
        return [
            'name.required' => 'Product name is required',
            'name.string' => 'Name must be a string.',
            'name.max' => 'Product name is too long.',
            'category_id.required' => 'Category is required',
            'category_id.integer' => 'Category must be an integer.',
            'category_id.exists' => 'Category does not exist.',
            'description.required' => 'Product description is required',
            'description.string' => 'Description must be a string.',
            'price.required' => 'Price is required',
            'price.numeric' => 'Price must be a number.',
            'count.required' => 'Quantity is required',
            'count.numeric' => 'Quantity must be a number.',
            'slug.required' => 'Slug is required',
            'slug.string' => 'Slug must be a string.',
            'slug.max' => 'Slug max 32 characters.',
            'slug.unique' => 'Slug must be unique.',
            'images.required' => 'Images is required',
            'images.*.image' => 'Image must be an image.',
            'images.*.mimes' => 'Image must be a file of type: jpeg, jpg, png.',
            'images.*.max' => 'Image max 32 characters.',
        ];
    }
}
