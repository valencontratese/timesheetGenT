
function editar (id, projectName, projectType, projectComercial, projectManagement, startIdeal, startReal, endIdeal, endReal)
    {
      document.getElementById("idProy").value = id;
      document.getElementById("name").value = projectName;
      document.getElementById("tipo").value = projectType;
      document.getElementById("comercial").value = projectComercial;
      document.getElementById("gestion").value = projectManagement;
      document.getElementById("start-ideal").value = startIdeal;
      document.getElementById("start-real").value = startReal;
      document.getElementById("end-ideal").value = endIdeal;
      document.getElementById("end-real").value = endReal;
    }
    
    function del (id)
    {
      const resourceList = document.getElementById("resource-list");
      const $respuesta = document.querySelector("#respuesta");
      
      const datos = {
        idProy : id
      };
      const datosCodificados = JSON.stringify(datos);
      fetch("./eliminarProyectos.php", {
        method: "POST", // Enviar por POST
        body: datosCodificados, // En el cuerpo van los datos
      })
      .then(respuestaCodificada => respuestaCodificada.json()) // Decodificar JSON que nos responde PHP
      .then(respuestaDecodificada => {
        // Aquí ya tenemos la respuesta lista para ser procesada
        console.log (respuestaDecodificada);
        const $trSelect = document.querySelector("#trID"+id);
        $trSelect.remove();
      });        
    }

