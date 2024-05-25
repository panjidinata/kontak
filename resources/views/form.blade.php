<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Laravel</title>
    </head>
    <body>
        <h1>Contact Form</h1>
        <a href="{{route('index')}}">index</a>
        <hr>
        <form action="{{$val = (isset($contact)) ? route('contacts.update', ['contact' => $contact->id]) : route('contacts.store')}}" method="POST">
            @csrf
            @if(isset($contact))
                @method("PUT")
            @endif

            <label>Name: </label>
            <input type="text" name="fName" value="{{$val = (isset($contact)) ? $contact->name : '' ;}}"><br>
            <label>Email: </label>
            <input type="text" name="fEmail" value="{{$val = (isset($contact)) ? $contact->email : '' ;}}">
            <br>
            <input type="submit" value="Save">

        </form>
    </body>
</html>
