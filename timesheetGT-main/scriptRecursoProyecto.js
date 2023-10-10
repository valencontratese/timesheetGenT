
function editar (id, idProyecto, idRecurso, asignacion)
    {
        cargarRecursos(idRecurso);
        document.getElementById("idRecProy").value = id;
        document.getElementById("proyecto").disabled = true;
        
        document.getElementById("recurso").disabled = true;
        document.getElementById("proyecto").value = idProyecto;
        document.getElementById("recurso").value = idRecurso;
        cargarAsignacion(asignacion, idRecurso);
    }
    
    function del (id)
    {
      const resourceList = document.getElementById("resource-list");
      const $respuesta = document.querySelector("#respuesta");
      
      const datos = {
        accion : 'eliminarRelaciones',
        idRecurso: 0,
        idProyecto: 0,
        asignacion: 0,
        idRecProy : id
      };
      const datosCodificados = JSON.stringify(datos);
      fetch("./classRecursoProyectos.php", { 
        method: "POST", // Enviar por POST
        body: datosCodificados, // En el cuerpo van los datos
      })
      .then(respuestaCodificada => respuestaCodificada.json()) // Decodificar JSON que nos responde PHP
      .then(respuestaDecodificada => {
        // Aquí ya tenemos la respuesta lista para ser procesada        
        const $trSelect = document.querySelector("#trID"+id);
        $trSelect.remove();
      });        
    }
function cargarRelaciones ()
    {
      const resourceList = document.getElementById("resource-list");
      const $respuesta = document.querySelector("#respuesta");
      const datos = {
        accion : 'listarRelaciones',
        idRecurso: 0,
        idProyecto: 0,
        asignacion: 0,
        idRecProy : 0
      };
      const datosCodificados = JSON.stringify(datos);
      fetch("./classRecursoProyectos.php", {            
        method: "POST", // Enviar por POST
        body: datosCodificados, // En el cuerpo van los datos
      })
      .then(respuestaCodificada => respuestaCodificada.json()) // Decodificar JSON que nos responde PHP
      .then(respuestaDecodificada => {
        // Aquí ya tenemos la respuesta lista para ser procesada
        if (typeof(respuestaDecodificada) === 'object')
        {
          
            for (i = 0; i < respuestaDecodificada.length; i++) {
                valores = respuestaDecodificada[i]; 

                $idRecProy = valores.id;                
                $proyecto = valores.proyecto;
                $recurso = valores.recurso;
                $asignacion = valores.asignacion;                
                $idProyecto = valores.idProyecto;
                $idRecurso = valores.idRecurso;                
                
                $respuesta.textContent = 'Datos cargados'; 
      
                const newRow = document.createElement("tr");
                newRow.setAttribute("id", "trID"+$idRecProy);
                newRow.innerHTML = `
                  <td id="proyectotd`+$idRecProy+`">`+$proyecto+`</td>
                  <td id="recursotd`+$idRecProy+`">`+$recurso+`</td>
                  <td id="asignaciontd`+$idRecProy+`">`+$asignacion+`</td>
                  <td>
                  <button class="edit-btn" id="edit`+$idRecProy+`" onclick='javascript:editar(`+$idRecProy+`, "`+$idProyecto+`", "`+$idRecurso+`", "`+$asignacion+`")'>Editar</button>
                  <button class="delete-btn" id="del" onclick='javascript:del(`+$idRecProy+`)'>Eliminar</button>
                  </td>
                `;
                resourceList.appendChild(newRow);                               
            } 
            
        }
      });      
    }
function cargarProyectos ()
{
  const resourceList = document.getElementById("proyecto");
  const $respuesta = document.querySelector("#respuesta");
  const datos = {
    accion : 'listarProyectos',
    idRecurso: 0,
    idProyecto: 0,        
    asignacion: 0,
    idRecProy : 0
  };
  const datosCodificados = JSON.stringify(datos);
  fetch("./classRecursoProyectos.php", {
    method: "POST", // Enviar por POST
    body: datosCodificados, // En el cuerpo van los datos
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
  
            const newRow = document.createElement("option");
            newRow.innerHTML = $projectName;
            newRow.setAttribute("value", $idProyecto);            
            resourceList.add(newRow);
        } 
        $respuesta.textContent = 'Datos cargados'; 
        
    }
  });      
}

function cargarRecursos (idRecursoEdit)
{
  const resourceList = document.getElementById("recurso");
  if (idRecursoEdit > 0)
  {
    resourceList.innerHTML= "";
  }
  else if (idRecursoEdit == 0)
  {
    resourceList.innerHTML= "<option></option>";
  }
  
  const $respuesta = document.querySelector("#respuesta");
  const datos = {
    accion : 'listarRecursos',
    idRecurso: idRecursoEdit,
    idProyecto: 0,        
    asignacion: 0,
    idRecProy : 0
  };
  const datosCodificados = JSON.stringify(datos);
  fetch("./classRecursoProyectos.php", {
    method: "POST", // Enviar por POST
    body: datosCodificados, // En el cuerpo van los datos
  })
  .then(respuestaCodificada => respuestaCodificada.json()) // Decodificar JSON que nos responde PHP
  .then(respuestaDecodificada => {
    // Aquí ya tenemos la respuesta lista para ser procesada    
    if (typeof(respuestaDecodificada) === 'object')
    {
      
        for (i = 0; i < respuestaDecodificada.length; i++) 
        {
            valores = respuestaDecodificada[i];              
            $idRecurso = valores.id;
            $recursoName = valores.nombre;
  
            const newRow = document.createElement("option");
            newRow.innerHTML = $recursoName;
            newRow.setAttribute("value", $idRecurso);            
            resourceList.add(newRow);
        } 
        $respuesta.textContent = 'Datos cargados'; 
        
    }
  });      
}

