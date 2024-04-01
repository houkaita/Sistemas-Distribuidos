const net = require('net');

const PORT = 3000;
const HOST = 'localhost';

const client = new net.Socket();

client.connect(PORT, HOST, () => {
  console.log('Conectado ao servidor');
  client.write('Pode me prestar um serviço?');
});

client.on('data', (data) => {
  console.log(`Recebido do servidor: ${data}`);
});

client.on('close', () => {
  console.log('Conexão fechada');
});
