/* *
 * This sample demonstrates handling intents from an Alexa skill using the Alexa Skills Kit SDK (v2).
 * Please visit https://alexa.design/cookbook for additional examples on implementing slots, dialog management,
 * session persistence, api calls, and more.
 * */
const Alexa = require('ask-sdk-core');

const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
    },
    handle(handlerInput) {
        const speakOutput = 'Welcome to workzone!';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            //.reprompt(speakOutput)
            .addDirective({
         'type': 'Connections.StartConnection',
         'uri': 'connection://amzn1.ask.skill.59a6f731-a514-4757-9d15-70b6ae4cb1ab.CountDown/1?provider=amzn1.ask.skill.59a6f731-a514-4757-9d15-70b6ae4cb1ab',
         'onCompletion': 'RESUME_SESSION',
         'input': {
            "lowerLimit": 1,
            "upperLimit": 10
         },
      })
            .getResponse();
    }
};
// const TestIntentHandler = {
//   canHandle(handlerInput) {
//      console.log("Tanuj Kalra, recommendshopping");
//      const request = handlerInput.requestEnvelope.request;
//      return request.type === 'IntentRequest'
//       && request.intent.name === 'TestIntent';
//   },
//   handle(handlerInput) {
//      return handlerInput.responseBuilder
//       .addDirective({
//          'type': 'Connections.StartConnection',
//          'uri': 'connection://amzn1.ask.skill.59a6f731-a514-4757-9d15-70b6ae4cb1ab.CountDown/1?provider=amzn1.ask.skill.59a6f731-a514-4757-9d15-70b6ae4cb1ab',
//          'onCompletion': 'RESUME_SESSION',
//          'input': {
//             "lowerLimit": 1,
//             "upperLimit": 10
//          },
//       })
//       .getResponse();
//   }
// };
const SessionResumedRequestHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'SessionResumedRequest';
  },
  handle(handlerInput) {
    const status = handlerInput.requestEnvelope.request.cause.status;
    const code = status.code;
    const message = status.message;
    console.log(`SessionResumedRequest received status code : ${code} and message : ${message}`);

    // The current sessionId is same as the one in previous IntentRequest when the original Connections.StartConnection directive was returned.
    const currentSessionId = handlerInput.requestEnvelope.session.sessionId;

    // Continue requester skill experience. In this example, it renders a speech.

    return handlerInput.responseBuilder
        .speak("Requester skill received SessionResumedRequest")
        .getResponse();
  }
};

// const TestIntentRequestHandler = {
//   canHandle(handlerInput) {
//      const request = handlerInput.requestEnvelope.request;
//      return request.type === 'IntentRequest'
//       && request.intent.name === 'TestIntent';
//   },
//   handle(handlerInput) {
//      return handlerInput.responseBuilder
//       .addDirective({
//          'type': 'Connections.StartConnection',
//          'uri': 'connection://AMAZON.RecommendShoppingProducts/1',
//          'onCompletion': 'RESUME_SESSION',
//          'input': {
//           "products": [{
//                             "asin": "B08J8FFJ8H"
//                         }]
//          },
//       })
//       .getResponse();
//   }
// };
// const SessionResumedRequestHandler = {
//   canHandle(handlerInput) {
//     const request = handlerInput.requestEnvelope.request;
//     return request.type === 'SessionResumedRequest';
//   },
//   handle(handlerInput) {
//     const status = handlerInput.requestEnvelope.request.cause.status;
//     const code = status.code;
//     const message = status.message;
//     console.log(`SessionResumedRequest received status code : ${code} and message : ${message}`);

//     // The current sessionId is same as the one in previous IntentRequest when the original Connections.StartConnection directive was returned.
//     const currentSessionId = handlerInput.requestEnvelope.session.sessionId;

//     // Continue requester skill experience. In this example, it renders a speech.

//     return handlerInput.responseBuilder
//         .speak("Requester skill received SessionResumedRequest")
//         .getResponse();
//   }
// };
const PrintPDFTaskHandler = {
    canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        return request.type === 'LaunchRequest'
            && request.task.name === "AMAZON.PrintPDF";
    },
    handle(handlerInput) {
        console.log("Handling AMAZON.PrintPDF task.");

        // Logic to print PDF

        const speechText = "OK, your print is confirmed";

        return handlerInput.responseBuilder
            .speak(speechText)
            .addDirective({
                "type": "Tasks.CompleteTask",
                "status": {
                    "code": "200",
                    "message": "Print succeeded"
                }
            })
            .withShouldEndSession(true)
            .getResponse();
    }
};
const HelloWorldIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'HelloWorldIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'Hello, welcome to my workzone skill!';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};

const HelpIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'You can say hello to me! How can I help?';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && (Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.CancelIntent'
                || Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.StopIntent');
    },
    handle(handlerInput) {
        const speakOutput = 'Goodbye!';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
};
/* *
 * FallbackIntent triggers when a customer says something that doesn’t map to any intents in your skill
 * It must also be defined in the language model (if the locale supports it)
 * This handler can be safely added but will be ingnored in locales that do not support it yet 
 * */
const FallbackIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.FallbackIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'Sorry, I don\'t know about that. Please try again.';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};
/* *
 * SessionEndedRequest notifies that a session was ended. This handler will be triggered when a currently open 
 * session is closed for one of the following reasons: 1) The user says "exit" or "quit". 2) The user does not 
 * respond or says something that does not match an intent defined in your voice model. 3) An error occurs 
 * */
const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        console.log(`~~~~ Session ended: ${JSON.stringify(handlerInput.requestEnvelope)}`);
        // Any cleanup logic goes here.
        return handlerInput.responseBuilder.getResponse(); // notice we send an empty response
    }
};
/* *
 * The intent reflector is used for interaction model testing and debugging.
 * It will simply repeat the intent the user said. You can create custom handlers for your intents 
 * by defining them above, then also adding them to the request handler chain below 
 * */
const IntentReflectorHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest';
    },
    handle(handlerInput) {
        const intentName = Alexa.getIntentName(handlerInput.requestEnvelope);
        const speakOutput = `You just triggered ${intentName}`;

        return handlerInput.responseBuilder
            .speak(speakOutput)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};
/**
 * Generic error handling to capture any syntax or routing errors. If you receive an error
 * stating the request handler chain is not found, you have not implemented a handler for
 * the intent being invoked or included it in the skill builder below 
 * */
const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        const speakOutput = 'Sorry, I had trouble doing what you asked. Please try again.';
        console.log(`~~~~ Error handled: ${JSON.stringify(error)}`);

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

/**
 * This handler acts as the entry point for your skill, routing all request and response
 * payloads to the handlers above. Make sure any new handlers or interceptors you've
 * defined are included below. The order matters - they're processed top to bottom 
 * */
exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        LaunchRequestHandler,
        //TestIntentHandler,
        //CountDownTaskHandler,
        SessionResumedRequestHandler,
        PrintPDFTaskHandler,
        HelloWorldIntentHandler,
        HelpIntentHandler,
        CancelAndStopIntentHandler,
        FallbackIntentHandler,
        SessionEndedRequestHandler,
        IntentReflectorHandler)
    .addErrorHandlers(
        ErrorHandler)
    .withCustomUserAgent('sample/hello-world/v1.2')
    .lambda();