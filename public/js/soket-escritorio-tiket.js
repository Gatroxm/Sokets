//Comando para establecer cominicacion 

var socket = io();

socket.on('connect', function () {
    console.log('conectado al servidor');
});

socket.on('disconnect', function () {
    console.log('perdimos conección con el servidor');
});

var searshParams = new URLSearchParams(window.location.search);
if ( !searshParams.has('escritorio') ) {
    window.location = 'index.html';
    throw new Error('EL escritorio es necesario');  
};

var escritorio = searshParams.get('escritorio');
$('h1').text('Escritorio: ' + escritorio);

$("button").on('click', function() {
    socket.emit('atenderTicket', {escritorio:escritorio}, function(resp){
        if( resp == 'No hay tickets disponibles para atender') {
            $('small').text(resp)
        }
        $('small').text(resp.numero)
    });
})
