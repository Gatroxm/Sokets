
//Comando para establecer cominicacion 

var socket = io();

var lbltiket1 = $('#lblTicket1');
var lbltiket2 = $('#lblTicket2');
var lbltiket3 = $('#lblTicket3');
var lbltiket4 = $('#lblTicket4');
var lblEscritorio1 = $('#lblEscritorio1');
var lblEscritorio2 = $('#lblEscritorio2');
var lblEscritorio3 = $('#lblEscritorio3');
var lblEscritorio4 = $('#lblEscritorio4');

var lblTikets = [lbltiket1,lbltiket2,lbltiket3,lbltiket4];
var lblEscritorios = [lblEscritorio1,lblEscritorio2,lblEscritorio3,lblEscritorio4];

socket.on('connect', function () {
    console.log('conectado al servidor');
});

socket.on('disconnect', function () {
    console.log('perdimos conección con el servidor');
});

socket.on('ticketActual', function(data) {
    actualizaHtml(data.ultimos4);
})
socket.on('ultimos4', function(data){
    var audio = new Audio('audio/new-ticket.mp3');
    audio.play();
    actualizaHtml(data.ultimos4);
})
function actualizaHtml( ultimos4 ) {
    for (var i = 0; i <= ultimos4.length -1; i++ ) {
        lblTikets[i].text('Tiket: ' + ultimos4[i].numero)
        lblEscritorios[i].text('Escritorio: ' + ultimos4[i].ecritorio)
    }
}
