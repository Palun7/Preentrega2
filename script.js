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
        mensaje += `${i+1}) ${arreglo[i].nombre}\n`;
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
    if (usuario_a_eliminar != undefined){
        let confirmacion = confirm(`¿Está seguro que quiere eliminar a ${usuario_a_eliminar.nombre}?`);
        if (confirmacion) {
            let eliminar = arreglo.findIndex((a) => a.id == opcion-1);
            if (eliminar != -1) {
                arreglo.splice(eliminar, 1);
                alert(`El usuario ${usuario_a_eliminar.nombre}, ha sido eliminado correctamente.`);
                return usuario_a_eliminar;
            }
        }else {
            alert("El número ingresado es incorrecto.");
        }
    }else {
        alert("Usuario no encontrado.");
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

function crearArticulo() {
    let nombre = prompt("Ingrese nombre del artículo.");
    let marca = prompt("Ingrese la marca del artículo.")
    let costo = parseFloat(prompt("Ingrese el costo del artículo."));

    if (nombre && marca && !isNaN(costo) && costo != null) {
        let articulo = new Articulo(nombre, marca, costo);
        articulos.push(articulo);
        return articulo;
    }else {
        alert("Nombre, marca o costo incorrectos, vuelve a intentar.");
        return false;
    }
}

function eliminarArticulo(arreglo) {
    let mensaje1 =mostrarUsuarios(arreglo);
    let mensaje2 = "Indique el nombre del artículo que quiera eliminar.";
    let opcion = prompt(`${mensaje1}\n${mensaje2}`);
    let articulo_a_eliminar = arreglo[opcion-1];
    if (articulo_a_eliminar != undefined){
        let confirmacion = confirm(`¿Está seguro que quiere eliminar el artículo ${articulo_a_eliminar.nombre}?`);
        if (confirmacion) {
            arreglo.splice(articulo_a_eliminar, 1);
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

function carrito(articulos) {
    salir = true;
    let compra = [];
    let total = 0
    while (salir) {
        let mensaje1 = "";
        for (let i = 0; i < articulos.length; i++){
            mensaje1 += `${i+1}) ${articulos[i].paraCarrito()}\n`;
        }
        let mensaje2 = "Ingrese el número del articulo que quiere comprar. (para finalizar presione cancelar).";
        let opcion = prompt(`${mensaje1}\n${mensaje2}`);
        let articulo = articulos[opcion -1];
        if(opcion == null) {
            salir = false;
            let carrito_final = recorrerCarrito(compra);
            alert(`Tu compra fue:\n${carrito_final}\nMonto a pagar: $${total}.`);
        }
        else if (articulo) {
            let confirmacion = confirm(`¿Seguro que quiere sumar ${articulo.nombre} al carrito?`);
            if (confirmacion) {
                compra.push(` ${articulo.paraCarrito()}\n`);
                total += articulo.getIva();
                let carrito_parcial = recorrerCarrito(compra);
                alert(`Tu carrito tiene:\n${carrito_parcial}\nMonto total hasta ahora: $${total}.`);
            }else {
                alert("no se agregó el artículo.");
            }
        }else {
            alert("Artículo no encontrado.");
        }

    }
}


function plataforma(usuarios, articulos){
    let salir = true;
    let usuario_while = null;
    while (salir) {
        if (usuario_while != null) {
            if (usuario_while.isAdmin()) {
                mensaje = `Hola ${usuario_while.nombre}, selecciona una de las siguientes opciones para continuar:\n1) Cerrar sesión.\n2) Crear usuario.\n3) Eliminar usuario.\n4) Hacer o deshacer admin.\n5) Crear artículo.\n6) Eliminar artículo.\n7) Ingresar al carrito.\n8) Salir.`;
            }else{
                mensaje = `Hola ${usuario_while.nombre}, selecciona una de las siguientes opciones para continuar:\n1) Cerrar sesión.\n2) Ingresar al carrito.\n3) Salir.`
            }
        }else {
            mensaje = "Bienvenido/a a la plataforma, seleccione una de las siguientes opciones para continuar:\n1) Iniciar sesión.\n2) Crear usuario.\n3) Salir.";
        }
        let opcion = parseInt(prompt(mensaje));

        switch (opcion) {
            case 1:
                if (usuario_while != null) {
                    let confirmacion = confirm(`¿Seguro que deseas cerrar sesión ${usuario_while.nombre}?`);
                    if(confirmacion){
                        alert("Sesión cerrada con éxito.");
                        usuario_while = null;
                        break;
                    }else {
                        alert("La sesión continua iniciada.")
                        break;
                    }
                }else {
                    usuario_while = iniciarSesion(usuarios);
                    if(usuario_while) {
                        console.log("Usuario: ", usuario_while);
                        break;
                    }else {
                        usuario_while = null;
                        break;
                    }
                }

            case 2:
                if (usuario_while != null && usuario_while.isAdmin()) {
                    alert("Debes cerrar sesión para crear un usuario nuevo.");
                    break;
                }else if (usuario_while != null && !usuario_while.isAdmin()){
                    carrito(articulos);
                    break;
                }else {
                    let id = generadorId(usuarios);
                    usuario_while = crearUsuario(id, usuarios);
                    if (usuario_while && usuario_while != -1 && usuario_while != -2){
                        console.log("Usuarios: ", usuarios);
                        alert(`El usuario ${usuario_while.nombre} fue creado con exito y ya esta iniciada la sesión.`);
                        break;
                    }else if(usuario_while == -1){
                        alert("Contraseña muy corta, intente nuevamente.");
                        usuario_while = null;
                        break;
                    }else if (usuario_while == -2){
                        alert("Ese nombre ya esta en uso, intenta nuevamente con otro nombre.");
                        usuario_while = null;
                        break;
                    }else{
                        alert("Nombre incorrecto, vuelve a intentarlo.");
                        usuario_while = null;
                        break;
                    }
                }

            case 3:
                if (usuario_while != null) {
                    if (usuario_while.isAdmin()) {
                        let corroborar_usuario = eliminarUsuario(usuarios);
                        if(corroborar_usuario.getNombre() == usuario_while.getNombre()) {
                            usuario_while = null;
                        }
                        console.log("Usuarios: ", usuarios);
                        break;
                    }else {
                        alert("Gracias por usar mi plataforma.");
                        salir = false;
                        break;
                    }
                }else {
                    alert("Gracias por usar mi plataforma.");
                    salir = false;
                    break;
                }

            case 4:
                if (usuario_while != null){
                    if (usuario_while.isAdmin()) {
                        adminear(usuarios, usuario_while);
                        break;
                    }else {
                        alert("Debes iniciar sesión con un usuario admin para continuar.");
                        break;
                    }
                }else {
                    alert("Debes iniciar sesión para acceder.");
                    break;
                }

            case 5:
                if (usuario_while != null) {
                    if (usuario_while.isAdmin()){
                        let articuloNuevo = crearArticulo();
                        if(articuloNuevo){
                            alert(`El articulo ${articuloNuevo.nombre} se creo correctamente.`);
                        }
                        console.log("Artículos: ", articulos);
                        break;
                    }else {
                        alert("Debes iniciar sesión con un usuario admin para continuar.");
                        break;
                    }
                }else {
                    alert("Debes iniciar sesión para acceder.");
                    break;
                }

            case 6:
                if (usuario_while != null) {
                    if (usuario_while.isAdmin()) {
                        eliminarArticulo(articulos);
                        console.log("Artículos: ", articulos);
                        break;
                    }else {
                        alert("Debes iniciar sesión con un usuario admin para continuar..");
                        break;
                    }
                }else {
                    alert("Debes iniciar sesión para acceder.");
                    break;
                }

            case 7:
                if(usuario_while != null){
                    if(usuario_while.isAdmin()){
                        carrito(articulos);
                        break;
                    }else{
                        alert("El numero ingresado es incorrecto, intente nuevamente.");
                        break;
                    }
                }else{
                    alert("El numero ingresado es incorrecto, intente nuevamente.");
                    break;
                }

            case 8:
                if(usuario_while != null){
                    if(usuario_while.isAdmin()){
                        alert("Gracias por usar mi plataforma.");
                        salir = false;
                        break;
                    }else{
                        alert("El numero ingresado es incorrecto, intente nuevamente.");
                        break;
                    }
                }else{
                    alert("El numero ingresado es incorrecto, intente nuevamente.");
                    break;
                }

            default:
                alert("El numero ingresado es incorrecto, intente nuevamente.");
                break;
        }
    }
}


plataforma(usuarios, articulos);