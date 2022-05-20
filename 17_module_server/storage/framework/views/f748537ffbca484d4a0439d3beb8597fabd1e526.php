<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
    <form action="/login" method="post">
    <?php echo csrf_field(); ?>
    <label for="username">username</label>
    <input type="text" name="username" id="username">

    <label for="password">password</label>
    <input type="password" name="password" id="password">
    <button type="submit">login</button>
    </form>
</body>
</html><?php /**PATH C:\Applications\17_module_server\resources\views/login.blade.php ENDPATH**/ ?>