import {Then, When} from "cypress-cucumber-preprocessor/steps";
import {MessageEnum} from "../../support/messageEnum/messageEnum.enum";
import {SMSBodyRequest, SMSMethods} from "../../support/pageObject/SMS_pageObject";
import {setAccessToken, setRequest} from "../../support/pageObject/global";

const Method: SMSMethods = new SMSMethods();
const BodyRequest:SMSBodyRequest = new SMSBodyRequest();

When('I send SMS with label, transcode, flash', () => {
    setRequest(Method.getSmsRequest(BodyRequest.SMS()));
});
When('I send SMS with shorten URL', () => {
    setRequest(Method.getSmsRequest(BodyRequest.SMS(MessageEnum.ValidMessage + ' ' + MessageEnum.urlShortener)));
});
When('I send SMS with Callback', () => {
    setRequest(Method.getSmsRequest(BodyRequest.Callback()));
});
When('I send SMS from vn to vn', () => {
    setRequest(Method.getSmsRequest(BodyRequest.SMS(MessageEnum.ValidMessage,MessageEnum.FirstVN,MessageEnum.SecondVN)));
});
When('I send SMS with multiple parts', () => {
    setRequest(Method.getSmsRequest(BodyRequest.SMS(MessageEnum.ValidMessage.repeat(500))));
});
When('I send SMS with regulator with India', () => {
    setRequest(Method.getSmsRequest(BodyRequest.India()));
});
When('I send SMS with Invalid token', () => {
    setAccessToken(MessageEnum.EmptyParam);
    setRequest(Method.getSmsRequest(BodyRequest.SMS()));
});
When('I send SMS without message', () => {
    setRequest(Method.getSmsRequest(BodyRequest.SMS(MessageEnum.EmptyParam)));
});
When('I send SMS without phone', () => {
    setRequest(Method.getSmsRequest(BodyRequest.SMS(MessageEnum.ValidMessage,MessageEnum.EmptyParam)));
});
When('I send SMS with Invalid phone', () => {
    setRequest(Method.getSmsRequest(BodyRequest.SMS(MessageEnum.ValidMessage,MessageEnum.InvalidPhone)));
});
When('I send SMS without sender', () => {
    setRequest(Method.getSmsRequest(BodyRequest.SMS(MessageEnum.ValidMessage,MessageEnum.ValidPhone,MessageEnum.EmptyParam)));
});
When('I send SMS with Invalid sender', () => {
    setRequest(Method.getSmsRequest(BodyRequest.SMS(MessageEnum.ValidMessage,MessageEnum.ValidPhone,MessageEnum.InvalidPhone)));
});
When('I send SMS with untranscode message', () => {
    setRequest(Method.getSmsRequest(BodyRequest.SMS(MessageEnum.TranscodeMessage)));
});

Then('Response time is less than 3000 ms', () => {
    Method.AccessResponseTimeCheck();
});
Then('I should have valid SMS response', () => {
    Method.SMSSendValidCheck();
});
Then('I should have valid urlShortener SMS response', () => {
    Method.SMSSendUrlShortenerValidCheck();
});
Then('I should have valid multiple parts SMS response', () => {
    Method.SMSSendMultiplePartsValidCheck();
});
Then('I should have valid transcode message SMS response', () => {
    Method.SMSSendTransecodeValidCheck();
});
Then('I should have Insufficient Balance error', () => {
    Method.SMSSendInvalidBalanceCheck();
});
Then('I should have Invalid token error', () => {
    Method.SMSSendInvalidTokenCheck();
});
Then('I should have Invalid value of a field', () => {
    Method.SMSSendInvalidFieldCheck();
});
Then('I should have Invalid sender of a field', () => {
    Method.SMSSendInvalidSenderCheck();
});
Then('I should have valid SMS response with Callback', () => {
    Method.SMSSendCallbackValidCheck();
});