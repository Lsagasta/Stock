id = 0;
totalUnidades = 0;
totalValor = 0;

const TfyOK = () => {
  Toastify({
    text: `Se agregaron ${cantidad.value} ${producto.value} a la base `,
    duration: 3000,

    newWindow: true,
    close: true,
    gravity: "top", // `top` or `bottom`
    position: "center", // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
    style: {
      background: "linear-gradient(to right, #00b09b, #96c93d)",
    },
    onClick: function () {}, // Callback after click
  }).showToast();
};

function capturar() {
  id++;
  function NuevoProducto(id, producto, marca, modelo, color, precio, cantidad) {
    this.id = id;
    this.producto = producto;
    this.marca = marca;
    this.modelo = modelo;
    this.color = color;
    this.precio = precio;
    this.cantidad = cantidad;
  }
  var productoCapturado = document.getElementById("producto").value;
  var marcaCapturado = document.getElementById("marca").value;
  var modeloCapturado = document.getElementById("modelo").value;
  var colorCapturado = document.getElementById("color").value;
  var precioCapturado = document.getElementById("precio").value;
  var cantidadCapturado = document.getElementById("cantidad").value;
  var idGenerado = id;

  var valor = cantidadCapturado * precioCapturado;
  totalValor = Number(totalValor) + Number(valor);
  totalUnidades = Number(totalUnidades) + Number(cantidadCapturado);

  document.getElementById("StockCantidad").innerText = totalUnidades;
  document.getElementById("StockValor").innerText = "$" + totalValor;

  console.log("id:" + id);
  console.log("valor:" + valor);
  console.log("total Unidades:" + totalUnidades);
  console.log("Total Valor " + totalValor);

  nuevoProducto = new NuevoProducto(
    idGenerado,
    productoCapturado,
    marcaCapturado,
    modeloCapturado,
    colorCapturado,
    precioCapturado,
    cantidadCapturado
  );
  agregaraBase();
}

var BaseProductos = [];

function agregaraBase() {
  localStorage.setItem("TotalValor", totalValor);
  localStorage.setItem("TotalCant", totalUnidades);
  localStorage.setItem("id", id);

  let BaseLocal = JSON.parse(localStorage.getItem("data")) || [];
  BaseLocal.push(nuevoProducto);
  let BaseLocalJSON = JSON.stringify(BaseLocal);
  localStorage.setItem("data", BaseLocalJSON);

  BaseProductos.push(nuevoProducto);
  TfyOK();

  document.getElementById("tabla").innerHTML +=
    "<tbody><tr> <td>" +
    nuevoProducto.id +
    "</td><td>" +
    nuevoProducto.producto +
    "</td><td>" +
    nuevoProducto.marca +
    "</td><td>" +
    nuevoProducto.modelo +
    "</td> <td>" +
    nuevoProducto.color +
    "</td>  <td>" +
    "$" +
    nuevoProducto.precio +
    "</td> <td>" +
    nuevoProducto.cantidad +
    "</td></tr></tbody>";
}

document.addEventListener("DOMContentLoaded", function (event) {
  totalValor = localStorage.getItem("TotalValor", totalValor) || 0;
  totalUnidades = localStorage.getItem("TotalCant", totalUnidades) || 0;
  document.getElementById("StockCantidad").innerText = totalUnidades;
  document.getElementById("StockValor").innerText = "$" + totalValor;
  id = localStorage.getItem("id", id);

  let transactionObjet = JSON.parse(localStorage.getItem("data"));
  transactionObjet.forEach((element) => {
    document.getElementById("tabla").innerHTML +=
      "<tbody><tr> <td>" +
      element.id +
      "</td><td>" +
      element.producto +
      "</td><td>" +
      element.marca +
      "</td><td>" +
      element.modelo +
      "</td> <td>" +
      element.color +
      "</td>  <td>" +
      "$" +
      element.precio +
      "</td> <td>" +
      element.cantidad +
      "</td></tr></tbody>";
  });
});
