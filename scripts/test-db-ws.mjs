const token = "cmwbiwlm4001607qq427thxau";
const containerId = "d8944135e483aff2e1df0a6d1b3583cbb348547aa40086b11206a80d93c1ee31";
const command = Buffer.from("sh").toString("base64");
const wsUrl = `wss://painel.bragentes.ia.br/ws/containerShell?token=${token}&container=${containerId}&command=${command}`;

console.log("Connecting to WebSocket...");
const ws = new WebSocket(wsUrl);

ws.onopen = () => {
  console.log("Connected!");
  ws.send("psql -U postgres -d postgres -c 'SELECT version();'\n");
  setTimeout(() => {
    ws.send("exit\n");
  }, 1500);
};

ws.onmessage = (event) => {
  process.stdout.write(event.data);
};

ws.onerror = (err) => {
  console.error("WS error:", err.message);
};

ws.onclose = () => {
  console.log("\nWS closed");
  process.exit(0);
};

setTimeout(() => {
  console.log("\nTimeout");
  process.exit(1);
}, 5000);
