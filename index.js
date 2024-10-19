const dgram = require('dgram');
const dnsPacket = require('dns-packet');
const DNSDB = require('./db');

const server = dgram.createSocket('udp4');

server.on('message', (msg, rinfo) => {
        const request = dnsPacket.decode(msg);
        console.log(request.questions)
        console.log(rinfo)
    }
);

server.bind(53, ()=>{
    console.log('server is listening on default port 53');
})