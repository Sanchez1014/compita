const fs = require('fs')
const { prefix } = require('../config')

module.exports = async (sock, msg) => {
  try {
    const from = msg.key.remoteJid
    const isGroup = from.endsWith('@g.us')

    const body =
      msg.message?.conversation ||
      msg.message?.extendedTextMessage?.text ||
      msg.message?.imageMessage?.caption ||
      msg.message?.videoMessage?.caption

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
      text: '❌ Comando no encontrado. Usa *!menu*'
    })

  } catch (err) {
    console.error('Error handler:', err)
  }
}
