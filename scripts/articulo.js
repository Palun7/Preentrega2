class Articulo {

    constructor(nombre, marca, costo) {

        this.nombre = nombre;
        this.marca = marca;
        this.costo = costo;
        this.id = null
    }

    generarId(id) {

        return this.id = id;
    }

    getIva() {

        return this.costo * 1.21;
    }

    getNombre() {

        return this.nombre;
    }

    getDescripcion() {

        return `Articulo: ${this.nombre}- Marca: ${this.marca} - $${this.getIva()}.`;
    }

    paraCarrito() {

        return `${this.nombre} - ${this.marca} $${this.getIva()}`;
    }
}

const articulos = [];

let coca = new Articulo("Coca", "Coca-Cola", 2300);
let lays = new Articulo("Lays", "Pepsico", 1900);
let block = new Articulo("Block", "Cofler", 1200);
articulos.push(coca, lays, block);