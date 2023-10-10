<?php
$mysqli = new mysqli("localhost", "root", "", "timesheetgt");
if ($mysqli->connect_errno) {
    echo "Fallo al conectar a MySQL: (" . $mysqli->connect_errno . ") " . $mysqli->connect_error;
}

$result = $mysqli->query("SELECT * FROM proyecto");
$mysqli->close();
$i = 0;
while($obj = $result->fetch_object())
{   	
    $respuesta[$i]["id"] = $obj->id;
    $respuesta[$i]["nombre"] = $obj->nombre;
    $respuesta[$i]["tipo"] = $obj->tipo;
    $respuesta[$i]["comercial"] = $obj->comercial;
    $respuesta[$i]["gestion"] = $obj->gestion;
    $respuesta[$i]["fechainicioideal"] = $obj->fechainicioideal;
    $respuesta[$i]["fechainicioreal"] = $obj->fechainicioreal;
    $respuesta[$i]["fechafinideal"] = $obj->fechafinIdeal;
    $respuesta[$i]["fechafinreal"] = $obj->fechafinreal;
    $i++;
}    
echo json_encode($respuesta);

?>