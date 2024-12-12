const googleAI = require("../config/google-ai.config");
const model = googleAI.getGenerativeModel({ model: "gemini-1.5-flash" });
const { questions, analysisResponses } = require("../promts");
const aspirantService = require("./aspirant.service");

const generateQuestion = async (
  fase
) => {
  try {
    console.log("fase", fase);
    console.log("questions fase", questions[fase]);

    const chat = model.startChat({
      history: [
        {
          role: "user",
          parts: [{ text: questions.initial }],
        }
      ],
    });
    // generationConfig: {
    //   maxOutputTokens: 200,
    // },

    const result = await chat.sendMessage(questions[fase]);
    const responseText = result.response;
    const text = responseText.text();
    //const response = await result.response.candidates[0].content.parts[0].text;
    const cleanedJson = text.replace(/```json|```/g, "").trim();
    return JSON.parse(cleanedJson).naturalResponse;
  } catch (error) {
    console.error(
      "Error generating response from Google Generative AI:",
      error
    );
    throw new Error("Failed to generate text");
  }
};

// Step 2
const analysisResponsesInformation = async (
  fase,
  userResponse,
  phoneFrom
) => {
  try {
    console.log("fase", fase);
    console.log("analysisResponses fase", analysisResponses[fase]);

    const chat = model.startChat({
      history: [
        {
          role: "user",
          parts: [{ text: analysisResponses.initial }],
        },
        {
          role: "user",
          parts: [{ text: analysisResponses[fase] }],
        },
        {
          role: "user",
          parts: [{ text: "Únicamente responde con el formato de JSON solicitado" }],
        }
      ],
    });
    // generationConfig: {
    //   maxOutputTokens: 200,
    // },

    const result = await chat.sendMessage(`La respuesta del usuario aspirante fue: ${userResponse}`);
    console.log("result", JSON.stringify(result));
    const responseText = result.response;
    const text = responseText.text();
    console.log("text", text);
    //const response = await result.response.candidates[0].content.parts[0].text;
    const cleanedJson = text.replace(/```json|```/g, "").trim();
    const jsonParsed = JSON.parse(cleanedJson)
    await saveResponse(fase, jsonParsed.parserResponse, phoneFrom, userResponse);

    return jsonParsed.naturalResponse;

    if (response_schema) {
      try {
        return JSON.parse(text);
      } catch (jsonError) {
        console.error("Error parsing response as JSON:", jsonError);
        console.warn("Returning raw text response instead.");
        return text;
      }
    } else {
      return text;
    }
  } catch (error) {
    console.error(
      "Error generating response from Google Generative AI:",
      error
    );
    throw new Error("Failed to generate text");
  }
};

let user = null;

const saveResponse = async (
  fase,
  parserResponse,
  phoneFrom,
  userResponse
) => {
  try {
    console.log("fase", fase);
    console.log("parserResponse", parserResponse);
    console.log("phoneFrom", phoneFrom);

    switch (fase) {
      case 'contactInformation':
        user = await aspirantService.create(
          {
            phoneIdentificator: phoneFrom,
            contactInformation: {
              name: parserResponse.name ?? "",
              lastname: parserResponse.lastname ?? "",
              address: parserResponse.address ?? "",
              phone: parserResponse.phone ?? "",
              email: parserResponse.email ?? "",
              documentNumber: parserResponse.documentNumber ?? "",
            },
            professionalSummary: "",
            workExperience: [],
            education: [],
            technicalSkills: "",
            softSkills: "",
            languages: ""
          }
        )
        break;
      case 'professionalSummary':
        user.professionalSummary = userResponse;
        await aspirantService.update(
          user._id,
          user
          );
        break;
      case 'workExperience':
      case 'education':
        user[fase] = [...parserResponse[fase]];
        await aspirantService.update(
          user._id,
          user
        );
        break;
      case 'skills':
        user.technicalSkills = parserResponse.technicalSkills;
        user.softSkills = parserResponse.softSkills;
        user.languages = parserResponse.languages;
        await aspirantService.update(
          user._id,
          user
        );
        break;
    }

  } catch (error) {
    console.error(
      "Error generating response from Google Generative AI:",
      error
    );
    throw new Error("Failed to generate text");
  }
};

module.exports = { generateQuestion, analysisResponsesInformation };
