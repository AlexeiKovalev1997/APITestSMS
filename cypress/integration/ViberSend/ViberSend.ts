import {Then, When} from "cypress-cucumber-preprocessor/steps";
import {MessageEnum} from "../../support/messageEnum/messageEnum.enum";
import {ViberBodyRequest, ViberMethods} from "../../support/pageObject/Viber_pageObject";
import {setAccessToken, setDate, setRequest} from "../../support/pageObject/global";

const Method:ViberMethods = new ViberMethods();
const BodyRequest:ViberBodyRequest = new ViberBodyRequest();

When('I send Viber message', () => {
    setRequest(Method.getViberRequest());
});
When('I send Viber message with Callback', () => {
    setRequest(Method.getViberRequest(BodyRequest.ViberCallback()));
});
When('I send Viber message with Invalid token', () => {
    setAccessToken(MessageEnum.EmptyParam);
    setRequest(Method.getViberRequest());
});
When('I send Viber message without phone', () => {
    setRequest(Method.getViberRequest(BodyRequest.Viber(setDate(),[])));
});
When('I send Viber message with Invalid phone', () => {
    setRequest(Method.getViberRequest(BodyRequest.Viber(setDate(),[MessageEnum.ValidPhone, MessageEnum.InvalidPhone])));
});
When('I send Viber message with Invalid campaignName (less then 2)', () => {
    setRequest(Method.getViberRequest(BodyRequest.Viber("1")));
});
When('I send Viber message with Invalid campaignName (more then 30)', () => {
    setRequest(Method.getViberRequest(BodyRequest.Viber("1".repeat(31))));
});
When('I send Viber message without message', () => {
    setRequest(Method.getViberRequest(BodyRequest.Viber(setDate(),[MessageEnum.ValidPhone, MessageEnum.ValidPhone], BodyRequest.Message(""))));
});
When('I send Viber message with Invalid message (more then 1000)', () => {
    setRequest(Method.getViberRequest(BodyRequest.Viber(setDate(),[MessageEnum.ValidPhone, MessageEnum.ValidPhone], BodyRequest.Message("1".repeat(1001)))));
});
When('I send Viber message without imageURL', () => {
    setRequest(Method.getViberRequest(BodyRequest.Viber(setDate(),[MessageEnum.ValidPhone, MessageEnum.ValidPhone], BodyRequest.Message(MessageEnum.ValidMessage, ""))));
});
When('I send Viber message with Invalid imageURL (more then 62)', () => {
    setRequest(Method.getViberRequest(BodyRequest.Viber(setDate(),[MessageEnum.ValidPhone, MessageEnum.ValidPhone], BodyRequest.Message(MessageEnum.ValidMessage, MessageEnum.imageURL+"1".repeat(62)))));
});
When('I send Viber message without targetUrl', () => {
    setRequest(Method.getViberRequest(BodyRequest.Viber(setDate(),[MessageEnum.ValidPhone, MessageEnum.ValidPhone], BodyRequest.Message(MessageEnum.ValidMessage, MessageEnum.imageURL, ""))));
});
When('I send Viber message without caption', () => {
    setRequest(Method.getViberRequest(BodyRequest.Viber(setDate(),[MessageEnum.ValidPhone, MessageEnum.ValidPhone], BodyRequest.Message(MessageEnum.ValidMessage, MessageEnum.imageURL,MessageEnum.targetUrl, ""))));
});
When('I send Viber message with Invalid caption (more then 30)', () => {
    setRequest(Method.getViberRequest(BodyRequest.Viber(setDate(),[MessageEnum.ValidPhone, MessageEnum.ValidPhone], BodyRequest.Message(MessageEnum.ValidMessage, MessageEnum.imageURL,MessageEnum.targetUrl, "1".repeat(31)))));
});
When('! I send Viber message with Campaign with same name', () => {
    setRequest(Method.getViberRequest(BodyRequest.Viber(MessageEnum.TranscodeMessage)));
});
When('I send Viber message with Invalid ttl (less then 30)', () => {
    setRequest(Method.getViberRequest(BodyRequest.Viber(setDate(),[MessageEnum.ValidPhone, MessageEnum.ValidPhone], BodyRequest.Message(), 29)));
});
When('I send Viber message with Invalid ttl (more then 86400)', () => {
    setRequest(Method.getViberRequest(BodyRequest.Viber(setDate(),[MessageEnum.ValidPhone, MessageEnum.ValidPhone], BodyRequest.Message(), 86401)));
});

Then('Response time is less than 3000 ms', () => {
    Method.AccessResponseTimeCheck();
});
Then('I should have valid Viber message response', () => {
    Method.SMSSendValidCheck();
});
Then('I should have valid Viber message response with Callback', () => {
    Method.SMSSendUrlShortenerValidCheck();
});
Then('I should have Invalid token error', () => {
    Method.SMSSendInvalidTokenCheck();
});
Then('I should have Invalid value of a field', () => {
    Method.SMSSendInvalidFieldCheck();
});
Then('I should have Invalid Viber message with Campaign with same name', () => {
    Method.SMSSendInvalidSenderCheck();
});
Then('I should have Insufficient Balance error', () => {
    Method.SMSSendInvalidBalanceCheck();
});