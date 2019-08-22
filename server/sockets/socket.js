const { io } = require('../server');
const { TiketControl } = require('../sockets/classes/tiket-control');

const tiketControl = new TiketControl();

io.on('connection', (client) => {
    client.on('siguienteTicket', (data, callback) => {
        let ticketNuevo = tiketControl.siguienteTiket();
        callback(ticketNuevo)
    });

    let ultimoTicket = {
        ticket: tiketControl.ultimoTicket(),
        ultimos4: tiketControl.ultimosCuatro()
    }
    client.emit('ticketActual',ultimoTicket );

    client.on('atenderTicket', (data, callback) => {
         if ( !data.escritorio ) {
             callback({
                 err: true,
                 mensaje: "EL escritorio es necesario"
             });
         }
         let atenderTicket = tiketControl.atenderTicket(data.escritorio);
         callback(atenderTicket);

         client.broadcast.emit('ultimos4', ultimoTicket)

    })
});
