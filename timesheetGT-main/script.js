function editar (id, name, surname, availability, role)
    {
      document.getElementById("name").value = name;
      document.getElementById("surname").value = surname;
      document.getElementById("availability").value = availability;
      document.getElementById("role").value = role;
      document.getElementById("idRec").value = id;
    }
    function del (id)
    {
      const resourceList = document.getElementById("resource-list");
      const $respuesta = document.querySelector("#respuesta");
      
      const datos = {
        idRec : id
      };
      const datosCodificados = JSON.stringify(datos);
      fetch("./eliminarRecursos.php", {
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
  
  function cargarRecursos ()
  {
    const resourceList = document.getElementById("resource-list");
    const $respuesta = document.querySelector("#respuesta");
    fetch("./obtenerRecursos.php", {
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
              $idRecurso = valores.id;
              $nombre = valores.nombre;
              $apellido = valores.apellido;
              $disponibilidad = valores.disponibilidad;
              $rol = valores.rol;
              $respuesta.textContent = 'Datos cargados'; 
    
              const newRow = document.createElement("tr");
              newRow.setAttribute("id", "trID"+$idRecurso);
              newRow.innerHTML = `
                <td id="nametd`+$idRecurso+`">`+$nombre+`</td>
                <td id="surnametd`+$idRecurso+`">`+$apellido+`</td>
                <td id="availabilitytd`+$idRecurso+`">`+$disponibilidad+`</td>
                <td id="roletd`+$idRecurso+`">`+$rol+`</td>
                <td>
                  <button class="edit-btn" id="edit" onclick='javascript:editar(`+$idRecurso+`, "`+$nombre+`", "`+$apellido+`", `+$disponibilidad+`, "`+$rol+`")' tabindex="10">Editar</button>
                  <button class="delete-btn" id="del" onclick='javascript:del(`+$idRecurso+`)' tabindex="10">Eliminar</button>
                </td>
              `;
              resourceList.appendChild(newRow);                               
          } 
          
      }
    });      
  }

document.addEventListener("DOMContentLoaded", function () {    
    cargarRecursos();
    const resourceForm = document.getElementById("resource-form");
    const resourceList = document.getElementById("resource-list");        
 
    resourceForm.addEventListener("submit", function (e) {
      e.preventDefault();
  
      const name = document.getElementById("name").value;
      const surname = document.getElementById("surname").value;
      const availability = document.getElementById("availability").value;
      const role = document.getElementById("role").value;
      const idRec = document.getElementById("idRec").value;

      
      const $name = document.querySelector("#name"), // los 3 input
      $surname = document.querySelector("#surname"),
      $availability = document.querySelector("#availability"),
      $role = document.querySelector("#role"), // El botón que envía el formulario      
      $idRec = document.querySelector("#idRec"),
      $respuesta = document.querySelector("#respuesta"); // el div que muestra mensajes
        
      const datos = {
        name: $name.value,
        surname: $surname.value,
        availability: $availability.value,
        rol: $role.value,
        idRec : $idRec.value
    };
    var $idRecurso = 0;

    $respuesta.textContent = "Cargando...";
    // Armar objeto con datos
      const datosCodificados = JSON.stringify(datos);
      
      fetch("./guardarRecursos.php", {
        method: "POST", // Enviar por POST
        body: datosCodificados, // En el cuerpo van los datos
      })
      .then(respuestaCodificada => respuestaCodificada.json()) // Decodificar JSON que nos responde PHP
      .then(respuestaDecodificada => {
        // Aquí ya tenemos la respuesta lista para ser procesada
        
        if (typeof(respuestaDecodificada) === 'object')
        {
            let valores = Object.values(respuestaDecodificada);            
            $idRecurso = valores[0];
            $nombreEdit = valores[1];
            $apellidoEdit = valores[2];
            $disponibilidadEdit = valores[3];
            $rolEdit = valores[4];
            $respuesta.textContent = 'Editado';        
        }
        else
        {
          $respuesta.textContent = respuestaDecodificada;        
          $idRecurso = respuestaDecodificada;
        }

        if ($idRec.value == 0)
        {
          const newRow = document.createElement("tr");
          newRow.setAttribute("id", "trID"+$idRecurso);
          newRow.innerHTML = `
            <td id="nametd`+$idRecurso+`">${name}</td>
            <td id="surnametd`+$idRecurso+`">${surname}</td>
            <td id="availabilitytd`+$idRecurso+`">${availability}</td>
            <td id="roletd`+$idRecurso+`">${role}</td>
            <td>
              <button class="edit-btn" id="edit" onclick='javascript:editar(`+$idRecurso+`, "${name}", "${surname}", ${availability}, "${role}")' tabindex="10">Editar</button>
              <button class="delete-btn" id="del" onclick='javascript:del(`+$idRecurso+`)' tabindex="10">Eliminar</button>
            </td>
          `;
          resourceList.appendChild(newRow);     
        }
        else
        {
          document.getElementById("idRec").value = 0;
          $nametd = document.querySelector("#nametd"+$idRecurso); // el div que muestra mensajes          
          $surnametd = document.querySelector("#surnametd"+$idRecurso); // el div que muestra mensajes          
          $availabilitytd = document.querySelector("#availabilitytd"+$idRecurso); // el div que muestra mensajes          
          $roletd = document.querySelector("#roletd"+$idRecurso); // el div que muestra mensajes          
          $nametd.textContent = $nombreEdit;
          $surnametd.textContent = $apellidoEdit;
          $availabilitytd.textContent = $disponibilidadEdit;
          $roletd.textContent = $rolEdit;
        }

      });
      resourceForm.reset();  
    });    
});