function cargarProyectos ()
{
  const resourceList = document.getElementById("resource-list");
  const $respuesta = document.querySelector("#respuesta");
  fetch("./obtenerProyectos.php", {
    method: "POST", // Enviar por POST
    body: '', // En el cuerpo van los datos
  })
  .then(respuestaCodificada => respuestaCodificada.json()) // Decodificar JSON que nos responde PHP
  .then(respuestaDecodificada => {
    // Aquí ya tenemos la respuesta lista para ser procesada
    if (typeof(respuestaDecodificada) === 'object')
    {
      
        for (i = 0; i < respuestaDecodificada.length; i++) {
            valores = respuestaDecodificada[i];              
            $idProyecto = valores.id;
            $projectName = valores.nombre;
            $projectType = valores.tipo;
            $projectComercial = valores.comercial;
            $projectManagement = valores.gestion;
            $startIdeal = valores.fechainicioideal;
            $startReal = valores.fechainicioreal;
            $endIdeal = valores.fechafinideal;
            $endReal = valores.fechafinreal;
            
            $respuesta.textContent = 'Datos cargados'; 
  
            const newRow = document.createElement("tr");
            newRow.setAttribute("id", "trID"+$idProyecto);
            newRow.innerHTML = `
              <td id="projectNametd`+$idProyecto+`">`+$projectName+`</td>
              <td id="projectTypetd`+$idProyecto+`">`+$projectType+`</td>
              <td id="projectComercialtd`+$idProyecto+`">`+$projectComercial+`</td>
              <td id="projectManagementtd`+$idProyecto+`">`+$projectManagement+`</td>
              <td id="startIdealtd`+$idProyecto+`">`+$startIdeal+`</td>
              <td id="startRealtd`+$idProyecto+`">`+$startReal+`</td>
              <td id="endIdealtd`+$idProyecto+`">`+$endIdeal+`</td>
              <td id="endRealtd`+$idProyecto+`">`+$endReal+`</td>
              <td>
              <button class="edit-btn" id="edit" onclick='javascript:editar(`+$idProyecto+`, "`+$projectName+`", "`+$projectType+`", "`+$projectComercial+`", "`+$projectManagement+`", "`+$startIdeal+`", "`+$startReal+`", "`+$endIdeal+`", "`+$endReal+`")'>Editar</button>
              <button class="delete-btn" id="del" onclick='javascript:del(`+$idProyecto+`)'>Eliminar</button>
              </td>
            `;
            resourceList.appendChild(newRow);                               
        } 
        
    }
  });      
}
document.addEventListener("DOMContentLoaded", function () {    
  cargarProyectos();
  const resourceForm = document.getElementById("resource-form");
  const resourceList = document.getElementById("resource-list");        

  resourceForm.addEventListener("submit", function (e) {
    e.preventDefault();
  
      const $projectName = document.getElementById("name").value;
      const $projectType = document.getElementById("tipo").value;
      const $projectComercial = document.getElementById("comercial").value;
      const $projectManagement = document.getElementById("gestion").value;
      const $startIdeal = document.getElementById("start-ideal").value;
      const $startReal = document.getElementById("start-real").value;
      const $endIdeal = document.getElementById("end-ideal").value;
      const $endReal = document.getElementById("end-real").value;
      const $idProy = document.getElementById("idProy").value;
      
      const $respuesta = document.querySelector("#respuesta");


      const datos = {
        name: $projectName,
        tipo: $projectType,
        comercial: $projectComercial,
        gestion: $projectManagement,
        startIdeal: $startIdeal,
        startReal: $startReal,
        endIdeal: $endIdeal,
        endReal: $endReal,
        idProy : $idProy
      };

      var $idProyecto = 0;
      $respuesta.textContent = "Cargando...";
      // Armar objeto con datos
        const datosCodificados = JSON.stringify(datos);
        
        fetch("./guardarProyectos.php", {
          method: "POST", // Enviar por POST
          body: datosCodificados, // En el cuerpo van los datos
        })
        .then(respuestaCodificada => respuestaCodificada.json()) // Decodificar JSON que nos responde PHP
        .then(respuestaDecodificada => {
          // Aquí ya tenemos la respuesta lista para ser procesada
          //console.log(respuestaDecodificada);
          if (typeof(respuestaDecodificada) === 'object')
          {
              let valores = Object.values(respuestaDecodificada);            
              $idProyecto = valores[0];
              $nombreEdit = valores[1];
              $tipoEdit = valores[2];
              $comercialEdit = valores[3];
              $gestionEdit = valores[4];
              $fechainicioidealEdit = valores[5];
              $fechainiciorealEdit = valores[6];
              $fechafinidealEdit = valores[7];
              $fechafinrealEdit = valores[8];

              $respuesta.textContent = 'Editado';        
          }
          else
          {
            $respuesta.textContent = respuestaDecodificada;        
            $idProyecto = respuestaDecodificada;
          }
  
          if ($idProy == 0)
          {
            const newRow = document.createElement("tr");
            newRow.setAttribute("id", "trID"+$idProyecto);
            newRow.innerHTML = `
            <td id="projectNametd`+$idProyecto+`">`+$projectName+`</td>
            <td id="projectTypetd`+$idProyecto+`">`+$projectType+`</td>
            <td id="projectComercialtd`+$idProyecto+`">`+$projectComercial+`</td>
            <td id="projectManagementtd`+$idProyecto+`">`+$projectManagement+`</td>
            <td id="startIdealtd`+$idProyecto+`">`+$startIdeal+`</td>
            <td id="startRealtd`+$idProyecto+`">`+$startReal+`</td>
            <td id="endIdealtd`+$idProyecto+`">`+$endIdeal+`</td>
            <td id="endRealtd`+$idProyecto+`">`+$endReal+`</td>
            <td>
            <button class="edit-btn" id="edit" onclick='javascript:editar(`+$idProyecto+`, "`+$projectName+`", "`+$projectType+`", "`+$projectComercial+`", "`+$projectManagement+`", "`+$startIdeal+`", "`+$startReal+`", "`+$endIdeal+`", "`+$endReal+`")'>Editar</button>
            <button class="delete-btn" id="del" onclick='javascript:del(`+$idProyecto+`)'>Eliminar</button>
            </td>
          `;             

            resourceList.appendChild(newRow);
          }
          else
          {
            document.getElementById("idProy").value = 0;
            
            $projectNametd = document.querySelector("#projectNametd"+$idProyecto); // el div que muestra mensajes          
            $projectTypetd = document.querySelector("#projectTypetd"+$idProyecto); // el div que muestra mensajes          
            $projectComercialtd = document.querySelector("#projectComercialtd"+$idProyecto); // el div que muestra mensajes 
            $projectManagementtd = document.querySelector("#projectManagementtd"+$idProyecto); // el div que muestra mensajes          
            $startIdealtd = document.querySelector("#startIdealtd"+$idProyecto); // el div que muestra mensajes          
            $startRealtd = document.querySelector("#startRealtd"+$idProyecto); // el div que muestra mensajes          
            $endIdealtd = document.querySelector("#endIdealtd"+$idProyecto); // el div que muestra mensajes          
            $endRealtd = document.querySelector("#endRealtd"+$idProyecto); // el div que muestra mensajes          

            

            $projectNametd.textContent = $nombreEdit;
            $projectTypetd.textContent = $tipoEdit;
            $projectComercialtd.textContent = $comercialEdit;
            $projectManagementtd.textContent = $gestionEdit;
            $startIdealtd.textContent = $fechainicioidealEdit;
            $startRealtd.textContent = $fechainicioidealEdit;
            $endIdealtd.textContent = $fechafinidealEdit;
            $endRealtd.textContent = $fechafinrealEdit;
            
          }
  
        });
        resourceForm.reset();
    });
  });