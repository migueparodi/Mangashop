const productos =[
    //Akira
    {
        id: "akira-01",
        titulo: "Akira 01",
        imagen: "./img/akira/01.jpg",
        categoria: {
            nombre: "Akira",
            id: "akira"
        },
        precio: 1000
    },
    {
        id: "akira-02",
        titulo: "Akira 02",
        imagen: "./img/akira/02.jpg",
        categoria: {
            nombre: "Akira",
            id: "akira"
        },
        precio: 1000
    },
    {
        id: "akira-03",
        titulo: "Akira 03",
        imagen: "./img/akira/03.jpg",
        categoria: {
            nombre: "Akira",
            id: "akira"
        },
        precio: 1000
    },
    
    //Berserk
    {
        id: "berserk-01",
        titulo: "Berserk 01",
        imagen: "./img/berserk/01.jpg",
        categoria: {
            nombre: "Berserk",
            id: "berserk"
        },
        precio: 1000
    },
    {
        id: "berserk-02",
        titulo: "Berserk 02",
        imagen: "./img/berserk/02.jpg",
        categoria: {
            nombre: "Berserk",
            id: "berserk"
        },
        precio: 1000
    },
    {
        id: "berserk-03",
        titulo: "Berserk 03",
        imagen: "./img/berserk/03.jpg",
        categoria: {
            nombre: "Berserk",
            id: "berserk"
        },
        precio: 1000
    },
    
    //blame
    {
        id: "blame-01",
        titulo: "Blame 01",
        imagen: "./img/blame/01.jpg",
        categoria: {
            nombre: "Blame",
            id: "blame"
        },
        precio: 1000
    },
    {
        id: "blame-02",
        titulo: "Blame 02",
        imagen: "./img/blame/02.jpg",
        categoria: {
            nombre: "Blame",
            id: "blame"
        },
        precio: 1000
    },
    {
        id: "blame-03",
        titulo: "Blame 03",
        imagen: "./img/blame/03.jpg",
        categoria: {
            nombre: "Blame",
            id: "blame"
        },
        precio: 1000
    }
    ];



    const contenedorProductos = document.querySelector("#contenedor-productos");
    const botonesCategorias = document.querySelectorAll(".boton-categoria");
    const tituloPrincipal = document.querySelector("#titulo-principal");
    let botonesAregar = document.querySelectorAll(".producto-agregar");
    const numerito = document.querySelector("#numerito");


    function cargarProductos(productosElegidos) {
        contenedorProductos.innerHTML = "";

        productosElegidos.forEach(producto => {
            const div = document.createElement("div");
            div.classList.add("producto");
            div.innerHTML = `
            <img class="producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
            <div class="producto-detalles">
                <h3 class="producto-titulo">${producto.titulo}</h3>
                <p class="producto-precio">${producto.precio}</p>
                <button class="producto-agregar" id="${producto.id}">Agregar</button>
            </div>
            `;

            contenedorProductos.append(div);
        })
        actualizarBotonesAgregar();
    }

    cargarProductos(productos);


    botonesCategorias.forEach(boton => {
        boton.addEventListener("click" , (e) => {

            botonesCategorias.forEach(boton => boton.classList.remove("active"));
            e.currentTarget.classList.add("active");

            if(e.currentTarget.id != "todos") {
                const productoCategoria = productos.find(producto => producto.categoria.id === e.currentTarget.id);
                tituloPrincipal.innerText = productoCategoria.categoria.nombre;

                const productosBoton = productos.filter(producto => producto.categoria.id === e.currentTarget.id);
                cargarProductos(productosBoton);
            } else{
                tituloPrincipal.innerText = "Todos los productos";
                cargarProductos(productos);
            }


        })
    });

    function actualizarBotonesAgregar() {
        botonesAregar = document.querySelectorAll(".producto-agregar");

        botonesAregar.forEach(boton => {
            boton.addEventListener("click", agregarAlCarrito);
        });
    }

    const productosEnCarritoLS = JSON.parse(localStorage.getItem("productos-en-carrito"));
    
    const productosEnCarrito = [];


    function agregarAlCarrito(e) {
        const idBoton = e.currentTarget.id;
        const productoAgregado = productos.find(producto => producto.id === idBoton);

        if(productosEnCarrito.some(producto => producto.id === idBoton)) {
            const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
            productosEnCarrito[index].cantidad++;
        } else{
            productoAgregado.cantidad = 1;
            productosEnCarrito.push(productoAgregado);
        }

        actualizarNumerito();

        localStorage.setItem("prudctos-en-carrito", JSON.stringify(productosEnCarrito));
    }


    function actualizarNumerito() {
        let nuevoNumerito = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
        numerito.innerText = nuevoNumerito;
    }

