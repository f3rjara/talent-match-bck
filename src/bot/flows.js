const { addKeyword, EVENTS } = require("@bot-whatsapp/bot");
const googleAIService = require("../services/google-ai.service");

let vacancyId = null;

// Flujo de bienvenida
const flowBienvenida = addKeyword(EVENTS.WELCOME)
    .addAnswer(
        [ "👋" ],
        null,
        async (ctx, ctxFn) => {
            try {
                const inputMessage = ctx.body
                console.log("inputMessage", inputMessage);
                const response = await googleAIService.generateQuestion("welcome")
                vacancyId = Number(inputMessage.split('#')[1].split(':')[1]);
                console.log("vacancy id", vacancyId);
                ctxFn.flowDynamic([{ body: response }]); // Responde dinámicamente al usuario
            } catch (error) {
                ctxFn.flowDynamic("Lo siento, no pude generar una respuesta en este momento.");
            }
        }
    );

// Flujo de información de contacto
const flowContactInformation = addKeyword(["Iniciar"])
    .addAnswer("¡Perfecto! Vamos a comenzar con la creación de tu CV.")
    .addAction(
        async (ctx, ctxFn) => {
            try {
            const response = await googleAIService.generateQuestion("contactInformation")
            ctxFn.flowDynamic([{ body: response }]); // Pide información al usuario
            } catch (error) {
                ctxFn.flowDynamic("Lo siento, no pude generar una respuesta en este momento.");
            }
        }
    )
    .addAction(
        { capture: true},
        async (ctx, ctxFn) => {
            try {
                const userResponse  = ctx.body;
                console.log("userResponse", userResponse );
                console.log("ctx.from", ctx.from );
                const response = await googleAIService.analysisResponsesInformation(
                    "contactInformation",
                    userResponse,
                    ctx.from,
                    vacancyId); // Llama al servicio de Google AI
                console.log("response", response);
                ctxFn.flowDynamic([{ body: response }]); // Responde con el texto generado
                await ctxFn.gotoFlow(flowProfessionalSummary)
            } catch (error) {
                console.error("Error en Google AI:", error);
                ctxFn.flowDynamic("Lo siento, no pude generar una respuesta en este momento.");
            }
        }
    );

// Flujo de presentación
const flowProfessionalSummary = addKeyword(EVENTS.ACTION)    
    .addAnswer("¡Perfecto! Vamos a continuar con una pequeña presentación.")
    .addAction(
        async (ctx, ctxFn) => {
            try {
            const response = await googleAIService.generateQuestion("professionalSummary")
            ctxFn.flowDynamic([{ body: response }]); // Pide información al usuario
            } catch (error) {
                ctxFn.flowDynamic("Lo siento, no pude generar una respuesta en este momento.");
            }
        }
    )
    .addAction(
        { capture: true},
        async (ctx, ctxFn) => {
            try {
                const userResponse  = ctx.body;
                console.log("userResponse", userResponse );
                const response = await googleAIService.analysisResponsesInformation("professionalSummary", userResponse ); // Llama al servicio de Google AI
                console.log("response", response);
                ctxFn.flowDynamic([{ body: response }]); // Responde con el texto generado
                await ctxFn.gotoFlow(flowWorkExperience)
            } catch (error) {
                console.error("Error en Google AI:", error);
                ctxFn.flowDynamic("Lo siento, no pude generar una respuesta en este momento.");
            }
        }
    );

// Flujo de workExperience
const flowWorkExperience = addKeyword(EVENTS.ACTION)   
    .addAnswer("¡Perfecto! Vamos a continuar con tu experiencia.")
    .addAction(
        async (ctx, ctxFn) => {
            try {
            const response = await googleAIService.generateQuestion("workExperience")
            ctxFn.flowDynamic([{ body: response }]); // Pide información al usuario
            } catch (error) {
                ctxFn.flowDynamic("Lo siento, no pude generar una respuesta en este momento.");
            }
        }
    )
    .addAction(
        { capture: true},
        async (ctx, ctxFn) => {
            try {
                const userResponse  = ctx.body;
                console.log("userResponse", userResponse );
                const response = await googleAIService.analysisResponsesInformation("workExperience", userResponse ); // Llama al servicio de Google AI
                console.log("response", response);
                ctxFn.flowDynamic([{ body: response }]); // Responde con el texto generado
                await ctxFn.gotoFlow(flowEducation)
            } catch (error) {
                console.error("Error en Google AI:", error);
                ctxFn.flowDynamic("Lo siento, no pude generar una respuesta en este momento.");
            }
        }
    );

// Flujo de education
const flowEducation = addKeyword(EVENTS.ACTION)  
    .addAnswer("¡Perfecto! Vamos a continuar con tu formación académica.")
    .addAction(
        async (ctx, ctxFn) => {
            try {
            const response = await googleAIService.generateQuestion("education")
            ctxFn.flowDynamic([{ body: response }]); // Pide información al usuario
            } catch (error) {
                ctxFn.flowDynamic("Lo siento, no pude generar una respuesta en este momento.");
            }
        }
    )
    .addAction(
        { capture: true},
        async (ctx, ctxFn) => {
            try {
                const userResponse  = ctx.body;
                console.log("userResponse", userResponse );
                const response = await googleAIService.analysisResponsesInformation("education", userResponse ); // Llama al servicio de Google AI
                console.log("response", response);
                ctxFn.flowDynamic([{ body: response }]); // Responde con el texto generado
                await ctxFn.gotoFlow(flowSkills)
            } catch (error) {
                console.error("Error en Google AI:", error);
                ctxFn.flowDynamic("Lo siento, no pude generar una respuesta en este momento.");
            }
        }
    );

// Flujo de skills
const flowSkills = addKeyword(EVENTS.ACTION)
    .addAnswer("¡Perfecto! Vamos a continuar con tus habilidades.")
    .addAction(
        async (ctx, ctxFn) => {
            try {
            const response = await googleAIService.generateQuestion("skills")
            ctxFn.flowDynamic([{ body: response }]); // Pide información al usuario
            } catch (error) {
                ctxFn.flowDynamic("Lo siento, no pude generar una respuesta en este momento.");
            }
        }
    )
    .addAction(
        { capture: true},
        async (ctx, ctxFn) => {
            try {
                const userResponse  = ctx.body;
                console.log("userResponse", userResponse );
                const response = await googleAIService.analysisResponsesInformation("skills", userResponse ); // Llama al servicio de Google AI
                console.log("response", response);
                ctxFn.flowDynamic([{ body: response }]); // Responde con el texto generado
            } catch (error) {
                console.error("Error en Google AI:", error);
                ctxFn.flowDynamic("Lo siento, no pude generar una respuesta en este momento.");
            }
        }
    );

module.exports = { flowBienvenida, flowContactInformation, flowProfessionalSummary, flowWorkExperience, flowEducation, flowSkills };

// .addAction(async (ctx, ctxFn) => {
//   try {
//     const text = ctx.body;
//     const response = await googleAIService.generateWelcome(text); // Llama al servicio
//     ctxFn.flowDynamic(response); // Responde dinámicamente al usuario
//   } catch (error) {
//     ctxFn.flowDynamic("Lo siento, no pude generar una respuesta en este momento.");
//   }
// });
