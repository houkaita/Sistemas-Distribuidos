const net = require('net');
const { Worker, isMainThread, parentPort } = require('worker_threads');

const PORT = 3000;

if (isMainThread) {
  const server = net.createServer();

  server.on('connection', (socket) => {
    console.log('Cliente conectado.');

    socket.on('data', (data) => {
      const requestData = data.toString().trim();
      console.log(`Recebido: ${requestData}`);

      const worker = new Worker(__filename);
      worker.postMessage(requestData);
    });

    socket.on('end', () => {
      console.log('Cliente desconectado.');
    });
  });

  server.listen(PORT, () => {
    console.log(`Servidor está ouvindo na porta ${PORT}`);
  });
} else {
  parentPort.on('message', (requestData) => {
    const threadId = Math.random().toString(36).substring(7);
    console.log(`Thread ${threadId} recebendo requisição: ${requestData}`);

    setTimeout(() => {
      const response = `Serviço prestado pela thread ${threadId}`;
      console.log(`Thread ${threadId} enviando resposta: ${response}`);
      parentPort.postMessage(response);
    }, 2000);
  });
}
