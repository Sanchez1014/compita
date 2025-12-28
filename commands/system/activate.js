// commands/system/activate.js
const fs = require('fs')
const keys = require('../../database/keys.json')
const groups = require('../../database/groups.json')

module.exports = async (sock, msg, args) => {
  const key = args[0]
  const group = msg.key.remoteJid

  if (!keys[key]) {
    return sock.sendMessage(group, { text: '❌ KEY inválida' })
  }

  groups[group] = {
    plan: keys[key].plan,
    expires: Date.now() + keys[key].days * 86400000
  }

  delete keys[key]

  fs.writeFileSync('./database/keys.json', JSON.stringify(keys, null, 2))
  fs.writeFileSync('./database/groups.json', JSON.stringify(groups, null, 2))

  sock.sendMessage(group, {
    text: `✅ COMPITA ACTIVADO\nPlan: ${groups[group].plan}`
  })
}
