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
$asignacion = $datos->asignacion;
$idRecProy = $datos->idRecProy;

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
    $result = $mysqli->query("SELECT id, nombre, apellido FROM recurso WHERE id NOT IN (SELECT idRecurso FROM `proyecto_recurso` WHERE idRecurso != ".$idRecurso." GROUP BY idRecurso HAVING SUM(disponibilidad)=100) ORDER BY apellido, nombre");
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
elseif ($accion=='cargarAsignacion')
{
    $result = $mysqli->query("SELECT SUM(disponibilidad) as asignado FROM `proyecto_recurso` WHERE idRecurso = ".$idRecurso." GROUP BY idRecurso ");
    $mysqli->close();
    $i = 0;    
    $valorUsado = 0;
    
    while($obj = $result->fetch_object())
    {
        $valorUsado = $obj->asignado;
        
    }
    $maximo = 100 - $valorUsado  + $asignacion;
    for ($j=25;$j<=$maximo;$j+=25)
    {
        $respuesta[$i]["asignacion"] = $j;
        $i++;
    }
    

    echo json_encode($respuesta);
}
elseif ($accion=='insert')
{
    if ($idRecProy == 0)
    {
        $result = $mysqli->query("INSERT INTO `proyecto_recurso` (idProyecto, idRecurso, disponibilidad) VALUES (".$idProyecto.", ".$idRecurso.", ".$asignacion.")");
    
        $result = $mysqli->query("SELECT LAST_INSERT_ID() as id");
                
        while($obj = $result->fetch_object())
        {
            $id=$obj->id;
        }  
    }
    else
    {
        $result = $mysqli->query("UPDATE `proyecto_recurso` SET  idProyecto = ".$idProyecto.", idRecurso = ".$idRecurso.", disponibilidad = ".$asignacion." WHERE idRecProy = ".$idRecProy);
        
        $id=$idRecProy;
          
    }      
    
    $result = $mysqli->query("SELECT p.id as idProyecto, r.id as idRecurso, p.nombre as proyecto, r.apellido, r.nombre, pr.disponibilidad FROM `proyecto_recurso` as pr INNER JOIN proyecto p on p.id = pr.idProyecto INNER JOIN recurso r on r.id = pr.idRecurso WHERE idRecProy = ".$id);
    $mysqli->close();
    $i = 0;
    while($obj = $result->fetch_object())
    {   	
        $respuesta[$i]["id"] = $id;
        $respuesta[$i]["proyecto"] = $obj->proyecto;
        $respuesta[$i]["recurso"] = $obj->apellido .", ". $obj->nombre;
        $respuesta[$i]["asignacion"] = $obj->disponibilidad;
        $respuesta[$i]["idProyecto"] = $obj->idProyecto;
        $respuesta[$i]["idRecurso"] = $obj->idRecurso;
        $i++;
    }
    echo json_encode($respuesta);
}
elseif ($accion=='listarRelaciones')
{

    $result = $mysqli->query("SELECT pr.idRecProy, p.id as idProyecto, r.id as idRecurso, p.nombre as proyecto, r.apellido, r.nombre, pr.disponibilidad FROM `proyecto_recurso` as pr INNER JOIN proyecto p on p.id = pr.idProyecto INNER JOIN recurso r on r.id = pr.idRecurso");
    $mysqli->close();
    $i = 0;
    while($obj = $result->fetch_object())
    {   	
        $respuesta[$i]["id"] = $obj->idRecProy;
        $respuesta[$i]["proyecto"] = $obj->proyecto;
        $respuesta[$i]["recurso"] = $obj->apellido .", ". $obj->nombre;
        $respuesta[$i]["asignacion"] = $obj->disponibilidad;
        $respuesta[$i]["idProyecto"] = $obj->idProyecto;
        $respuesta[$i]["idRecurso"] = $obj->idRecurso;
        $i++;
    }
    echo json_encode($respuesta);
}
elseif ($accion=='eliminarRelaciones')
{

    $result = $mysqli->query("DELETE FROM `proyecto_recurso` WHERE idRecProy = ".$idRecProy);
    $mysqli->close();
    
    echo json_encode($result);
}


?>