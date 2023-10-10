<?php
$mysqli = new mysqli("localhost", "root", "", "timesheetgt");
if ($mysqli->connect_errno) {
    echo "Fallo al conectar a MySQL: (" . $mysqli->connect_errno . ") " . $mysqli->connect_error;
}
$datos = json_decode(file_get_contents("php://input"));
// Aquí podemos procesar los datos

$nombre = $datos->name;
$tipo = $datos->tipo;
$comercial = $datos->comercial;
$gestion = $datos->gestion;
$startIdeal = $datos->startIdeal;
$startReal = $datos->startReal;
$endIdeal = $datos->endIdeal;
$endReal = $datos->endReal;
$idProy = $datos->idProy;

if ($idProy == 0 )
{
    $result = $mysqli->query("INSERT INTO proyecto (nombre, tipo, comercial, gestion, fechainicioideal, fechainicioreal, fechafinIdeal, fechafinreal) VALUES ('".$nombre."', '".$tipo."','".$comercial."','".$gestion."','".$startIdeal."','".$startReal."','".$endIdeal."','".$endReal."')");

    $result = $mysqli->query("SELECT LAST_INSERT_ID() as id");
    $mysqli->close();
    
    while($obj = $result->fetch_object())
    {
        $id=$obj->id;
    }    
    echo json_encode($id);
}
else
{
 
    $result = $mysqli->query("UPDATE proyecto SET nombre = '".$nombre."', tipo = '".$tipo."', comercial = '".$comercial."', gestion = '".$gestion."', fechainicioideal = '".$startIdeal."', fechainicioreal = '".$startReal."', fechafinIdeal = '".$endIdeal."', fechafinreal = '".$endReal."' WHERE id = ".$idProy);

    $id = $idProy;
    
    
    $respuesta["id"] = $id;
    $respuesta["nombre"] = $nombre;
    $respuesta["tipo"] = $tipo;
    $respuesta["comercial"] = $comercial;
    $respuesta["gestion"] = $gestion;
    $respuesta["fechainicioideal"] = $startIdeal;
    $respuesta["fechainicioreal"] = $startReal;
    $respuesta["fechafinIdeal"] = $endIdeal;
    $respuesta["fechafinreal"] = $endReal;


    echo json_encode($respuesta);
}




?>