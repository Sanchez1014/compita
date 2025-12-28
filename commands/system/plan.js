// commands/fun/ping.js
module.exports = async (sock, msg) => {
  sock.sendMessage(msg.key.remoteJid, {
    text: '🏓 COMPITA está activo'
  })
}
