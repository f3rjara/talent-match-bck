const { createBot, createProvider, createFlow, addKeyword, EVENTS } = require('@bot-whatsapp/bot')
const googleAIService = require("./src/services/google-ai.service");

const QRPortalWeb = require('@bot-whatsapp/portal')
const BaileysProvider = require('@bot-whatsapp/provider/baileys')
const JsonFileAdapter = require('@bot-whatsapp/database/json')

const flowPrincipal = addKeyword(EVENTS.WELCOME)
    .addAction(async (ctx, ctxFn) => {
    let text = ctx.body;
    const response = await googleAIService.generateResponseModelTwo(text)
    ctxFn.flowDynamic(response)
    })


    const main = async () => {
    const adapterDB = new JsonFileAdapter()
    const adapterFlow = createFlow([flowPrincipal])
    const adapterProvider = createProvider(BaileysProvider)

    createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    })

    QRPortalWeb()
}

main()
