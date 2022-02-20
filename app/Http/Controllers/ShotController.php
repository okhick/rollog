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
        $user = $request->user();

        return Shot::whereRelation('roll', 'user_id', $user->id)
            ->whereRelation('roll', 'id', $request->rollId)
            ->get();
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $shot = new Shot();

        $fillable = $shot->getFillable();
        foreach ($fillable as $field) {
            $shot[$field] = $request[$field];
        }

        // Not sure which method is better...
        // $shot->lens_id = $request->lens['id'];
        $shot->lens()->associate(Lens::find($request->lens['id']));
        $shot->roll()->associate(Roll::getRoll($request->roll, $request->user()->id));

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
        return Shot::getShot($request->user()->id, $request->roll, $request->shot);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
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
        $shot = Shot::getShot($request->user()->id, $request->roll, $request->shot);

        $fillable = $shot->getFillable();
        foreach ($fillable as $field) {
            $shot[$field] = $request[$field];
        }

        // Not sure which method is better...
        // $shot->lens_id = $request->lens['id'];
        $shot->lens()->associate(Lens::find($request->lens['id']));

        return tap($shot)->save();
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
