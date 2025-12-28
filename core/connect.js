// core/connect.js
const {
  default: makeWASocket,
  useMultiFileAuthState,
  fetchLatestBaileysVersion,
  DisconnectReason
} = require('@whiskeysockets/baileys')

const P = require('pino')
const qrcode = require('qrcode-terminal')

async function connectBot() {
  const { state, saveCreds } =
    await useMultiFileAuthState('./auth/session')

  const { version } = await fetchLatestBaileysVersion()

  const sock = makeWASocket({
    version,
    auth: state,
    logger: P({ level: 'silent' }),
    browser: ['COMPITA', 'Chrome', '1.0.0'],
    printQRInTerminal: false,
    syncFullHistory: false
  })

  sock.ev.on('creds.update', saveCreds)

  sock.ev.on('connection.update', (update) => {
    const { connection, qr, lastDisconnect } = update

    if (qr) {
      console.clear()
      console.log('📱 ESCANEA ESTE QR (NO CIERRES CMD)\n')
      qrcode.generate(qr, { small: true })
    }

    if (connection === 'open') {
      console.log('✅ COMPITA CONECTADO CORRECTAMENTE')
    }

    if (connection === 'close') {
      const reason =
        lastDisconnect?.error?.output?.statusCode

      if (reason === DisconnectReason.loggedOut) {
        console.log('❌ SESIÓN CERRADA — BORRA auth/session')
      } else {
        console.log('♻️ Reconectando COMPITA...')
        setTimeout(connectBot, 3000)
      }
    }
  })

  return sock
}

module.exports = connectBot
