import {assessRequest, base64Token, setAccessToken, setBase64Token} from "./global";
import {MessageEnum} from "../messageEnum/messageEnum.enum";

export class AccessMethods {
    AccessRequest() {
        return {
            async: true,
            crossDomain: true,
            url: "https://auth.routee.net/oauth/token",
            method: "POST",
            headers: {
                authorization: `Basic ${base64Token}`,
                "content-type": "application/x-www-form-urlencoded"
            },
            body: {
                grant_type: "client_credentials"
            },
            failOnStatusCode: false
        };
    };
    getAccessToken()  {
        setBase64Token(MessageEnum.Base64Token);
        const tokenRequest = this.AccessRequest();
        cy.request(tokenRequest).then((response) => {
            setAccessToken(response.body.access_token);
        });
    };
    AccessValidCheck() {
        cy.request(assessRequest).then((response) => {
            expect(response.status).to.eq(MessageEnum.Status200)
            expect(response.body).to.have.property('access_token')
            expect(response.body.token_type).to.eq(MessageEnum.ValidTokenType)
        });
    };
    AccessInvalidBase64TokenCheck() {
        cy.request(assessRequest).then((response) => {
            expect(response.status).to.eq(MessageEnum.Status401)
            expect(response.body.error).to.eq(MessageEnum.InvalidBase64TokenError)
            expect(response.body.message).to.eq(MessageEnum.InvalidBase64TokenMessage)
        });
    };
};