<?php

use App\Http\Controllers\AuthController;
use App\Models\Employee;
use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;


/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('login');
});
Route::post('/login',[AuthController::class, 'login']);
Route::group(['middleware'=>['auth']], function() {
    Route::get('/employee', function() {
        $employees = Employee::all();
        return view('dashboard', ['employees'=>$employees]);
    });
    Route::post('/employee', function(Request $request) {
        Employee::create([
            'name'=>$request->name,
            'email'=>$request->email,
            'phone_number'=>$request->phone_number,
            'address'=>$request->address,
        ]);

        return redirect('/employee');
    });
    Route::get('/add', function() {
        return view('add');
    });
});
