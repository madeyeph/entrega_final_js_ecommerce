const carro_sin_producto=JSON.parse(localStorage.getItem("carro_sin_producto")) || [];

const consolas=[
    {
        id: "producto_1",
        title: "Super Nintendo",
        price: 150000,
        category: {
            nombre:"consola_1",
            id:"consolitas",
        },
        img: "./images/consola_1.jpg",
    },
    {
        id: "producto_2",
        title: "Game Boy SP",
        price: 200000,
        category: {
            nombre:"consola_2",
            id:"consolitas",
        },
        img: "./images/consola_2.jpg",
    },
    {
        id: "producto_3",
        title: "Control Nintendo Switch",
        price: 360000,
        category: {
            nombre:"control_1",
            id:"controles",
        },
        img: "./images/control_1.jpg",
    },
    {
        id: "producto_4",
        title: "Nintendo Switch",
        price: 900000,
        category: {
            nombre:"consola_3",
            id:"consolitas",
        },
        img: "./images/consola_3.jpg",
    },
    {
        id: "producto_5",
        title: "Controles Nintendo Switch",
        price: 320000,
        category: {
            nombre:"control_2",
            id:"controles",
        },
        img: "./images/control_2.jpg",
    },
    {
        id: "producto_6",
        title: "Porta Control Nintendo Switch",
        price: 135000,
        category: {
            nombre:"accesorio_1",
            id:"accesorios",
        },
        img: "./images/accesorio_1.jpg",
    },
    {
        id: "producto_7",
        title: "Rumble Pack N64",
        price: 750000,
        category: {
            nombre:"accesorio_2",
            id:"accesorios",
        },
        img: "./images/accesorio_2.jpg",
    },
    {
        id: "producto_8",
        title: "Control Edición Especial",
        price: 400000,
        category: {
            nombre:"control_3",
            id:"controles",
        },
        img: "./images/control_3.jpg",
    },
    {
        id: "producto_8",
        title: "Case - Edición Kirby",
        price: 220000,
        category: {
            nombre:"accesorio_3",
            id:"accesorios",
        },
        img: "./images/accesorio_3.jpg",
    }
];

const cajaConsolas = document.querySelector("#contenedor_consolas");
const botonCategory = document.querySelectorAll(".boton_category");
const carritoSinProductos = document.querySelector("#carro_0");
const carritoConProductos = document.querySelector("#productos_en_carro");
const carritoPrecioTotal = document.querySelector("#precio_total");
const borrarTodo = document.querySelector("#eliminar_todo");

function logearConsolas (consolasLogeadas){

    cajaConsolas.innerHTML = "";

    consolasLogeadas.forEach((consola) => {
        let div = document.createElement("div");
        div.classList.add("clase_caja_consola");
        div.innerHTML =`
            <img class="img_consola" src="${consola.img}" alt="imagen de producto">
            <h3>${consola.title}</h3>
            <h4>${"$" + " " + consola.price}</h4>
        `;
        let button = document.createElement("button");
        button.classList.add("consola_boton");
        button.innerText = "Sumar al Carrito";
        button.id=`${consola.category.id}`;
        button.addEventListener("click",() => {
            sumarAlCarrito(consola);
            
            Toastify({
                text: "Producto Agregado",
                className: "boton_tosti",
                duration: 3000,
                newWindow: true,
                close: true,
                gravity: "top",
                position: "right",
                stopOnFocus: true,
                style: {
                background: "linear-gradient(to right, #0a2d15, #7fffd4)",
                },
                onClick: function(){}
            }).showToast();
        })
        div.append(button);
        cajaConsolas.append(div);
    });
}

logearConsolas(consolas);

botonCategory.forEach(boton => {
    boton.addEventListener("click",(e) => {

        botonCategory.forEach(boton => boton.classList.remove("activo"));
        e.currentTarget.classList.add("activo");

        if(e.currentTarget.id != "todos") {
            const productoFiltrados = consolas.filter(consola => consola.category.id === e.currentTarget.id);
            logearConsolas(productoFiltrados);
        }else{
            logearConsolas(consolas); 
        }
    })
})

const sumarAlCarrito = (consola) => {
    let productoRepetido = carro_sin_producto.find((item) => item.id === consola.id);
    if(productoRepetido){
        productoRepetido.cantidad++;
    } else{
        carro_sin_producto.push({...consola, cantidad: 1});    
    }
    revisionCarrito();
}

function revisionCarrito(){
    if (carro_sin_producto.length === 0) {
        carritoSinProductos.classList.remove("d_none");
        carritoConProductos.classList.add("d_none");
        borrarTodo.classList.add("d_none");
    } else {
        carritoSinProductos.classList.add("d_none");
        carritoConProductos.classList.remove("d_none");
        borrarTodo.classList.remove("d_none");

        carritoConProductos.innerHTML ="";
        carro_sin_producto.forEach((consola) => {
            let div = document.createElement("div");
            div.classList.add("carrito_consola");
            div.innerHTML = `
                <h3>${consola.title}</h3>
                <p>${consola.price}</p>
                <p>${consola.cantidad}</p>
                <p>${"$" + " " + consola.price * consola.cantidad}</p>
            `;
        let button = document.createElement("button");
        button. classList.add("consola_quitar_boton");
        button.innerHTML = `
            <img src="./images/boton_cerrar.png">
        `;
        button.addEventListener("click", () => {
            eliminarConsolaCarrito (consola);
        })
        
        div.append(button);
        carritoConProductos.append(div);

    })
    }
    precioTotal();

    localStorage.setItem("carro_sin_producto", JSON.stringify(carro_sin_producto));

}
revisionCarrito();

function eliminarConsolaCarrito (consola) {
    const indice = carro_sin_producto.findIndex((item) => item.id === consola.id);
    carro_sin_producto.splice(indice,1);
    revisionCarrito();
}

function precioTotal() {
    const precio_final = carro_sin_producto.reduce((acc, consola) => acc + consola.price * consola.cantidad, 0);
    carritoPrecioTotal.innerText = "$" + precio_final;
}

borrarTodo.addEventListener("click", () => {
    const totalProductos = carro_sin_producto.reduce((acc, consola) => acc + consola.cantidad,0);
    Swal.fire({
        title:"¿Quieres eliminar todos los productos",
        text: "Vas a borrar " + totalProductos + " productos.",
        icon:"question",
        showDenyButton: true,
        denybuttonText:"No",
        confirmButtonText:"Sí",
    }).then((result) =>{
        if (result.isConfirmed){
            carro_sin_producto.splice(0, carro_sin_producto.length);
            revisionCarrito(); 
            Swal.fire({
                icon:"success",
                title:"¡Haz vaciado el carrito!",
                showConfirmButton: false,
                timer: 2000,
            });
        }
    })
})

document.getElementById('whatsapp-button').addEventListener('click', function() {
    var telefono = "573153047850";
    var mensaje = "Hola, me gustaría obtener más información.";
    var url = `https://wa.me/${telefono}?text=${encodeURIComponent(mensaje)}`;
    window.open(url, '_blank');
});