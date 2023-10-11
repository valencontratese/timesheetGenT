<?php
$mysqli = new mysqli("localhost", "root", "", "timesheetgt");
if ($mysqli->connect_errno) {
    echo "Fallo al conectar a MySQL: (" . $mysqli->connect_errno . ") " . $mysqli->connect_error;
}
$datos = json_decode(file_get_contents("php://input"));
// Aquí podemos procesar los datos

$accion = $datos->accion;
$idRecurso = $datos->idRecurso;
$idProyecto = $datos->idProyecto;
$esfuerzo = $datos->esfuerzo;
$idTarea = $datos->idTarea;
$nombre = $datos->nombre;
$descripcion = $datos->descripcion;


if ($accion=='listarProyectos')
{
    $result = $mysqli->query("SELECT * FROM proyecto ORDER BY nombre");
    $mysqli->close();
    $i = 0;
    while($obj = $result->fetch_object())
    {   	
        $respuesta[$i]["id"] = $obj->id;
        $respuesta[$i]["nombre"] = $obj->nombre;
        $i++;
    }    
    echo json_encode($respuesta);
}
elseif ($accion=='listarRecursos')
{
    $result = $mysqli->query("SELECT id, nombre, apellido FROM recurso WHERE id IN (SELECT idRecurso FROM `proyecto_recurso` WHERE idProyecto = ".$idProyecto." GROUP BY idRecurso) ORDER BY apellido, nombre");
    $mysqli->close();
    $i = 0;
    while($obj = $result->fetch_object())
    {   	
        $respuesta[$i]["id"] = $obj->id;
        $respuesta[$i]["nombre"] = $obj->apellido .", ". $obj->nombre;
        $i++;
    }    
    echo json_encode($respuesta);
}
elseif ($accion=='cargarEsfuerzo')
{
    $result = $mysqli->query("SELECT disponibilidad FROM `proyecto_recurso` WHERE idRecurso = ".$idRecurso." AND idProyecto = ".$idProyecto);
    
    $i = 0;    
    $asignacion = 1;
    while($obj = $result->fetch_object())
    {
        $asignacion = $obj->disponibilidad;
        
    }

    $result = $mysqli->query("SELECT disponibilidad FROM `recurso` WHERE id = ".$idRecurso);
    
    $disponibilidad = 0;    
    while($obj = $result->fetch_object())
    {
        $disponibilidad = $obj->disponibilidad;
        
    }    

    $maximo = ($disponibilidad * $asignacion / 100);
    for ($j=1;$j<=$maximo;$j+=1)
    {
        $respuesta[$i]["esfuerzo"] = $j;
        $i++;
    }
    $mysqli->close();

    echo json_encode($respuesta);
}
elseif ($accion=='insert')
{
    if ($idTarea == 0)
    {
        $result = $mysqli->query("INSERT INTO `tareas` (idProyecto, idRecurso, esfuerzo, nombre, descripcion) VALUES (".$idProyecto.", ".$idRecurso.", ".$esfuerzo.", '".$nombre."', '".$descripcion."')");
    
        $result = $mysqli->query("SELECT LAST_INSERT_ID() as id");
                
        while($obj = $result->fetch_object())
        {
            $id=$obj->id;
        }  
    }
    else
    {
        $result = $mysqli->query("UPDATE `tareas` SET  idProyecto = ".$idProyecto.", idRecurso = ".$idRecurso.", esfuerzo = ".$esfuerzo.", nombre = '".$nombre."', descripcion = '".$descripcion."' WHERE id = ".$idTarea);
        
        $id=$idTarea;
          
    }      
    
    $result = $mysqli->query("SELECT t.id, p.id as idProyecto, r.id as idRecurso, p.nombre as proyecto, t.nombre as tarea, r.apellido, r.nombre, esfuerzo, descripcion FROM `tareas` as t INNER JOIN proyecto p on p.id = t.idProyecto INNER JOIN recurso r on r.id = t.idRecurso WHERE t.id = ".$id);
    $mysqli->close();
    $i = 0;
    while($obj = $result->fetch_object())
    {   	
        $respuesta[$i]["id"] = $id;
        $respuesta[$i]["proyecto"] = $obj->proyecto;
        $respuesta[$i]["recurso"] = $obj->apellido .", ". $obj->nombre;
        $respuesta[$i]["esfuerzo"] = $obj->esfuerzo;
        $respuesta[$i]["idProyecto"] = $obj->idProyecto;
        $respuesta[$i]["idRecurso"] = $obj->idRecurso;
        $respuesta[$i]["nombre"] = $obj->tarea;
        $respuesta[$i]["descripcion"] = $obj->descripcion;
        $respuesta[$i]["tarea"] = $obj->tarea;
        $i++;
    }
    echo json_encode($respuesta);
}
elseif ($accion=='listarTareas')
{

    $result = $mysqli->query("SELECT t.id as idTarea, p.id as idProyecto, r.id as idRecurso, p.nombre as proyecto, t.nombre as tarea, r.apellido, r.nombre, esfuerzo, descripcion FROM `tareas` as t INNER JOIN proyecto p on p.id = t.idProyecto INNER JOIN recurso r on r.id = t.idRecurso ORDER BY p.nombre, r.apellido, r.nombre");
    $mysqli->close();
    $i = 0;
    while($obj = $result->fetch_object())
    {   	
        $respuesta[$i]["id"] = $obj->idTarea;
        $respuesta[$i]["proyecto"] = $obj->proyecto;
        $respuesta[$i]["recurso"] = $obj->apellido .", ". $obj->nombre;
        $respuesta[$i]["esfuerzo"] = $obj->esfuerzo;
        $respuesta[$i]["idProyecto"] = $obj->idProyecto;
        $respuesta[$i]["idRecurso"] = $obj->idRecurso;
        $respuesta[$i]["nombre"] = $obj->tarea;
        $respuesta[$i]["descripcion"] = $obj->descripcion;
        $respuesta[$i]["tarea"] = $obj->tarea;
        $i++;
    }
    echo json_encode($respuesta);
}
elseif ($accion=='eliminarTarea')
{

    $result = $mysqli->query("DELETE FROM `tareas` WHERE id = ".$idTarea);
    $mysqli->close();
    
    echo json_encode($result);
}


?>