function cargarAsignacion (asignacionEdit, recursoEdit)
{
    const resourceList = document.getElementById("asignacion");
    const $respuesta = document.querySelector("#respuesta");
    
    if (recursoEdit==0)
    {    
        const select = document.getElementById("recurso");      
        var sIdRecurso = select.options[select.selectedIndex].value;
    }
    else
    {
        var sIdRecurso = recursoEdit;
    }

    
    const datos = {
        accion : 'cargarAsignacion',
        idRecurso : sIdRecurso,
        idProyecto: 0,        
        asignacion: asignacionEdit,
        idRecProy : 0
    };
    
    const datosCodificados = JSON.stringify(datos);
    
    fetch("./classRecursoProyectos.php", {
    method: "POST", // Enviar por POST
    body: datosCodificados, // En el cuerpo van los datos
    })
    .then(respuestaCodificada => respuestaCodificada.json()) // Decodificar JSON que nos responde PHP
    .then(respuestaDecodificada => {
    // Aquí ya tenemos la respuesta lista para ser procesada
    if (typeof(respuestaDecodificada) === 'object')
    {
        resourceList.innerHTML= "";
        for (i = 0; i < respuestaDecodificada.length; i++) 
        {
            valores = respuestaDecodificada[i];              
            $asignacion = valores.asignacion;            
            const newRow = document.createElement("option");
            newRow.innerHTML = $asignacion;

            if (asignacionEdit==$asignacion)
            {             
                newRow.selected = true;
            }
            newRow.setAttribute("value", $asignacion);            
            resourceList.add(newRow);
        } 
        $respuesta.textContent = 'Datos cargados'; 
        
    }
    });      
}


document.addEventListener("DOMContentLoaded", function () {    
    cargarRelaciones();
    cargarProyectos();
    cargarRecursos(0);
    const resourceForm = document.getElementById("resource-form");
    const resourceList = document.getElementById("resource-list");        

  resourceForm.addEventListener("submit", function (e) {
    e.preventDefault();
  
      const $proyecto = document.getElementById("proyecto").value;
      const $recurso = document.getElementById("recurso").value;
      const $asignacion = document.getElementById("asignacion").value;
      const $idRecProy = document.getElementById("idRecProy").value;
      
      const $respuesta = document.querySelector("#respuesta");


      const datos = {
        accion: 'insert',
        idRecurso: $recurso,
        idProyecto: $proyecto,        
        asignacion: $asignacion,
        idRecProy : $idRecProy
      };

      var $idRecProyecto = 0;
      $respuesta.textContent = "Cargando...";
      // Armar objeto con datos
        const datosCodificados = JSON.stringify(datos);
        
        fetch("./classRecursoProyectos.php", {
          method: "POST", // Enviar por POST
          body: datosCodificados, // En el cuerpo van los datos
        })
        .then(respuestaCodificada => respuestaCodificada.json()) // Decodificar JSON que nos responde PHP
        .then(respuestaDecodificada => {
          // Aquí ya tenemos la respuesta lista para ser procesada
            let valores = Object.values(respuestaDecodificada);            
            $idRecProyForm = valores[0].id;            
            $proyectoForm = valores[0].proyecto;
            $recursoForm = valores[0].recurso;
            $asignacionForm = valores[0].asignacion;                
            $idProyectoForm = valores[0].idProyecto;
            $idRecursoForm = valores[0].idRecurso;                
            
            $respuesta.textContent = 'Datos cargados';   
            

          if ($idRecProy == 0)
          {
                     
            const newRow = document.createElement("tr");
            newRow.setAttribute("id", "trID"+$idRecProyForm);
            newRow.innerHTML = `
                <td id="proyectotd`+$idRecProy+`">`+$proyectoForm+`</td>
                <td id="recursotd`+$idRecProy+`">`+$recursoForm+`</td>
                <td id="asignaciontd`+$idRecProy+`">`+$asignacionForm+`</td>
                <td>
                <button class="edit-btn" id="edit`+$idRecProy+`" onclick='javascript:editar(`+$idRecProyForm+`, "`+$idProyectoForm+`", "`+$idRecursoForm+`", "`+$asignacionForm+`")'>Editar</button>
                <button class="delete-btn" id="del" onclick='javascript:del(`+$idRecProyForm+`)'>Eliminar</button>
                </td>
            `; 
            resourceList.appendChild(newRow);
          }
          else
          {
            document.getElementById("idRecProy").value = 0;
            
            $proyectotd = document.querySelector("#proyectotd"+$idRecProyForm);
            $recursotd = document.querySelector("#recursotd"+$idRecProyForm);
            $asignaciontd = document.querySelector("#asignaciontd"+$idRecProyForm); 
            $editBtn = document.querySelector("#edit"+$idRecProyForm); 
            $editBtn.setAttribute('onclick', 'javascript:editar('+$idRecProyForm+', '+$idProyectoForm+', '+$idRecursoForm+', '+$asignacionForm+')');
        
            $proyectotd.textContent = $proyectoForm;
            $recursotd.textContent = $recursoForm;
            $asignaciontd.textContent = $asignacionForm;
            
          }
  
        });
        resourceForm.reset();
        cargarRecursos(0);
        document.getElementById("proyecto").disabled = false;
        document.getElementById("recurso").disabled = false;
    });
  });