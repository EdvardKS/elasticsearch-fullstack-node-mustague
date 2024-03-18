// document.addEventListener("DOMContentLoaded", function () {
//   const URL_BASE = "http://localhost:/9200/productos-edu/"; // Reemplaza con la URL de tu servidor Elasticsearch

//   let tipoconsulta = document.getElementById("tipoconsulta");
//   let resultado = document.getElementById("resultado");

//   // Función para realizar una solicitud GET
//   async function obtenerDatos(endpoint) {
//     console.log(URL_BASE+endpoint);
//     try {
//       const respuesta = await fetch(`${URL_BASE}/${endpoint}`, {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//         },
//       });

//       const datos = await respuesta.json();
//       return datos;
//     } catch (error) {
//       console.error("Error en la solicitud GET:", error);
//     }
//   }

//   // Función para realizar una solicitud PUT o POST
//   async function enviarDatos(endpoint, metodo, datosCuerpo) {
//     try {
//       const respuesta = await fetch(`${URL_BASE}/${endpoint}`, {
//         method: metodo,
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(datosCuerpo),
//       });

//       const datos = await respuesta.json();
//       return datos;
//     } catch (error) {
//       console.error(`Error en la solicitud ${metodo}:`, error);
//     }
//   }

//   // Función para realizar una solicitud DELETE
//   async function eliminarDatos(endpoint) {
//     try {
//       const respuesta = await fetch(`${URL_BASE}/${endpoint}`, {
//         method: "DELETE",
//         headers: {
//           "Content-Type": "application/json",
//         },
//       });

//       const datos = await respuesta.json();
//       return datos;
//     } catch (error) {
//       console.error("Error en la solicitud DELETE:", error);
//     }
//   }

//   // Ejemplo de solicitud GET
//   // const obtenerResultado = async () => {
//   //   const resultado = await obtenerDatos("_search");
//   //   console.log("Resultado de la consulta GET:", resultado);
//   // };
//   // obtenerResultado();

//   // Ejemplo de solicitud PUT
//   const enviarDatosPut = async () => {
//     const resultadoPut = await enviarDatos("productos/_doc/1", "PUT", {
//       sku: 101,
//       nombre: "nuevo_producto",
//       descripcion: "Descripción del nuevo producto.",
//       precio: 199.99,
//     });
//     console.log("Resultado de la solicitud PUT:", resultadoPut);
//   };
//   // enviarDatosPut();

//   // Ejemplo de solicitud DELETE
//   const eliminarResultado = async () => {
//     const resultadoEliminar = await eliminarDatos("productos/_doc/1");
//     console.log("Resultado de la solicitud DELETE:", resultadoEliminar);
//   };
//   // eliminarResultado();

//   document.getElementById("boton-get").addEventListener("click", function () {
//     document.getElementById("tipoconsulta").innerHTML = "GET";
//     cambiarContenido("Listo para la solicitud GET...");
//     esconderFormulario();
//     verFormulario("formulario-get");

//     // Llama a tu función de solicitud GET aquí
//     // Por ejemplo: fetchData('productos/_search');
//   });

//   document.getElementById("boton-put").addEventListener("click", function () {
//     document.getElementById("tipoconsulta").innerHTML = "POST";
//     cambiarContenido("Listo para la solicitud POST...");
//     esconderFormulario();
//     verFormulario("formulario-post");

//     // Llama a tu función de solicitud PUT aquí
//     // Por ejemplo: sendData('productos/_doc/1', 'PUT', { sku: 101, nombre: 'nuevo_producto', ... });
//   });

//   // document.getElementById("boton-edit").addEventListener("click", function () {
//   //   document.getElementById("tipoconsulta").innerHTML = "EDIT";
//   //   cambiarContenido("Listo para la solicitud EDIT...");
//   //   esconderFormulario();
//   //   verFormulario("formulario-edit");

//   //   // Llama a tu función de solicitud EDIT aquí
//   //   // Por ejemplo: sendData('productos/_doc/1', 'EDIT', { sku: 101, nombre: 'nuevo_nombre', ... });
//   // });

//   // document.getElementById("boton-delete").addEventListener("click", function () {
//   //     document.getElementById("tipoconsulta").innerText = "DELETE";
//   //     cambiarContenido("Listo para la solicitud DELETE...");
//   //     esconderFormulario();
//   //     verFormulario("formulario-delete");

//   //     // Llama a tu función de solicitud DELETE aquí
//   //     // Por ejemplo: deleteData('productos/_doc/1');
//   //   });
// });

// function cambiarContenido(nuevoContenido) {
//   document.getElementById("resultado").innerHTML = nuevoContenido;
// }
// function esconderFormulario() {
//   let formularios = document.querySelectorAll(".form-scope");

//   formularios.forEach(function (formulario) {
//     formulario.classList.add("d-none");
//   });
// }
// function verFormulario(frm) {
//   let elemento = document.getElementById(frm);
//   elemento.classList.remove("d-none");
//   elemento.classList.add("d-block");
// }
