<?php

namespace App\Http\Controllers;

use App\Models\Camera;
use App\Models\Roll;
use Illuminate\Http\Request;

class RollController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $user = $request->user();

        $roll = Roll::where('user_id', $user->id)
            ->orderBy('completed', 'asc')
            ->orderBy('updated_at', 'desc')
            ->with('camera')
            ->get();

        $roll->makeHidden(['camera_id']);

        return $roll;
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  Request $request
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request)
    {
        $user = $request->user();

        $roll = Roll::where('user_id', $user->id)
            ->where('id', $request->roll)
            ->with('shots')
            ->with('camera')
            ->firstOrFail();

        $roll->makeHidden(['camera_id']);

        return $roll;
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

        $roll = Roll::get($request->roll, $user->id);

        // Update the resource
        $fillable = $roll->getFillable();
        foreach ($fillable as $field) {
            $roll[$field] = $request[$field];
        }

        $roll->camera()->associate(Camera::find($request->camera['id']));

        // Save
        $newRoll = tap($roll)->save();

        // Return the new roll
        return $newRoll->makeHidden(['camera_id']);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request)
    {
        $user = $request->user();

        $roll = Roll::where('user_id', $user->id)
            ->where('id', $request->roll)
            ->firstOrFail();

        $roll->delete();
    }
}
