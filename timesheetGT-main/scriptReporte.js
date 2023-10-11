function cargarReporte ()
{
  const resourceList = document.getElementById("resource-list");
  const $respuesta = document.querySelector("#respuesta");
  fetch("./obtenerReporte.php", {
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
            
            $proyecto = valores.proyecto;
            $recurso = valores.recurso;
            $horas = valores.horas;            
            
            $respuesta.textContent = 'Datos cargados'; 
  
            const newRow = document.createElement("tr");            
            newRow.innerHTML = `
                <td>`+$proyecto+`</td>
                <td>`+$recurso+`</td>
                <td>`+$horas+`</td>              
            `;
            resourceList.appendChild(newRow);                               
        } 
        
    }
  });      
}
document.addEventListener("DOMContentLoaded", function () {    
    cargarReporte();
});