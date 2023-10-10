<?php
$mysqli = new mysqli("localhost", "root", "", "timesheetgt");
if ($mysqli->connect_errno) {
    echo "Fallo al conectar a MySQL: (" . $mysqli->connect_errno . ") " . $mysqli->connect_error;
}
$datos = json_decode(file_get_contents("php://input"));
// Aquí podemos procesar los datos
$id = $datos->idRec;

$result = $mysqli->query("DELETE FROM recurso WHERE id = '".$id."'");
$mysqli->close();

echo json_encode($result);

?>