<?php

namespace Database\Seeders;

use App\Models\Camera;
use App\Models\Roll;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Create 5 generic users
        User::factory()->count(5)->create();

        // Create my user
        User::create([
            'name' => 'Oliver Hickman',
            'email' => 'oliver.hickman@hey.com',
            'email_verified_at' => now(),
            'password' => '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi',
            'remember_token' => Str::random(10)
        ]);
    }
}
