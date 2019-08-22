const fs = require('fs');

class Tickets {
    constructor(numero, ecritorio) {
        this.numero= numero;
        this.ecritorio = ecritorio;
    }
}

class TiketControl {

    constructor() {
        this.ultimo = 0;
        this.hoy = new Date().getDate();
        this.tickets = [];
        this.ultimos4 = [];
        let data = require('../../data/data.json');

        if(data.hoy === this.hoy) {
            this.ultimo = data.ultimo;
            this.tickets = data.tickets;
            this.ultimos4 = data.ultimos4;
        } else {
            this.reiniciarConteo();
        }
    }

    siguienteTiket() {
        this.ultimo += 1;
        let ticket = new Tickets(this.ultimo, null);
        this.tickets.push(ticket);
        this.grabarArchivo();
        return `Ticket ${ this.ultimo }`;
    }

    atenderTicket( escritorio ) {
        if ( this.tickets.length === 0 ) {
            return 'No hay tickets disponibles para atender'
        }

        let numeroTicket = this.tickets[0].numero;
        this.tickets.shift();
        let atenderTicket = new Tickets(numeroTicket, escritorio);
        this.ultimos4.unshift( atenderTicket );

        if ( this.ultimos4.length > 4 ){
            this.ultimos4.splice(-1, 1)
        }
        this.grabarArchivo();
        return atenderTicket;
    }

    

    ultimosCuatro() {
        return this.ultimos4 ;
    }

    ultimoTicket() {
        return `Ticket ${ this.ultimo }`;
    }

    reiniciarConteo() {
        this.ultimo = 0;
        this.tickets = [];
        this.ultimos4 = [];
        this.grabarArchivo();
    }

    grabarArchivo() {
        let jsonData = {
            ultimo: this.ultimo,
            hoy: this.hoy,
            tickets : this.tickets,
            ultimos4: this.ultimos4
        };
        let dataJsonString = JSON.stringify(jsonData);

        fs.writeFileSync('./server/data/data.json', dataJsonString);
    }

}

module.exports = {
    TiketControl
}
