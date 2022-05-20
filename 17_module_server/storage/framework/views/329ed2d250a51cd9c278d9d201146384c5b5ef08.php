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

        <?php $__currentLoopData = $employees; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $em): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
        <tr>
            <td><?php echo e($em->name); ?></td>
            <td><?php echo e($em->phone_number); ?></td>
            <td><?php echo e($em->email); ?></td>
            <td><?php echo e($em->address); ?></td>
        </tr>
        <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?>

        <a href="/add">add employee</a>
    </table>
</body>
</html><?php /**PATH C:\Applications\17_module_server\resources\views/dashboard.blade.php ENDPATH**/ ?>