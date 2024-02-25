<?php

namespace Controllers;

use Model\Cita;
use Model\CitaServicio;
use Model\Servicio;
use MVC\Router;

class APIController{
    public static function index(){
        $servicios=Servicio::all();
        echo json_encode($servicios);
    }

    public static function guardar(){

        //almacena la cita y devuelve el id
        $cita=new Cita($_POST);        
        $resultado=$cita->guardar();
        $id=$resultado['id'];

        //Almacena la cita y el servicio
        //Almacena los servicios con el Id de la cita
        $idServicios=explode(',',$_POST['servicios']);
        foreach($idServicios as $idservicio){
            $args=[
                'citaId'=>$id,
                'servicioId'=>$idservicio
            ];
            
            $citaServicio= new CitaServicio($args);
            $citaServicio->guardar();
        }

               
       echo json_encode(['resultado'=>$resultado]);
    }

    public static function eliminar(){

        if($_SERVER['REQUEST_METHOD']==='POST'){
            $id=$_POST['id'];
            $cita=Cita::find($id);
            $cita->eliminar();
            header('location: '.$_SERVER['HTTP_REFERER']);
            
        }
    }
}




?>