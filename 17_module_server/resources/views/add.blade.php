<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
    <form action="/employee" method="POST">
        @csrf
        <input type="text" name="name" id="name" placeholder="name">
        <input type="email" name="email" id="email" placeholder="email">
        <input type="text" name="phone_number" id="phone_number" placeholder="name">
        <input type="text" name="address" id="address" placeholder="address">
        <button type="submit">submit</button>
    </form>
</body>
</html>