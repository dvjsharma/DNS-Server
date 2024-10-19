const dgram = require('dgram');

const server = dgram.createSocket('udp4');

server.on('message', (msg, rinfo) => {
        console.log(msg)
        console.log(rinfo)
    }
);

server.bind(53, ()=>{
    console.log('server is listening on default port 53');
})