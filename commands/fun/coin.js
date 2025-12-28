module.exports = async (sock, msg) => {
  const r = Math.random() > 0.5 ? 'Cara' : 'Cruz'
  sock.sendMessage(msg.key.remoteJid, { text: `🪙 ${r}` })
}
