<?php
$mysqli = new mysqli("localhost", "root", "", "timesheetgt");
if ($mysqli->connect_errno) {
    echo "Fallo al conectar a MySQL: (" . $mysqli->connect_errno . ") " . $mysqli->connect_error;
}
$datos = json_decode(file_get_contents("php://input"));
// Aquí podemos procesar los datos
$nombre = $datos->name;
$apellido = $datos->surname;
$disponibilidad = $datos->availability;
$rol = $datos->rol;
$idRec = $datos->idRec;

if ($idRec == 0 )
{
    $result = $mysqli->query("INSERT INTO recurso (nombre, apellido, disponibilidad, rol) VALUES ('".$nombre."', '".$apellido."','".$disponibilidad."','".$rol."')");

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
    $result = $mysqli->query("UPDATE recurso SET nombre = '".$nombre."', apellido = '".$apellido."', disponibilidad = '".$disponibilidad."', rol = '".$rol."' WHERE id = ".$idRec);   
    $id = $idRec;

    $respuesta["id"] = $id;
    $respuesta["nombre"] = $nombre;
    $respuesta["apellido"] = $apellido;
    $respuesta["disponibilidad"] = $disponibilidad;
    $respuesta["rol"] = $rol;

    echo json_encode($respuesta);
}




?>