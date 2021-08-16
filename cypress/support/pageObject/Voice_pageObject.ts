import {accessToken, setDate, Request} from "./global";
import {MessageEnum} from "../messageEnum/messageEnum.enum";

export class VoiceBodyRequest{
    Message(text:string = MessageEnum.ValidMessage, language:string = MessageEnum.USLanguageCode, gender:string = "female") {
        return {
            "text": text,
            "language": language,
            "gender":gender
        }
    };
    Voice(message:object = this.Message(), phone: Array<any> = [MessageEnum.ValidPhone, MessageEnum.ValidPhone], sender: string = MessageEnum.ValidSender){
       return {
            "name": setDate(),
            "from": sender,
            "to":phone,
            "message": message
        }
    };
    VoiceDTMF(message:string = MessageEnum.urlDTMF, phone: Array<any> = [MessageEnum.ValidPhone, MessageEnum.ValidPhone], sender: string = MessageEnum.ValidSender){
        return {
             "name": setDate(),
             "from": sender,
             "to":phone,
             "collectDtmfDigits": "true",
             "hangupDelay":19,
             "fileURL": message
         }
     };
     VoiceCallback(message:object = this.Message(), phone: Array<any> = [MessageEnum.ValidPhone, MessageEnum.ValidPhone], sender: string = MessageEnum.ValidSender){
        return {
             "name": setDate(),
             "from": sender,
             "to":phone,
             "message": message,
             "callback": {
                "strategy": MessageEnum.ValidStrategyType,
                "url": MessageEnum.urlShortener
            },
              "campaignCallback": {
                "strategy": MessageEnum.ValidStrategyType,
                "url": MessageEnum.urlShortener
              }
         }
     };
};
const BodyRequest = new VoiceBodyRequest();
export class VoiceMethods {
    getVoiceRequest(Body: object = BodyRequest.Voice){
        return {
            async: true,
            crossDomain: true,
            url: MessageEnum.VoiceUrl,
            method: "POST",
            headers: {
                authorization: `Bearer ${accessToken}`,
                'content-type': "application/json"
            },
            processData: false,
            body: Body,
            failOnStatusCode: false
        };
    };
    SMSSendValidCheck() {
        cy.request(Request).then((response) => {
            expect(response.status).to.eq(MessageEnum.Status200)
            expect(response.body.status).to.eq(MessageEnum.ValidQueuedStatus)
            expect(response.body.body).to.eq(MessageEnum.ValidMessage)
            expect(response.body.to).to.eq(MessageEnum.ValidPhone)
            expect(response.body.from).to.eq(MessageEnum.ValidSender)
            expect(response.body.flash).to.eq(true)
            expect(response.body).to.haveOwnProperty(MessageEnum.TrackingIDProperty)
            expect(response.body).to.haveOwnProperty(MessageEnum.CreatedAtProperty)
            expect(response.body.bodyAnalysis.parts).to.greaterThan(0)
            expect(response.body.bodyAnalysis.characters).to.greaterThan(0)
            expect(response.body.bodyAnalysis).to.haveOwnProperty(MessageEnum.UnicodeProperty)
        });
    };
    SMSSendUrlShortenerValidCheck() {
        cy.request(Request).then((response) => {
            expect(response.status).to.eq(MessageEnum.Status200)
            expect(response.body.status).to.eq(MessageEnum.ValidQueuedStatus)
            expect(response.body.body).to.include(MessageEnum.ValidMessage + ' https://nikos-green.com/')
            expect(response.body.to).to.eq(MessageEnum.ValidPhone)
            expect(response.body.from).to.eq(MessageEnum.ValidSender)
            expect(response.body.flash).to.eq(true)
            expect(response.body).to.haveOwnProperty(MessageEnum.TrackingIDProperty)
            expect(response.body).to.haveOwnProperty(MessageEnum.CreatedAtProperty)
            expect(response.body.bodyAnalysis.parts).to.greaterThan(0)
            expect(response.body.bodyAnalysis.characters).to.greaterThan(0)
            expect(response.body.bodyAnalysis).to.haveOwnProperty(MessageEnum.UnicodeProperty)
        });
    };
    SMSSendMultiplePartsValidCheck() {
        cy.request(Request).then((response) => {
            expect(response.status).to.eq(MessageEnum.Status200)
            expect(response.body.status).to.eq(MessageEnum.ValidQueuedStatus)
            expect(response.body.body).to.eq(MessageEnum.ValidMessage.repeat(500))
            expect(response.body.to).to.eq(MessageEnum.ValidPhone)
            expect(response.body.from).to.eq(MessageEnum.ValidSender)
            expect(response.body.flash).to.eq(true)
            expect(response.body).to.haveOwnProperty(MessageEnum.TrackingIDProperty)
            expect(response.body).to.haveOwnProperty(MessageEnum.CreatedAtProperty)
            expect(response.body.bodyAnalysis.parts).to.greaterThan(1)
            expect(response.body.bodyAnalysis.characters).to.greaterThan(0)
            expect(response.body.bodyAnalysis).to.haveOwnProperty(MessageEnum.UnicodeProperty)
        });
    };
    SMSSendTransecodeValidCheck() {
        cy.request(Request).then((response) => {
            expect(response.status).to.eq(MessageEnum.Status200)
            expect(response.body.status).to.eq(MessageEnum.ValidQueuedStatus)
            expect(response.body.body).to.eq(MessageEnum.UnTranscodeMessage)
            expect(response.body.to).to.eq(MessageEnum.ValidPhone)
            expect(response.body.from).to.eq(MessageEnum.ValidSender)
            expect(response.body.flash).to.eq(true)
            expect(response.body).to.haveOwnProperty(MessageEnum.TrackingIDProperty)
            expect(response.body).to.haveOwnProperty(MessageEnum.CreatedAtProperty)
            expect(response.body.bodyAnalysis.parts).to.greaterThan(0)
            expect(response.body.bodyAnalysis.characters).to.greaterThan(0)
            expect(response.body.bodyAnalysis).to.haveOwnProperty(MessageEnum.UnicodeProperty)
        });
    };
    SMSSendCallbackValidCheck() {
        cy.request(Request).then((response) => {
            expect(response.status).to.eq(MessageEnum.Status200)
            expect(response.body.status).to.eq(MessageEnum.ValidQueuedStatus)
            expect(response.body.body).to.eq(MessageEnum.ValidMessage)
            expect(response.body.to).to.eq(MessageEnum.ValidPhone)
            expect(response.body.from).to.eq(MessageEnum.ValidSender)
            expect(response.body.flash).to.eq(false)
            expect(response.body).to.haveOwnProperty(MessageEnum.TrackingIDProperty)
            expect(response.body).to.haveOwnProperty(MessageEnum.CreatedAtProperty)
            expect(response.body.bodyAnalysis.parts).to.greaterThan(0)
            expect(response.body.bodyAnalysis.characters).to.greaterThan(0)
            expect(response.body.bodyAnalysis).to.haveOwnProperty(MessageEnum.UnicodeProperty)
            expect(response.body.callback.strategy).to.eq(MessageEnum.ValidStrategyType)
        });
    };
    SMSSendInvalidBalanceCheck() {
        cy.request(Request).then((response) => {
            expect(response.status).to.eq(MessageEnum.Status400)
            expect(response.body.code).to.eq(MessageEnum.InvalidBalanceCode)
            expect(response.body.developerMessage).to.eq(MessageEnum.InvalidBalanceMessage)
        });
    };
    SMSSendInvalidTokenCheck() {
        cy.request(Request).then((response) => {
            expect(response.status).to.eq(MessageEnum.Status401)
            expect(response.body.error).to.eq(MessageEnum.InvalidTokenMessage)
        });
    };
    SMSSendInvalidFieldCheck() {
        cy.request(Request).then((response) => {
            expect(response.status).to.eq(MessageEnum.Status400)
            expect(response.body.code).to.eq(MessageEnum.InvalidFieldCode)
        });
    };
    SMSSendInvalidSenderCheck() {
        cy.request(Request).then((response) => {
            expect(response.status).to.eq(MessageEnum.Status400)
            expect(response.body.code).to.eq(MessageEnum.InvalidSenderCode)
        });
    };
    AccessResponseTimeCheck() {
        cy.request(Request).then((response) => {
            expect(response.duration).to.lessThan(3000)
        });
    };
};