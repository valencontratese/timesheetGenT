<?php
$mysqli = new mysqli("localhost", "root", "", "timesheetgt");
if ($mysqli->connect_errno) {
    echo "Fallo al conectar a MySQL: (" . $mysqli->connect_errno . ") " . $mysqli->connect_error;
}

$result = $mysqli->query("SELECT p.id as idProyecto, r.id as idRecurso, p.nombre as proyecto, r.apellido, r.nombre, SUM(esfuerzo) as horas FROM `proyecto_recurso` as pr INNER JOIN proyecto p on p.id = pr.idProyecto INNER JOIN recurso r on r.id = pr.idRecurso INNER JOIN tareas t on t.idRecurso = pr.idRecurso AND t.idProyecto = pr.idProyecto GROUP BY p.id, r.id, p.nombre, r.apellido, r.nombre");
$mysqli->close();
$i = 0;
while($obj = $result->fetch_object())
{   
    $respuesta[$i]["proyecto"] = $obj->proyecto;
    $respuesta[$i]["horas"] = $obj->horas;
    $respuesta[$i]["recurso"] = $obj->apellido .", ". $obj->nombre;
    $i++;
}    
echo json_encode($respuesta);

?>