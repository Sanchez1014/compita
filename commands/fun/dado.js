module.exports = async (sock, msg) => {
  const num = Math.floor(Math.random() * 6) + 1
  await sock.sendMessage(msg.key.remoteJid, {
    text: `🎲 COMPITA lanzó el dado: *${num}*`
  })
}
