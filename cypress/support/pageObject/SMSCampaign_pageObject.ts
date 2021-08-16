import {accessToken, setDate, Request} from "./global";
import {MessageEnum} from "../messageEnum/messageEnum.enum";

export class SMSCampaignBodyRequest {
    Campaigns(message: string = MessageEnum.ValidMessage, phone: Array<any> = [MessageEnum.ValidPhone, MessageEnum.ValidPhone], sender: string = MessageEnum.ValidSender){
        return {
            "campaignName": setDate(),
            "body": message, 
            "to" :phone,
            "from": sender,
            "label": sender,
            "flash": true,
            "transcode": "true",
            "urlShortener": {
                "urlStrategy": "MULTIPLE",
                "urlValidity": 3600
            }
          }
    }
    CampaignsCallback(phone: Array<any> = [MessageEnum.ValidPhone, MessageEnum.ValidPhone]){
        return {
            "campaignName": setDate(),
            "body": MessageEnum.ValidMessage, 
            "to" :phone,
            "from": MessageEnum.ValidSender,
            "campaignCallback": {
            "strategy": MessageEnum.ValidStrategyType,
            "url": MessageEnum.urlShortener
            },
            "callback": {
                "strategy": MessageEnum.ValidStrategyType,
                "url": MessageEnum.urlShortener
            }
          }
    }
    CampaignsIndia(){
        return {
            "campaignName": setDate(),
            "body": MessageEnum.ValidMessage, 
            "restrictions": {
                "india": {
                "templateId": "1234755000006",
                "entityId": "9876543000021"
                        }
                    },
            "to":[MessageEnum.ValidPhone, MessageEnum.ValidPhone],
            "from": MessageEnum.ValidSender
          }
    };
    CampaignsCallbackGroup(){
        return {
            "campaignName": setDate(),
            "body": MessageEnum.ValidMessage, 
            "to":[MessageEnum.ValidGroup],
            "from": MessageEnum.ValidSender,
            "urlShortener": {
                "urlStrategy": "MULTIPLE",
                "urlValidity": 3600
            },
          "campaignCallback": {
            "strategy": MessageEnum.ValidStrategyType,
            "url": MessageEnum.urlShortener
          },
          "callback": {
            "strategy": MessageEnum.ValidStrategyType,
            "url": MessageEnum.urlShortener
          }
        }
    };
};
const BodyRequest = new SMSCampaignBodyRequest();
export class SMSCampaignMethods {
    getSmsCampaignRequest(Body: object = BodyRequest.Campaigns){
        return {
            async: true,
            crossDomain: true,
            url: MessageEnum.CompaingUrl,
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