<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;

class UserUpdateRequest extends FormRequest
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
        $user = auth('sanctum')->user();
        return [
            'name' => ['required', 'min:3', 'max:32'],
            'email' => ['required', 'email', Rule::unique('users', 'email')->ignore($user->id)],
            'password' => ['required', 'min:6', 'max:32'],
        ];
    }

    public function messages(): array{
        return [
            'name.required' => 'Name is required',
            'name.min' => 'Name min 3 characters',
            'name.max' => 'Name max 32 characters',
            'email.required' => 'Email is required',
            'email.email' => 'Email is invalid',
            'password.required' => 'Password is required',
            'password.min' => 'Password min 6 characters',
            'password.max' => 'Password max 32 characters',
        ];
    }
}
