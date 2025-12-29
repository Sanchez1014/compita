const fs = require('fs')
const { prefix } = require('../config')

module.exports = async (sock, msg) => {
  try {
    const from = msg.key.remoteJid
    const isGroup = from.endsWith('@g.us')

    // Función para extraer texto de cualquier tipo de mensaje
    const extract = m =>
      m?.conversation ||
      m?.extendedTextMessage?.text ||
      m?.imageMessage?.caption ||
      m?.videoMessage?.caption ||
      m?.ephemeralMessage?.message?.extendedTextMessage?.text ||
      m?.ephemeralMessage?.message?.conversation ||
      m?.viewOnceMessage?.message?.extendedTextMessage?.text ||
      m?.viewOnceMessage?.message?.conversation ||
      m?.editedMessage?.message?.conversation ||
      m?.protocolMessage?.conversation

    const body = extract(msg.message)
    if (!body) return
    if (!body.startsWith(prefix)) return

    const args = body.slice(prefix.length).trim().split(/ +/)
    const command = args.shift().toLowerCase()

    const commandFolders = fs.readdirSync('./commands')

    for (const folder of commandFolders) {
      const cmdPath = `./commands/${folder}/${command}.js`
      if (fs.existsSync(cmdPath)) {
        return require(`../${cmdPath}`)(sock, msg, args, isGroup)
      }
    }

    await sock.sendMessage(from, {
      text: `❌ Comando no encontrado. Usa *${prefix}menu*`
    })

  } catch (err) {
    console.error('Error handler:', err)
  }
}