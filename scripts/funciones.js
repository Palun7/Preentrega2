function generadorId(arreglo) {
    if (arreglo.length == 0) {
        return -1;
    }else{
        let id = 0;
        for(let i of arreglo){
            if (i.id > id){
                id = i.id;
            }
        }
        return id;
    }
}

function mostrarUsuarios(arreglo) {
    let mensaje = "";
    for(let i = 0; i < arreglo.length; i++) {
        mensaje += `${arreglo[i].id+1}) ${arreglo[i].nombre}, ${arreglo[i].esAdmin()}\n`;
    }
    return mensaje;
}

function mostrarArticulos(arreglo) {
    let mensaje = "";
    for(let i = 0; i < arreglo.length; i++) {
        mensaje += `${arreglo[i].id+1}) ${arreglo[i].nombre} - $${arreglo[i].getIva()}\n`;
    }
    return mensaje;
}

function iniciarSesion(arreglo) {
    let usuario = prompt("ingrese su usuario.");
    if (usuario && usuario != ""){
        let comparado = arreglo.find((a) => a.getNombre() == usuario);
        if (comparado) {
            let pass = prompt("Ingrese su contraseña.");
            if (comparado.contraseña == pass) {
                alert(`Sesión iniciada. Bienvenido ${comparado.nombre}.`);
                return comparado;
            }else {
                alert("Contraseña incorrecta, intente nuevamente.");
                return false;
            }
        }else{
            alert("Usuario no encontrado, intente nuevamente.");
            return false;
        }
    }else {
        return false;
    }
}

function crearUsuario(id, usuarios) {
    let nombre = prompt("Ingrese su nombre de usuario.");
    for (const i of usuarios) {
        if(i.getNombre() == nombre) {
            return -2
        }
    }
    if (nombre) {
        let contraseña = prompt("Ingrese su contraseña (debe ser de 6 dígitos como mínimo).");
        if(contraseña.length >= 6) {
            let usuario = new Usuario(nombre, contraseña);
            id++;
            usuario.generarId(id);
            usuarios.push(usuario);
            return usuario;
        }else {
            return -1;
        }
    }else {
        return false;
    }
}

function eliminarUsuario(arreglo) {
    let mensaje1 = mostrarUsuarios(arreglo);
    let mensaje2 = "Indique el ID del usuario que quiera eliminar.";
    let opcion = prompt(`${mensaje1}\n${mensaje2}`);
    let usuario_a_eliminar = arreglo.find((a)=>a.id == opcion-1);
    if (usuario_a_eliminar){
        let confirmacion = confirm(`¿Está seguro que quiere eliminar a ${usuario_a_eliminar.nombre}?`);
        if (confirmacion) {
            let eliminar = arreglo.findIndex((a) => a.id == opcion-1);
            if (eliminar != -1) {
                arreglo.splice(eliminar, 1);
                alert(`El usuario ${usuario_a_eliminar.nombre}, ha sido eliminado correctamente.`);
                return usuario_a_eliminar;
            }
        }else {
            return -2;
        }
    }else if (usuario_a_eliminar == undefined) {
        return -1;
    }
}

function adminear(arreglo, usuario) {
    let mensaje1 = mostrarUsuarios(arreglo);
    let mensaje2 = "Indique el ID del usuario al que se le modificarán los atributos de admin.";
    let opcion = prompt(`${mensaje1}\n${mensaje2}`);
    let cambio_admin = arreglo.find((a) => a.id == opcion-1);
    if(cambio_admin != undefined){
        if (cambio_admin.getNombre() == usuario.getNombre()){
            alert("No puedes modificar tu propio estado.");
        }else if (!cambio_admin.isAdmin()) {
            let confirmacion = confirm(`¿Está seguro que quiere darle atributos de admin a ${cambio_admin.nombre}?`);
            if (confirmacion) {
                cambio_admin.hacerAdmin();
                alert(`El usuario ${cambio_admin.getNombre()} ahora es admin.`);
            }else {
                alert("Se canceló la operación.");
            }
        }else if (cambio_admin.isAdmin()) {
            let confirmacion = confirm(`¿Está seguro que quiere sacarle los atributos de admin a ${cambio_admin.nombre}?`);
            if (confirmacion) {
                cambio_admin.hacerAdmin();
                alert(`El usuario ${cambio_admin.getNombre()} ya no es admin.`);
            }else {
                alert("Se canceló la operación.");
            }
        }
    }else {
        alert("Usuario no encontrado.");
    }
}

function crearArticulo(id) {
    let nombre = prompt("Ingrese nombre del artículo.");
    let marca = prompt("Ingrese la marca del artículo.")
    let costo = parseFloat(prompt("Ingrese el costo del artículo."));

    if (nombre && marca && !isNaN(costo) && costo != null) {
        let articulo = new Articulo(nombre, marca, costo);
        id++
        articulo.generarId(id)
        articulos.push(articulo);
        return articulo;
    }else {
        alert("Nombre, marca o costo incorrectos, vuelve a intentar.");
        return false;
    }
}

