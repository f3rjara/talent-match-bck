const { createBot, createProvider, createFlow } = require("@bot-whatsapp/bot");
const BaileysProvider = require("@bot-whatsapp/provider/baileys");
const JsonFileAdapter = require("@bot-whatsapp/database/json");
const { flowBienvenida, flowContactInformation, flowProfessionalSummary, flowWorkExperience, flowEducation, flowSkills } = require("./flows");

const QRPortalWeb = require("@bot-whatsapp/portal");

const startBot = (port) => {
    const adapterDB = new JsonFileAdapter();
    const adapterFlow = createFlow([flowBienvenida, flowContactInformation, flowProfessionalSummary, flowWorkExperience, flowEducation, flowSkills]);
    const adapterProvider = createProvider(BaileysProvider);

    createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    });

    QRPortalWeb({ port });
    console.log(`Bot de WhatsApp corriendo en el puerto ${port}`);
};

module.exports = { startBot };
