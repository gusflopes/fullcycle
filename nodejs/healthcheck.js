const net = require('net');

const client = net.createConnection({ port: 3000 }, () => {
  console.log('Connected to server!');
  client.end();
});

client.on('end', () => {
  process.exit(0);
});

client.on('error', (err) => {
  console.error(err);
  process.exit(1);
});
