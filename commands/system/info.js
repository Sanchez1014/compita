module.exports = {
  name: '!info',

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
TEL;type=CELL;type=VOICE;waid=19234567890:+1 818 674 3565
END:VCARD
            `.trim()
          }
        ]
      }
    };

    await sock.sendMessage(from, contactMessage);
    await sock.sendMessage(from, { text: '📞 Este es el contacto principal de Compita. Para soporte o renta, escríbele directamente.' });
  }
};