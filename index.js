const connectBot = require('./core/connect')
const handler = require('./core/handler')

async function start() {
  const sock = await connectBot()

  sock.ev.on('messages.upsert', async ({ messages }) => {
    const msg = messages[0]
    if (!msg.message) return
    await handler(sock, msg)
  })

  console.log('🤖 COMPITA ONLINE')
}

start()
