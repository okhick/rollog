<?php

namespace App\Http\Controllers;

use App\Models\Lens;
use App\Models\Roll;
use App\Models\Shot;
use Illuminate\Http\Request;

class ShotController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        // $user = $request->user();

        // $shot = Shot::whereRelation('roll', 'id', $request->rollId);

        // if ($user->cannot('view'))

        // $shot = Shot::whereRelation('roll', 'user_id', $user->id)
        //     ->whereRelation('roll', 'id', $request->rollId)
        //     ->get();

        // return $shot;
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $user = $request->user();
        $roll = Roll::find($request->roll);
        $lens = Lens::find($request->lens['id']);

        // Make sure user owns roll and lens
        if ($user->cannot('modifyRoll', $roll) ||
            $user->cannot('useLens', $lens)
        ) {
            abort(403);
        }

        $shot = new Shot();

        $fillable = $shot->getFillable();
        foreach ($fillable as $field) {
            $shot[$field] = $request[$field];
        }

        $shot->lens()->associate($lens);
        $shot->roll()->associate($roll);

        return tap($shot)->save();
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request)
    {
        $roll = Roll::find($request->roll);

        // Make sure user owns roll
        if ($request->user()->cannot('modifyRoll', $roll)) {
            abort(403);
        }

        return Shot::find($request->shot);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request)
    {
        $user = $request->user();
        $roll = Roll::find($request->roll);
        $lens = Lens::find($request->lens['id']);

        // Make sure user owns roll and lens
        if ($user->cannot('modifyRoll', $roll) ||
            $user->cannot('useLens', $lens)
        ) {
            abort(403);
        }

        $shot = Shot::get($roll->id, $request->shot);

        $fillable = $shot->getFillable();
        foreach ($fillable as $field) {
            $shot[$field] = $request[$field];
        }

        $shot->lens()->associate($lens);

        return tap($shot)->save();
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request)
    {
        $roll = Roll::where('id', $request->roll)
            ->firstOrFail();

        // Ensure user owns roll
        if ($request->user()->cannot('modifyRoll', $roll)) {
            abort(403);
        }

        $shot = Shot::where('id', $request->shot)
            ->firstOrFail();

        $shot->delete();
    }
}
