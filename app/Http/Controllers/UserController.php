<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class UserController extends Controller
{
    public function getFilmStocks(Request $request)
    {
        $user = $request->user();

        return $user->filmStocks();
    }
}
