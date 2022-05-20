<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
    <table>
        <tr>
            <th>Name</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Address</th>
        </tr>

        @foreach ($employees as $em)
        <tr>
            <td>{{ $em->name }}</td>
            <td>{{ $em->phone_number }}</td>
            <td>{{ $em->email }}</td>
            <td>{{ $em->address }}</td>
        </tr>
        @endforeach

        <a href="/add">add employee</a>
    </table>
</body>
</html>