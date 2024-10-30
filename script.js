function plataforma(usuarios, articulos){
    let salir = true;
    let usuario_while = null;
    let carrito = new Array();
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
                if (usuario_while == null) {
                    usuario_while = iniciarSesion(usuarios);
                    carrito = usuario_while.mostrarCarrito();
                    if(usuario_while) {
                        console.log("Usuario: ", usuario_while);
                        break;
                    }else {
                        usuario_while = null;
                        break;
                    }
                }else {
                    let confirmacion = confirm(`¿Seguro que deseas cerrar sesión ${usuario_while.nombre}?`);
                    if(confirmacion){
                        alert("Sesión cerrada con éxito.");
                        usuario_while = null;
                        carrito = new Array();
                        break;
                    }else {
                        alert("La sesión continua iniciada.")
                        break;
                    }
                }

            case 2:
                if (usuario_while != null && usuario_while.isAdmin()) {
                    alert("Debes cerrar sesión para crear un usuario nuevo.");
                    break;
                }else if (usuario_while != null && !usuario_while.isAdmin()){
                    if(carrito.length != 0) {
                        carrito = modificarCarrito(articulos, carrito);
                        break;
                    }else {
                        carrito = Carrito(articulos, carrito);
                        break;
                    }
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
                if (usuario_while == null) {
                    alert("Gracias por usar mi plataforma.");
                    salir = false;
                    break;
                }else {
                    if (usuario_while.isAdmin()) {
                        let corroborar_usuario = eliminarUsuario(usuarios);
                        if (corroborar_usuario == -1){
                            alert("Usuario no encontrado.");
                            break;
                        }
                        else if (corroborar_usuario == -2) {
                            alert("Operación cancelada.");
                            break;
                        }
                        else if(corroborar_usuario != undefined && corroborar_usuario.getNombre() == usuario_while.getNombre()) {
                            usuario_while = null;
                            break;
                        }
                        console.log("Usuarios: ", usuarios);
                        break;
                    }else {
                        alert("Gracias por usar mi plataforma.");
                        salir = false;
                        break;
                    }
                }

            case 4:
                if (usuario_while == null){
                    alert("Debes iniciar sesión para acceder.");
                    break;
                }else {
                    if (usuario_while.isAdmin()) {
                        adminear(usuarios, usuario_while);
                        break;
                    }else {
                        alert("Debes iniciar sesión con un usuario admin para continuar.");
                        break;
                    }
                }

            case 5:
                if (usuario_while == null) {
                    alert("Debes iniciar sesión para acceder.");
                    break;
                }else {
                    if (usuario_while.isAdmin()){
                        let id = generadorId(articulos);
                        let articuloNuevo = crearArticulo(id);
                        if(articuloNuevo){
                            alert(`El articulo ${articuloNuevo.nombre} se creo correctamente.`);
                        }
                        console.log("Artículos: ", articulos);
                        break;
                    }else {
                        alert("Debes iniciar sesión con un usuario admin para continuar.");
                        break;
                    }
                }

            case 6:
                if (usuario_while == null) {
                    alert("Debes iniciar sesión para acceder.");
                    break;
                }else {
                    if (usuario_while.isAdmin()) {
                        eliminarArticulo(articulos);
                        console.log("Artículos: ", articulos);
                        break;
                    }else {
                        alert("Debes iniciar sesión con un usuario admin para continuar..");
                        break;
                    }
                }

            case 7:
                if(usuario_while == null){
                    alert("El numero ingresado es incorrecto, intente nuevamente.");
                    break;
                }else{
                    if(usuario_while.isAdmin()){
                        if(carrito.length != 0) {
                            carrito = modificarCarrito(articulos, carrito);
                            break;
                        }else {
                            carrito = Carrito(articulos, carrito);
                            break;
                        }
                    }else{
                        alert("El numero ingresado es incorrecto, intente nuevamente.");
                        break;
                    }
                }

            case 8:
                if(usuario_while == null){
                    alert("El numero ingresado es incorrecto, intente nuevamente.");
                    break;
                }else{
                    if(usuario_while.isAdmin()){
                        alert("Gracias por usar mi plataforma.");
                        salir = false;
                        break;
                    }else{
                        alert("El numero ingresado es incorrecto, intente nuevamente.");
                        break;
                    }
                }

            default:
                alert("El numero ingresado es incorrecto, intente nuevamente.");
                break;
        }
    }
}

let boton_plataforma = document.getElementById("boton_plataforma");

boton_plataforma.addEventListener("click", ()=>{

    plataforma(usuarios, articulos);
});