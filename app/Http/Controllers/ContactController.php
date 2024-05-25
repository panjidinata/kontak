<?php

namespace App\Http\Controllers;

use App\Models\Contact;
use Illuminate\Http\Request;
use Illuminate\View\View;
use Illuminate\Http\RedirectResponse;

class ContactController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): View
    {
        $results = Contact::all();
        return view("index", ["contacts" => $results]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): View
    {
        return view("form");
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): RedirectResponse
    {
        $contact = new Contact;
        $contact->name = $request->fName;
        $contact->email = $request->fEmail;
        $contact->save();

        return redirect()->route("index");
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $result = Contact::findOrFail($id);
        return $result;
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id): View
    {
        $result = Contact::findOrFail($id);
        return view('form', ['contact' => $result]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $contact = Contact::find($id);
        $contact->name = $request->name;
        $contact->email = $request->email;
        $contact->save();

        return "contact updated";
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $contact = Contact::destroy($id);
        return "contact deleted";
    }
}
