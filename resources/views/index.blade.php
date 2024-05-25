<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Laravel</title>
    </head>
    <body>
        <h1>Contacts:</h1>
        <a href="{{ route('contacts.create') }}">Add new contact</a>
        <ul>
            @foreach ($contacts as $contact)
            <li>
                <p>Name: {{$contact->name}}</p>
                <p>Email: {{$contact->email}}</p>
            </li>
            @endforeach
        </ul>
    </body>
</html>
