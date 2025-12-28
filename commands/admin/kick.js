module.exports = async (sock, msg) => {
  const group = msg.key.remoteJid
  const user = msg.message.extendedTextMessage?.contextInfo?.mentionedJid?.[0]
  if (!user) return sock.sendMessage(group, { text: '❌ Menciona a alguien' })

  await sock.groupParticipantsUpdate(group, [user], 'remove')
}
