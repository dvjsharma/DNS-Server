const dgram = require('dgram');
const dnsPacket = require('dns-packet');
const DNSDB = require('./db');

const server = dgram.createSocket('udp4');

server.on('message', (msg, rinfo) => {
        const request = dnsPacket.decode(msg);
        const IP = DNSDB[request.questions[0].name];

        const packet = dnsPacket.encode({
            type: 'response',
            id: request.id,
            flags: dnsPacket.AUTHORITATIVE_ANSWER,
            questions: request.questions,
            answers: [{
                type: IP.type,
                class: 'IN',
                name: request.questions[0].name,
                ttl: 300,
                data: IP.data
            }]
        })
    
        server.send(packet, rinfo.port, rinfo.address);

        console.log(request.questions)
        console.log(rinfo)
    }
);

server.bind(53, ()=>{
    console.log('server is listening on default port 53');
})