function eliminarArticulo(arreglo) {
    let mensaje1 =mostrarArticulos(arreglo);
    let mensaje2 = "Indique el nombre del artículo que quiera eliminar.";
    let opcion = prompt(`${mensaje1}\n${mensaje2}`);
    let articulo_a_eliminar = arreglo.find((a)=>a.id == opcion - 1);
    if (articulo_a_eliminar != undefined){
        let confirmacion = confirm(`¿Está seguro que quiere eliminar el artículo ${articulo_a_eliminar.nombre}?`);
        if (confirmacion) {
            eliminar = arreglo.findIndex((a)=> a.id == articulo_a_eliminar.id);
            arreglo.splice(eliminar, 1);
            alert(`El artículo ${articulo_a_eliminar.nombre} ha sido eliminado correctamente.`);
        }else {
            alert("El Artículo no fue eliminado.");
        }
    }else {
        alert("Artículo no encontrado.");
    }
}

function recorrerCarrito(arreglo) {
    let carrito = "";
            for(let i = 0; i < arreglo.length; i++){
                carrito += `${i+1}) ${arreglo[i]}`;
            }
    return carrito;
}

function crearCompra(carrito){
    if (carrito.length == 0) {
        return [];
    }else {
        let compra = [];
        for(let i of carrito) {
            compra.push(`${i.paraCarrito()}\n`);
        }
        return compra;
    }
}

function Carrito(articulos, carrito) {
    salir = true;
    let compra = crearCompra(carrito);
    let total = 0;
    if(carrito.length != 0){
        for(let i of carrito){
            total += i.getIva();
        }
    }
    while (salir) {
        let mensaje = "Carrito vacio.\n\n";
        if(carrito.length != 0){
            mensaje = "Tu carrito tiene:\n";
            for(let i = 0; i < carrito.length; i++) {
                mensaje += `${carrito[i].paraCarrito()}\n`;
            }
        }
        let mensaje1 = "\nArticulos para agregar al carrito:\n";
        mensaje1 += mostrarArticulos(articulos);
        let mensaje2 = "Ingrese el número del articulo que quiere comprar (para finalizar presione cancelar).";
        let opcion = prompt(`${mensaje}${mensaje1}\n${mensaje2}`);
        let articulo = articulos[opcion -1];
        if(opcion == null) {
            salir = false;
            let carrito_final = recorrerCarrito(compra);
            alert(`Tu compra fue:\n${carrito_final}\nMonto a pagar: $${total}.`);
            return carrito;
        }
        else if (articulo) {
            let confirmacion = confirm(`¿Seguro que quiere sumar ${articulo.nombre} al carrito?`);
            if (confirmacion) {
                compra.push(` ${articulo.paraCarrito()}\n`);
                carrito.push(articulo);
                total += articulo.getIva();
            }else {
                alert("no se agregó el artículo.");
            }
        }else {
            alert("Artículo no encontrado.");
        }

    }
}

function descarrear(carrito, articulos) {
    salir = true;
    let compra = crearCompra(carrito);
    let total = 0;
    for (let i of carrito) {
        total += i.getIva();
    }
    while(salir){
        let mensaje = "Carrito vacio.\n\n";
        let mensaje1 = "";
        if(carrito.length != 0){
            mensaje = "Tu carrito tiene:\n";
            for(let i = 0; i < carrito.length; i++) {
                mensaje += `${carrito[i].paraCarrito()}\n`;
            }
            mensaje1 = "\nArticulos a sacar del carrito:\n";
            mensaje1 += mostrarArticulos(articulos);
        }
        let mensaje2 = "Indique el número del producto que quiere sacar (para finalizar presione cancelar).";
        let opcion = prompt(`${mensaje}\n${mensaje1}\n${mensaje2}`);
        let sacar = carrito.find((a)=>a.id == opcion - 1);
        if (opcion == null){
            salir = false;
            let carrito_final = recorrerCarrito(compra);
            alert(`Tu compra es:\n${carrito_final}\nMonto total a abonar: $${total}.`);
            return carrito;
        }else if(sacar){
            let confirmacion = confirm(`¿Seguro que quiere sacar ${sacar.nombre} del carrito?`);
            if(confirmacion){
                eliminar = carrito.findIndex((a)=> a.id == sacar.id);
                carrito.splice(eliminar, 1);
                compra.splice(eliminar, 1);
                total -= sacar.getIva();
            }else {
                alert("No se sacó nada del carrito.");
            }
        }else{
            alert("No se encontró el artículo.");
        }
    }
}

function modificarCarrito(articulos, carrito) {
    let opcion = prompt("Seleccione una de las siguientes opciones.\n1) Agregar productos al carrito.\n2) Sacar productos del carrito.");
    if(opcion == 1){
        carrito = Carrito(articulos, carrito);
        return carrito;
    }else if(opcion == 2){
        carrito = descarrear(carrito, articulos);
        return carrito;
    }else {
        alert("Opción no válida, intente nuevamente.");
        return carrito;
    }
}