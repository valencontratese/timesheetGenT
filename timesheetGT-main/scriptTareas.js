
function editar (id, idProyecto, idRecurso, esfuerzo, nombre, descripcion)
    {
        cargarRecursos(idProyecto, idRecurso);
        document.getElementById("idTarea").value = id;
        document.getElementById("proyecto").disabled = true;
        document.getElementById("proyecto").value = idProyecto;
        document.getElementById("recurso").value = idRecurso;
        document.getElementById("esfuerzo").value = esfuerzo;
        document.getElementById("tarea").value = nombre;
        document.getElementById("descripcion").value = descripcion;

        cargarEsfuerzo(esfuerzo, idRecurso);
    }
    
    function del (id)
    {
      const resourceList = document.getElementById("resource-list");
      const $respuesta = document.querySelector("#respuesta");
      
      const datos = {
          accion : 'eliminarTarea',    
          idTarea: id,
          idRecurso: 0,
          idProyecto: 0,
          nombre: '',
          descripcion : '',
          esfuerzo : 0
        };
      const datosCodificados = JSON.stringify(datos);
      fetch("./classTareas.php", { 
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
function cargarTareas ()
    {
      const resourceList = document.getElementById("resource-list");
      const $respuesta = document.querySelector("#respuesta");
      const datos = {
        accion : 'listarTareas',    
        idTarea: 0,
        idRecurso: 0,
        idProyecto: 0,
        nombre: '',
        descripcion : '',
        esfuerzo : 0
      };
      const datosCodificados = JSON.stringify(datos);
      
      fetch("./classTareas.php", {            
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

                $idTareaForm = valores.id;            
                $proyectoForm = valores.proyecto;
                $recursoForm = valores.recurso;
                $idProyectoForm = valores.idProyecto;
                $idRecursoForm = valores.idRecurso;
                $nombreForm = valores.nombre;                
                $descripcionForm = valores.descripcion;
                $esfuerzoForm = valores.esfuerzo;    

                $respuesta.textContent = 'Datos cargados'; 
      
                const newRow = document.createElement("tr");
                newRow.setAttribute("id", "trID"+$idTareaForm);
                newRow.innerHTML = `
                    <td id="proyectotd`+$idTareaForm+`">`+$proyectoForm+`</td>
                    <td id="recursotd`+$idTareaForm+`">`+$recursoForm+`</td>
                    <td id="nombretd`+$idTareaForm+`">`+$nombreForm+`</td>
                    <td id="esfuerzotd`+$idTareaForm+`">`+$esfuerzoForm+`</td>
                    <td>
                    <button class="edit-btn" id="edit`+$idTareaForm+`" onclick='javascript:editar(`+$idTareaForm+`, "`+$idProyectoForm+`", "`+$idRecursoForm+`", "`+$esfuerzoForm+`", "`+$nombreForm+`", "`+$descripcionForm+`")'>Editar</button>
                    <button class="delete-btn" id="del" onclick='javascript:del(`+$idTareaForm+`)'>Eliminar</button>
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
    idTarea: 0,
    idRecurso: 0,
    idProyecto: 0,
    nombre: '',
    descripcion : '',
    esfuerzo : 0
  };
  const datosCodificados = JSON.stringify(datos);
  fetch("./classTareas.php", {
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

function cargarRecursos (idProyectoEdit, idRecursoEdit)
{
  const resourceList = document.getElementById("recurso");
  if (idProyectoEdit > 0)
  {
    resourceList.innerHTML= "";
    var sIdProyecto = idProyectoEdit;
    var sIdRecurso = idRecursoEdit;
  }
  else if (idProyectoEdit == 0)
  {
    const select = document.getElementById("proyecto");
    var sIdProyecto = select.options[select.selectedIndex].value;
    resourceList.innerHTML= "<option></option>";
    var sIdRecurso = 0;
  }

  const $respuesta = document.querySelector("#respuesta");
  const datos = {
    accion : 'listarRecursos',
    idTarea: 0,
    idRecurso: sIdRecurso,
    idProyecto: sIdProyecto,
    nombre: '',
    descripcion : '',
    esfuerzo : 0
  };
  const datosCodificados = JSON.stringify(datos);
  fetch("./classTareas.php", {
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

function cargarEsfuerzo (esfuerzoEdit, recursoEdit)
{
    const resourceList = document.getElementById("esfuerzo");
    const $respuesta = document.querySelector("#respuesta");
    
    if (recursoEdit==0)
    {    
      const select = document.getElementById("recurso");      
      const selectPro = document.getElementById("proyecto");      

      var sIdRecurso = select.options[select.selectedIndex].value;
      var sIdProyecto = selectPro.options[selectPro.selectedIndex].value;
    }
    else
    {
        var sIdRecurso = recursoEdit;
        const selectPro = document.getElementById("proyecto");   
        var sIdProyecto = selectPro.options[selectPro.selectedIndex].value;   
    }
    
    const datos = {
        accion : 'cargarEsfuerzo',
        idTarea: 0,
        idRecurso: sIdRecurso,
        idProyecto: sIdProyecto,
        nombre: '',
        descripcion : '',
        esfuerzo : 0
    };
    
    const datosCodificados = JSON.stringify(datos);
    
    fetch("./classTareas.php", {
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
            $esfuerzo = valores.esfuerzo;            
            const newRow = document.createElement("option");
            newRow.innerHTML = $esfuerzo;

            if (esfuerzoEdit==$esfuerzo)
            {             
                newRow.selected = true;
            }
            newRow.setAttribute("value", $esfuerzo);            
            resourceList.add(newRow);
        } 
        $respuesta.textContent = 'Datos cargados'; 
        
    }
    });      
}


document.addEventListener("DOMContentLoaded", function () {    
    cargarTareas();
    cargarProyectos();
    //cargarRecursos(0);
    const resourceForm = document.getElementById("resource-form");
    const resourceList = document.getElementById("resource-list");        

  resourceForm.addEventListener("submit", function (e) {
    e.preventDefault();
  
      const $proyecto = document.getElementById("proyecto").value;
      const $recurso = document.getElementById("recurso").value;
      const $nombre = document.getElementById("tarea").value;
      const $descripcion = document.getElementById("descripcion").value;
      const $esfuerzo = document.getElementById("esfuerzo").value;
      const $idTarea = document.getElementById("idTarea").value;
      
      const $respuesta = document.querySelector("#respuesta");

      const datos = {
        accion: 'insert',
        idTarea: $idTarea,
        idRecurso: $recurso,
        idProyecto: $proyecto,
        nombre: $nombre,
        descripcion : $descripcion,
        esfuerzo : $esfuerzo
      };
      
      $respuesta.textContent = "Cargando...";
      // Armar objeto con datos
        const datosCodificados = JSON.stringify(datos);
        
        fetch("./classTareas.php", {
          method: "POST", // Enviar por POST
          body: datosCodificados, // En el cuerpo van los datos
        })
        .then(respuestaCodificada => respuestaCodificada.json()) // Decodificar JSON que nos responde PHP
        .then(respuestaDecodificada => {
          // Aquí ya tenemos la respuesta lista para ser procesada
            let valores = Object.values(respuestaDecodificada);            
            $idTareaForm = valores[0].id;            
            $proyectoForm = valores[0].proyecto;
            $recursoForm = valores[0].recurso;
            $idProyectoForm = valores[0].idProyecto;
            $idRecursoForm = valores[0].idRecurso;
            $nombreForm = valores[0].nombre;                
            $descripcionForm = valores[0].descripcion;
            $esfuerzoForm = valores[0].esfuerzo;                
            
            $respuesta.textContent = 'Datos cargados';   
            

          if ($idTarea == 0)
          {
                     
            const newRow = document.createElement("tr");
            newRow.setAttribute("id", "trID"+$idTareaForm);
            newRow.innerHTML = `
                <td id="proyectotd`+$idTareaForm+`">`+$proyectoForm+`</td>
                <td id="recursotd`+$idTareaForm+`">`+$recursoForm+`</td>
                <td id="nombretd`+$idTareaForm+`">`+$nombreForm+`</td>
                <td id="esfuerzotd`+$idTareaForm+`">`+$esfuerzoForm+`</td>
                <td>
                <button class="edit-btn" id="edit`+$idTareaForm+`" onclick='javascript:editar(`+$idTareaForm+`, "`+$idProyectoForm+`", "`+$idRecursoForm+`", "`+$esfuerzoForm+`", "`+$nombreForm+`", "`+$descripcionForm+`")'>Editar</button>
                <button class="delete-btn" id="del" onclick='javascript:del(`+$idTareaForm+`)'>Eliminar</button>
                </td>
            `; 
            resourceList.appendChild(newRow);
          }
          else
          {
            document.getElementById("idTarea").value = 0;
            
            $proyectotd = document.querySelector("#proyectotd"+$idTareaForm);
            $recursotd = document.querySelector("#recursotd"+$idTareaForm);
            $nombretd = document.querySelector("#nombretd"+$idTareaForm); 
            $esfuerzotd = document.querySelector("#esfuerzotd"+$idTareaForm); 
            $editBtn = document.querySelector("#edit"+$idTareaForm); 
            $editBtn.setAttribute('onclick', 'javascript:editar('+$idTareaForm+', "'+$idProyectoForm+'", "'+$idRecursoForm+'", "'+$esfuerzoForm+'", "'+$nombreForm+'", "'+$descripcionForm+'")');
        
            $proyectotd.textContent = $proyectoForm;
            $recursotd.textContent = $recursoForm;
            $esfuerzotd.textContent = $esfuerzoForm;
            $nombretd.textContent = $nombreForm;
            
          }
  
        });
        document.getElementById("tarea").value = '';
        document.getElementById("descripcion").value = '';
        const recursoList = document.getElementById("recurso");
        recursoList.innerHTML= "";
        const esfuerzoList = document.getElementById("esfuerzo");
        esfuerzoList.innerHTML= "";
      
        document.getElementById("proyecto").disabled = false;
        resourceForm.reset();
        
        
        
    });
  });