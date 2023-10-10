<?php
$mysqli = new mysqli("localhost", "root", "", "timesheetgt");
if ($mysqli->connect_errno) {
    echo "Fallo al conectar a MySQL: (" . $mysqli->connect_errno . ") " . $mysqli->connect_error;
}

$result = $mysqli->query("SELECT * from recurso");
$mysqli->close();
$i = 0;
while($obj = $result->fetch_object())
{   
    $respuesta[$i]["id"] = $obj->id;
    $respuesta[$i]["nombre"] = $obj->nombre;
    $respuesta[$i]["apellido"] = $obj->apellido;
    $respuesta[$i]["disponibilidad"] = $obj->disponibilidad;
    $respuesta[$i]["rol"] = $obj->rol;
    $i++;
}    
echo json_encode($respuesta);

?>