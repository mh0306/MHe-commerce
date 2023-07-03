document.addEventListener('DOMContentLoaded', () => {
    // Variables
    /*const baseDeDatos = [
        {
            id: 1,
            nombre: 'Disco Solido Ssd 500 Gb',
            precio: 8500,
            imagen: '../assets/img/SSD.png'
        },
        {
            id: 2,
            nombre: 'Memoria RAM Viper Steel',
            precio: 30000,
            imagen: '../assets/img/RAM.png'
        },
        {
            id: 3,
            nombre: 'Tableta gráfica XP-Pen Artist 22 Pro black',
            precio: 90000,
            imagen: '../assets/img/XPPen.png'
        },
        {
            id: 4,
            nombre: 'Gabinete Pc Gamer Sate K381',
            precio: 50000,
            imagen: '../assets/img/SateK381.png'
        },
        {
            id: 5,
            nombre: 'Mouse inalámbrico Logitech M280',
            precio: 2000,
            imagen: '../assets/img/M280.png',
        },
        {
            id: 6,
            nombre: 'Teclado Genius KB-125',
            precio: 3000,
            imagen: '../assets/img/KB125.png',
        },
        {
            id: 7,
            nombre: 'Auriculares Spica Sp-420',
            precio: 15000,
            imagen: '../assets/img/SP420.png'
        },
        {
            id: 8,
            nombre: 'Silla de escritorio Vonne SV-G0',
            precio: 50000,
            imagen: '../assets/img/SVG0.png'
        },
        {
            id: 9,
            nombre: 'Monitor Philips Led 24',
            precio: 52000,
            imagen: '../assets/img/Phillips24.png'
        },
		{
            id: 10,
            nombre: 'Placa De Video Geforce Gt 740 2gb',
            precio: 53999,
            imagen: '../assets/img/GT740.png'
        },
        {
            id: 11,
            nombre: 'Capturadora Video Y Audio Usb',
            precio: 2999,
            imagen: '../assets/img/CRV55.png'
        },
		{
            id: 12,
            nombre: 'Conversor Hdmi A Rca',
            precio: 5000,
            imagen: '../assets/img/HDMI-RCA.png'
        },
        {
            id: 13,
            nombre: 'Simulador De Manejo + Soporte',
            precio: 520000,
            imagen: '../assets/img/SIMULADOR.png'
        },
		{
            id: 14,
            nombre: 'Volante Collino Formula Sim Kart G29',
            precio: 32000,
            imagen: '../assets/img/G29.png'
        },
        {
            id: 15,
            nombre: 'Kit Secuencial Para Caja De Volante',
            precio: 1630,
            imagen: '../assets/img/KitSecuencial.png'
        }
    ];*/

    let carrito = [];
    const divisa = '$';
    const DOMitems = document.querySelector('#items');
    const DOMcarrito = document.querySelector('#carrito');
    const DOMtotal = document.querySelector('#total');
    const DOMbotonVaciar = document.querySelector('#boton-vaciar');

    // funciones
    const getProducts = async () => {
        const response = await fetch("data.json");
        const data = await response.json();
        
        data.forEach((info) => {
    // Estructura
                const miNodo = document.createElement('div');
                miNodo.classList.add('card', 'col-sm-4');
    // Body
                const miNodoCardBody = document.createElement('div');
                miNodoCardBody.classList.add('card-body');
    // Titulo
                const miNodoTitle = document.createElement('h5');
                miNodoTitle.classList.add('card-title');
                miNodoTitle.textContent = info.nombre;
    // Imagen
                const miNodoImagen = document.createElement('img');
                miNodoImagen.classList.add('img-fluid');
                miNodoImagen.setAttribute('src', info.imagen);
    // Precio
                const miNodoPrecio = document.createElement('p');
                miNodoPrecio.classList.add('card-text');
                miNodoPrecio.textContent = `${info.precio}${divisa}`;
                
    // Boton 
                const miNodoBoton = document.createElement('button');
                miNodoBoton.classList.add('btn', 'btn-primary');
                miNodoBoton.textContent = '+';
                miNodoBoton.setAttribute('marcador', info.id);
                miNodoBoton.addEventListener('click', anyadirProductoAlCarrito);
                
                
    // Insertamos
                miNodoCardBody.appendChild(miNodoImagen);
                miNodoCardBody.appendChild(miNodoTitle);
                miNodoCardBody.appendChild(miNodoPrecio);
                miNodoCardBody.appendChild(miNodoBoton);
                miNodo.appendChild(miNodoCardBody);
                DOMitems.appendChild(miNodo);
            });
        }
    
        /**añadir un producto al carrito de la compra*/
        function anyadirProductoAlCarrito(evento) {
            carrito.push(evento.target.getAttribute('marcador'))
            renderizarCarrito();
            alert("¡Producto agregado con éxito!")
        }
    },

    /*productos a partir de la base de datos*/
    

    /*accesorios en el carrito*/
    function renderizarCarrito() {
        DOMcarrito.textContent = '';
        const carritoSinDuplicados = [...new Set(carrito)];
        carritoSinDuplicados.forEach((item) => {
            const miItem = baseDeDatos.filter((itemBaseDatos) => {
                return itemBaseDatos.id === parseInt(item);
            });
            const numeroUnidadesItem = carrito.reduce((total, itemId) => {
                return itemId === item ? total += 1 : total;
            }, 0);


            const miNodo = document.createElement('li');
            miNodo.classList.add('list-group-item', 'text-right', 'mx-2');
            miNodo.textContent = `${numeroUnidadesItem} x ${miItem[0].nombre} - ${miItem[0].precio}${divisa}`;

            const miBoton = document.createElement('button');
            miBoton.classList.add('btn', 'btn-danger', 'mx-5');
            miBoton.textContent = 'X';
            miBoton.style.marginLeft = '1rem';
            miBoton.dataset.item = item;
            miBoton.addEventListener('click', borrarItemCarrito);

            miNodo.appendChild(miBoton);
            DOMcarrito.appendChild(miNodo);
        });

    DOMtotal.textContent = calcularTotal();
    },

    /*borrar un elemento del carrito*/
    function borrarItemCarrito(evento) {
        const id = evento.target.dataset.item;
        carrito = carrito.filter((carritoId) => {
            return carritoId !== id;
        });
        renderizarCarrito();
    },

    /*precio total*/
    function calcularTotal() {
        return carrito.reduce((total, item) => {
            const miItem = baseDeDatos.filter((itemBaseDatos) => {
                return itemBaseDatos.id === parseInt(item);
            });
            return total + miItem[0].precio;
        }, 0).toFixed(2);
    },

    /*vacia el carrito*/
    function vaciarCarrito() {
        carrito = [];
        renderizarCarrito();
		alert("Su carrito está vacío.")
    },

    DOMbotonVaciar.addEventListener('click', vaciarCarrito),

    renderizarProductos(),
    renderizarCarrito())