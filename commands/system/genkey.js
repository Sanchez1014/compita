// commands/system/genkey.js
const { ownerNumber } = require('../../config')
const fs = require('fs')
const keys = require('../../database/keys.json')

function makeKey() {
  return 'COMPITA-' + Math.random().toString(36).substring(2, 10).toUpperCase()
}

module.exports = async (sock, msg, args) => {
  const sender = msg.key.participant || msg.key.remoteJid

  if (sender !== ownerNumber) {
    return sock.sendMessage(msg.key.remoteJid, {
      text: '❌ No autorizado'
    })
  }

  const plan = args[0] || 'basic'
  const days = Number(args[1]) || 30

  const key = makeKey()
  keys[key] = { plan, days }

  fs.writeFileSync('./database/keys.json', JSON.stringify(keys, null, 2))

  sock.sendMessage(sender, {
    text: `🔑 KEY GENERADA\n\n${key}\nPlan: ${plan}\nDías: ${days}`
  })
}
