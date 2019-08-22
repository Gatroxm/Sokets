
//Comando para establecer cominicacion 

var socket = io();
let label = $('#lblNuevoTicket');

socket.on('connect', function () {
    console.log('conectado al servidor');
});

socket.on('disconnect', function () {
    console.log('perdimos conección con el servidor');
});

socket.on('ticketActual', function(ultimoTicket){
    label.text(ultimoTicket.ticket);
})

$("button").on('click', function() {
    socket.emit('siguienteTicket', null, function(siguienteTicket){
        label.text(siguienteTicket)
    });
})