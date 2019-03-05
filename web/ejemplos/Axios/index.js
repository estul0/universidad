const axios = require("axios");

const urlClientes = "https://gist.githubusercontent.com/josejbocanegra/986182ce2dd3e6246adcf960f9cda061/raw/af2ff371e3d7c25f9fa84e79178bd38a6f642488/clientes.json";
const urlProveedores = "https://gist.githubusercontent.com/josejbocanegra/d3b26f97573a823a9d0df4ec68fef45f/raw/66440575649e007a9770bcd480badcbbc6a41ba7/proveedores.json";

function getClientes() {
  return axios.get(urlClientes);
}

function getProveedores() {
  return axios.get(urlProveedores);
}

axios.all([getClientes(), getProveedores()])
  .then(axios.spread(function (clientes, proveedores) {
    console.log("Clientes:", clientes.data);
    console.log("Proveedores;", proveedores.data);
}));