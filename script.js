// Inicializar EmailJS
function() {
    emailjs.init("F91PoU5GdLAIAfLsB");
})();

let datosPedido = {};

function mostrarResumen() {
    // 1. Capturar datos
    const nombre = document.getElementById('nombre').value;
    const servicio = document.getElementById('servicio').value;
    const telefono = document.getElementById('telefono').value;

    // Validar campos básicos
    if(!nombre || !servicio || !telefono) {
        alert("Por favor complete sus datos personales.");
        return;
    }

    // Capturar selecciones
    const huevo = document.getElementById('huevo').value;
    const queso = document.getElementById('queso').value;
    const maduro = document.getElementById('maduro').checked ? "Sí" : "No";
    const salchichon = document.getElementById('salchichon').checked ? "Sí" : "No";
    const pan = document.getElementById('pan').checked ? "Sí" : "No";

    // Generar Número de Orden Único (Timestamp + Random)
    const ordenId = "ORD-" + Date.now().toString().slice(-6) + Math.floor(Math.random() * 100);

    // Guardar en objeto global
    datosPedido = {
        ordenId, nombre, servicio, telefono, huevo, queso, maduro, salchichon, pan
    };

    // 2. Construir HTML del resumen
    const htmlResumen = `
        <p><strong>Orden #:</strong> ${ordenId}</p>
        <p><strong>Nombre:</strong> ${nombre}</p>
        <p><strong>Huevo:</strong> ${huevo}</p>
        <p><strong>Queso:</strong> ${queso}</p>
        <p><strong>Maduro:</strong> ${maduro}</p>
        <p><strong>Salchichón:</strong> ${salchichon}</p>
        <p><strong>Pan:</strong> ${pan}</p>
    `;

    document.getElementById('resumenTexto').innerHTML = htmlResumen;
    
    // 3. Mostrar Modal y resetear botones
    document.getElementById('modalResumen').classList.remove('hidden');
    document.getElementById('botonesPrincipales').classList.remove('hidden');
    document.getElementById('botonesEdicion').classList.add('hidden');
}

function enviarPedido() {
    const btn = event.target;
    btn.innerText = "Enviando...";

    
    emailjs.send("service_1d9bnzc", "template_vjaw3k9", datosPedido)
        .then(function() {
            alert("Para Nel será un privilegio cocinar para ti, muchas gracias.");
            cancelarPedido(); // Limpia todo
        }, function(error) {
            alert("Hubo un error al enviar el pedido: " + JSON.stringify(error));
            btn.innerText = "Sí, enviar";
        });
}

function mostrarOpcionesNo() {
    document.getElementById('botonesPrincipales').classList.add('hidden');
    document.getElementById('botonesEdicion').classList.remove('hidden');
}

function editarPedido() {
    document.getElementById('modalResumen').classList.add('hidden');
    // El formulario mantiene los datos, así que el usuario solo edita
}

function cancelarPedido() {
    document.getElementById('modalResumen').classList.add('hidden');
    document.getElementById('orderForm').reset();
    window.scrollTo(0,0);
}

