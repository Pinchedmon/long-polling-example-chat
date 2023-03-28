const ws = require('ws');
const wss = new ws.Server({
    port: 5050,

}, () => console.log(`5050`))

wss.on('connection', (ws) => {
    ws.on('message', (message) => {
        message = JSON.parse(message)
        switch (message.event) {
            case 'message':
                broadcaseMessage(message)
                break;
            case 'connection':
                broadcaseMessage(message)
                break;
        }
    })

})

function broadcaseMessage(message) {
    wss.clients.forEach(client => client.send(JSON.stringify(message)))
}