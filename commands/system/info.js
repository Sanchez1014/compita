module.exports = async (sock, msg, args, isGroup) => {
  const from = msg.key.remoteJid;

  const contactMessage = {
    contacts: {
      displayName: 'Miguel Sánchez',
      contacts: [
        {
          vcard: `
BEGIN:VCARD
VERSION:3.0
FN:Miguel Sánchez
TEL;type=CELL;type=VOICE;waid=18186743565:+1 818 674 3565
END:VCARD
          `.trim()
        }
      ]
    }
  };

  await sock.sendMessage(from, contactMessage);

  await sock.sendMessage(from, {
    text: '📞 Este es el contacto principal de Compita.'
  });
};