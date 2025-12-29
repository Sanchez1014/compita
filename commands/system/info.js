const { prefix } = require('../../config')

module.exports = {
  name: `${prefix}info`,

  async execute(sock, msg) {
    const from = msg.key.remoteJid;

    const contactMessage = {
      contacts: {
        displayName: 'Sánchez',
        contacts: [
          {
            vcard: `
BEGIN:VCARD
VERSION:3.0
FN:Miguel Sánchez
TEL;type=CELL;type=VOICE;waid=5219999999999:+1 818 674 3565
END:VCARD
            `.trim()
          }
        ]
      }
    };

    await sock.sendMessage(from, contactMessage);
    await sock.sendMessage(from, { text: 'Contacto principal de Compita.' });
  }
};