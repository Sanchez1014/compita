module.exports = async (sock, msg) => {
  const group = msg.key.remoteJid
  const metadata = await sock.groupMetadata(group)
  const users = metadata.participants.map(p => p.id)

  await sock.sendMessage(group, {
    text: '📣 Atención todos',
    mentions: users
  })
}
