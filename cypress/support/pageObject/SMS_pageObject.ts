import {accessToken, smsRequest} from "./global";
import {MessageEnum} from "../messageEnum/messageEnum.enum";

export class SMSMethods {
    getSmsRequest(message: string = MessageEnum.ValidMessage, phone: string = MessageEnum.ValidPhone, sender: string = MessageEnum.ValidSender){
        return {
            async: true,
            crossDomain: true,
            url: "http://apir.int.amdtelecom.net/sms",
            method: "POST",
            headers: {
                authorization: `Bearer ${accessToken}`,
                'content-type': "application/json"
            },
            processData: false,
            body: {
                "body": message,
                "to": phone,
                "from": sender,
                "urlShortener": {
                    "urlValidity": 3600
                  },
                "label": sender,
                "flash": true,
                "transcode": "true"
              },
            failOnStatusCode: false
        };
    };
    getSmsIndiaRequest() {
        return {
            async: true,
            crossDomain: true,
            url: "http://apir.int.amdtelecom.net/sms",
            method: "POST",
            headers: {
                authorization: `Bearer ${accessToken}`,
                'content-type': "application/json"
            },
            processData: false,
            body: {
                "body": MessageEnum.ValidMessage,
                "restrictions": {
                    "india": {
                        "templateId": "1234755000006",
                        "entityId": "9876543000021"
                    }
                },
                "to": MessageEnum.ValidPhone,
                "from": MessageEnum.ValidSender,
                "flash": true
              },
            failOnStatusCode: false
        };
    }
    SMSSendValidCheck() {
        cy.request(smsRequest).then((response) => {
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
        cy.request(smsRequest).then((response) => {
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
        cy.request(smsRequest).then((response) => {
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
        cy.request(smsRequest).then((response) => {
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
    SMSSendInvalidBalanceCheck() {
        cy.request(smsRequest).then((response) => {
            expect(response.status).to.eq(MessageEnum.Status400)
            expect(response.body.code).to.eq(MessageEnum.InvalidBalanceCode)
            expect(response.body.developerMessage).to.eq(MessageEnum.InvalidBalanceMessage)
        });
    };
    SMSSendInvalidTokenCheck() {
        cy.request(smsRequest).then((response) => {
            expect(response.status).to.eq(MessageEnum.Status401)
            expect(response.body.error).to.eq(MessageEnum.InvalidTokenMessage)
        });
    };
    SMSSendInvalidFieldCheck() {
        cy.request(smsRequest).then((response) => {
            expect(response.status).to.eq(MessageEnum.Status400)
            expect(response.body.code).to.eq(MessageEnum.InvalidFieldCode)
        });
    };
    SMSSendInvalidSenderCheck() {
        cy.request(smsRequest).then((response) => {
            expect(response.status).to.eq(MessageEnum.Status400)
            expect(response.body.code).to.eq(MessageEnum.InvalidSenderCode)
        });
    };
    AccessResponseTimeCheck() {
        cy.request(smsRequest).then((response) => {
            expect(response.duration).to.lessThan(3000)
        });
    };
};