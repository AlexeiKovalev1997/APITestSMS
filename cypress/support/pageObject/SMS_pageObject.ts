import {accessToken, base64Token, setAccessToken, setBase64Token, smsRequest} from "./global";
import {MessageEnum} from "../messageEnum/messageEnum.enum";

export class SMSMethods {
    getSmsRequest(message: string = MessageEnum.ValidMessage, phone: string = MessageEnum.ValidPhone, sender: string = MessageEnum.ValidSender){
        return {
            async: true,
            crossDomain: true,
            url: "https://connect.routee.net/sms",
            method: "POST",
            headers: {
                authorization: `Bearer ${accessToken}`,
                'content-type': "application/json"
            },
            processData: false,
            body: {
                data: {body: message,to : phone,from: sender}
            },
            failOnStatusCode: false
        };
    };
    SMSSendValidCheck() {
        cy.request(smsRequest).then((response) => {
            expect(response.status).to.eq(MessageEnum.Status200)
            expect(response.body.status).to.eq(MessageEnum.ValidQueuedStatus)
            expect(response.body.from).to.eq(MessageEnum.ValidMessage)
            expect(response.body.to).to.eq(MessageEnum.ValidPhone)
            expect(response.body.body).to.eq(MessageEnum.ValidSender)
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
};