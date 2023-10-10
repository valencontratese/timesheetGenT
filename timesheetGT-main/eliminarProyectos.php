<?php
$mysqli = new mysqli("localhost", "root", "", "timesheetgt");
if ($mysqli->connect_errno) {
    echo "Fallo al conectar a MySQL: (" . $mysqli->connect_errno . ") " . $mysqli->connect_error;
}
$datos = json_decode(file_get_contents("php://input"));
// Aquí podemos procesar los datos
$id = $datos->idProy;

$result = $mysqli->query("DELETE FROM proyecto WHERE id = '".$id."'");
$mysqli->close();

echo json_encode($result);

?>