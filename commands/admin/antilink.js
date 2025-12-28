let antilink = {}

module.exports = async (sock, msg, args) => {
  const group = msg.key.remoteJid
  if (args[0] === 'on') {
    antilink[group] = true
    return sock.sendMessage(group, { text: '✅ Anti-link activado' })
  }
  if (args[0] === 'off') {
    delete antilink[group]
    return sock.sendMessage(group, { text: '❌ Anti-link desactivado' })
  }
}
