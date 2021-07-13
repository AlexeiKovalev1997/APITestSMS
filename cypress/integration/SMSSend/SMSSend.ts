import {Then, When} from "cypress-cucumber-preprocessor/steps";
import {MessageEnum} from "../../support/messageEnum/messageEnum.enum";
import {AccessMethods} from "../../support/pageObject/Access_pageObject";
import {SMSMethods} from "../../support/pageObject/SMS_pageObject";
import {setAccessToken, setSmsRequest, smsRequest} from "../../support/pageObject/global";

const smsMethod: SMSMethods = new SMSMethods();
When('I send SMS', () => {
    setSmsRequest(smsMethod.getSmsRequest());
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
When('I send SMS with Invalid phone', () => {
    setSmsRequest(smsMethod.getSmsRequest(MessageEnum.ValidMessage,MessageEnum.InvalidPhone));
});
When('I send SMS without sender', () => {
    setSmsRequest(smsMethod.getSmsRequest(MessageEnum.ValidMessage,MessageEnum.ValidPhone,MessageEnum.EmptyParam));
});
When('I send SMS with Invalid sender', () => {
    setSmsRequest(smsMethod.getSmsRequest(MessageEnum.ValidMessage,MessageEnum.ValidPhone,MessageEnum.InvalidPhone));
});
Then('I should have valid SMS response', () => {
    smsMethod.SMSSendValidCheck();
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