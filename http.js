import { createServer } from 'node:http';

const server = createServer((req,res) => {
    console.log(`Req Agent: ` + req.headers['user-agent']);
    res.writeHead(200, {'Content-Type': 'text/plain'}); // Informacion del header para decir que es lo que se va a mandar
    res.end('Hello World');
})

server.listen(3000, '127.0.0.1', () =>{
    console.log('Listening');
})