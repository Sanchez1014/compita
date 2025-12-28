const { botName, prefix } = require('../../config')

module.exports = async (sock, msg) => {
  const menu = `
🤖 *${botName}* — BOT DE WHATSAPP

📌 *COMANDOS PRINCIPALES*
${prefix}menu
${prefix}ping
${prefix}info
${prefix}owner

🛡️ *MODERACIÓN*
${prefix}kick @user
${prefix}ban @user
${prefix}mute @user
${prefix}antilink on/off
${prefix}tagall

🎮 *DIVERSIÓN*
${prefix}dado
${prefix}coin
${prefix}abrazo @user
${prefix}insulto @user

🧰 *UTILIDAD*
${prefix}hora
${prefix}clima
${prefix}calcular 2+2

✨ *Más comandos pronto…*
`

  await sock.sendMessage(msg.key.remoteJid, { text: menu })
}
