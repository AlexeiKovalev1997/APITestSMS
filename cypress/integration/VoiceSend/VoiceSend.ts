import {Then, When} from "cypress-cucumber-preprocessor/steps";
import {MessageEnum} from "../../support/messageEnum/messageEnum.enum";
import {VoiceBodyRequest, VoiceMethods} from "../../support/pageObject/Voice_pageObject";
import {setAccessToken, setRequest} from "../../support/pageObject/global";

const Method: VoiceMethods = new VoiceMethods();
const BodyRequest:VoiceBodyRequest = new VoiceBodyRequest();

When('I send Voice message on greek language with female voice', () => {
    setRequest(Method.getVoiceRequest(BodyRequest.Voice()));
});
When('I send Voice message on english language with male voice', () => {
    setRequest(Method.getVoiceRequest(BodyRequest.Voice(BodyRequest.Message(MessageEnum.ValidMessage, MessageEnum.USLanguageCode, "male"))));
});
When('I send Voice message with DTMF collect file', () => {
    setRequest(Method.getVoiceRequest(BodyRequest.VoiceDTMF()));
});
When('I send Voice message with Callback', () => {
    setRequest(Method.getVoiceRequest(BodyRequest.VoiceCallback()));
});
When('I send Voice message with Invalid token', () => {
    setAccessToken(MessageEnum.EmptyParam);
    setRequest(Method.getVoiceRequest(BodyRequest.Voice()));
});
When('I send Voice message without message', () => {
    setRequest(Method.getVoiceRequest(BodyRequest.Voice(BodyRequest.Message(MessageEnum.EmptyParam))));
});
When('I send Voice message without phone', () => {
    setRequest(Method.getVoiceRequest(BodyRequest.Voice(BodyRequest.Message(),[MessageEnum.EmptyParam])));
});
When('I send Voice message with Invalid phone', () => {
    setRequest(Method.getVoiceRequest(BodyRequest.Voice(BodyRequest.Message(),[MessageEnum.ValidPhone, MessageEnum.InvalidPhone])));
});
When('I send Voice message without sender', () => {
    setRequest(Method.getVoiceRequest(BodyRequest.Voice(BodyRequest.Message(),[MessageEnum.ValidPhone, MessageEnum.ValidPhone], MessageEnum.EmptyParam)));
});
When('I send Voice message with Invalid sender', () => {
    setRequest(Method.getVoiceRequest(BodyRequest.Voice(BodyRequest.Message(),[MessageEnum.ValidPhone, MessageEnum.ValidPhone], MessageEnum.InvalidPhone)));
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