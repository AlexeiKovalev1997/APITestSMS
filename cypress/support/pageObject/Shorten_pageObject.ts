import {accessToken, Request, setDate} from "./global";
import {MessageEnum} from "../messageEnum/messageEnum.enum";

export class ShortenBodyRequest{
    Shorten(long_url:string = MessageEnum.ShortenLong_url, validity:string = MessageEnum.ShortenValidity, domain:string = MessageEnum.ShortenDomain, callbackUrl:string = MessageEnum.ShortenCallbackUrl, name:any = setDate()){
       return {
        "name": name,
        "long_url": long_url,
        "validity": validity,
        "domain": domain,
        "callbackUrl": callbackUrl
      }
    };
};
const BodyRequest = new ShortenBodyRequest();
export class ShortenMethods {
    getShortenRequest(number:number = 2, Body: object = BodyRequest.Shorten){
        return {
            async: true,
            crossDomain: true,
            url: MessageEnum.ShortenUrl,
            method: "POST",
            headers: {
                authorization: `Bearer ${accessToken}`,
                'content-type': "application/json"
            },
            processData: false,
            body: Array(number).fill(Body,),
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