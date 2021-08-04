import {Then, When} from "cypress-cucumber-preprocessor/steps";
import {MessageEnum} from "../../support/messageEnum/messageEnum.enum";
import {SMSMethods} from "../../support/pageObject/SMS_pageObject";
import {setAccessToken, setSmsRequest, smsRequest} from "../../support/pageObject/global";

const smsMethod: SMSMethods = new SMSMethods();
When('I send SMS', () => {
    setSmsRequest(smsMethod.getSmsRequest());
});
When('I send SMS with shorten URL', () => {
    setSmsRequest(smsMethod.getSmsRequest(MessageEnum.ValidMessage + ' ' + MessageEnum.urlShortener));
});
When('I send SMS with multiple parts', () => {
    setSmsRequest(smsMethod.getSmsRequest(MessageEnum.ValidMessage.repeat(500)));
});
When('I send SMS with untranscode message', () => {
    setSmsRequest(smsMethod.getSmsRequest(MessageEnum.TranscodeMessage));
});
When('I send SMS with Invalid token', () => {
    setAccessToken(MessageEnum.EmptyParam);
    setSmsRequest(smsMethod.getSmsRequest());
});
When('I send SMS without message', () => {
    setSmsRequest(smsMethod.getSmsRequest(MessageEnum.EmptyParam));
});
When('I send SMS without phone', () => {
    setSmsRequest(smsMethod.getSmsRequest(MessageEnum.ValidMessage,MessageEnum.EmptyParam));
});
When('I send SMS Campaigns', () => {
    setSmsRequest(smsMethod.getSmsCampaignsRequest());
});
When('When I send SMS Campaigns with regulator with India', () => {
    setSmsRequest(smsMethod.getSmsCampaignsIndiaRequest());
});
When('I send SMS with Invalid phone', () => {
    setSmsRequest(smsMethod.getSmsRequest(MessageEnum.ValidMessage,MessageEnum.InvalidPhone));
});
When('I send SMS without sender', () => {
    setSmsRequest(smsMethod.getSmsRequest(MessageEnum.ValidMessage,MessageEnum.ValidPhone,MessageEnum.EmptyParam));
});
When('I send SMS with Invalid sender', () => {
    setSmsRequest(smsMethod.getSmsRequest(MessageEnum.ValidMessage,MessageEnum.ValidPhone,MessageEnum.InvalidPhone));
});
When('I send SMS with regulator with India', () => {
    setSmsRequest(smsMethod.getSmsIndiaRequest());
});
When('I send SMS with Callback', () => {
    setSmsRequest(smsMethod.getSmsCallbackRequest());
});
Then('Response time is less than 3000 ms', () => {
    smsMethod.AccessResponseTimeCheck();
});
Then('I should have valid SMS response', () => {
    smsMethod.SMSSendValidCheck();
});
Then('I should have valid urlShortener SMS response', () => {
    smsMethod.SMSSendUrlShortenerValidCheck();
});
Then('I should have valid multiple parts SMS response', () => {
    smsMethod.SMSSendMultiplePartsValidCheck();
});
Then('I should have valid transcode message SMS response', () => {
    smsMethod.SMSSendTransecodeValidCheck();
});
Then('I should have Insufficient Balance error', () => {
    smsMethod.SMSSendInvalidBalanceCheck();
});
Then('I should have Invalid token error', () => {
    smsMethod.SMSSendInvalidTokenCheck();
});
Then('I should have Invalid value of a field', () => {
    smsMethod.SMSSendInvalidFieldCheck();
});
Then('I should have Invalid sender of a field', () => {
    smsMethod.SMSSendInvalidSenderCheck();
});
Then('I should have valid SMS response with Callback', () => {
    smsMethod.SMSSendCallbackValidCheck();
});
Then('I should have valid SMS Campaigns', () => {
    smsMethod.SMSSendCampaign();
});
Then('I should have valid SMS Campaign India response', () => {
    smsMethod.SMSSendCampaign();
});

