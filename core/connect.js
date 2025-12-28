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
  let state, saveCreds

  if (process.env.SESSION_DATA) {
    // Railway: leer sesión desde variable de entorno
    state = JSON.parse(process.env.SESSION_DATA)
    saveCreds = () => {} // no guarda nada porque ya está en env
  } else {
    // Local: usar carpeta auth/session
    const auth = await useMultiFileAuthState('./auth/session')
    state = auth.state
    saveCreds = auth.saveCreds
  }

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
      const reason = lastDisconnect?.error?.output?.statusCode
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