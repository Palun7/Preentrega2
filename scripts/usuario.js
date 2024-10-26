class Usuario {

    constructor(nombre, contraseña) {

        this.nombre = nombre;
        this.contraseña = contraseña;
        this.id = null;
        this.admin = false;
    }

    generarId(id) {

        return this.id = id;
    }

    getNombre() {

        return this.nombre;
    }

    getpass() {

        return this.contraseña;
    }

    getDescripcion() {

        return `Id: ${this.id}, Nombre: ${this.nombre}, ${this.esAdmin()}.`;
    }

    isAdmin() {

        return this.admin
    }

    esAdmin() {
        if(this.admin){
            return "Es admin"
        }else {
            return "No es admin"
        }
    }

    hacerAdmin() {

        this.admin = true;
    }

    deshacerAdmin() {

        this.admin = false;
    }
}

const usuarios = [];

let palun = new Usuario("Palun", "123456");
palun.hacerAdmin();
palun.generarId(0);
let anita = new Usuario("Anita", "123456");
anita.generarId(1);
usuarios.push(palun, anita);