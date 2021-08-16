import {Then, When} from "cypress-cucumber-preprocessor/steps";
import {MessageEnum} from "../../support/messageEnum/messageEnum.enum";
import {SMSCampaignBodyRequest, SMSCampaignMethods} from "../../support/pageObject/SMSCampaign_pageObject";
import {setAccessToken, setRequest} from "../../support/pageObject/global";

const Method: SMSCampaignMethods = new SMSCampaignMethods();
const BodyRequest:SMSCampaignBodyRequest = new SMSCampaignBodyRequest();

When('I send SMS Campaigns with label, transcode, flash', () => {
    setRequest(Method.getSmsCampaignRequest(BodyRequest.Campaigns()));
});
When('I send SMS Campaigns with shorten URL', () => {
    setRequest(Method.getSmsCampaignRequest(BodyRequest.Campaigns(MessageEnum.ValidMessage + ' ' + MessageEnum.urlShortener)));
});
When('I send SMS Campaigns with Callback and Campaign Callback', () => {
    setRequest(Method.getSmsCampaignRequest(BodyRequest.CampaignsCallback()));
});
When('I send SMS Campaigns with callback group', () => {
    setRequest(Method.getSmsCampaignRequest(BodyRequest.CampaignsCallbackGroup()));
});
When('I send SMS Campaigns with multiple parts', () => {
    setRequest(Method.getSmsCampaignRequest(BodyRequest.Campaigns(MessageEnum.ValidMessage.repeat(500))));
});
When('I send SMS Campaigns with regulator with India', () => {
    setRequest(Method.getSmsCampaignRequest(BodyRequest.CampaignsIndia()));
});
When('I send SMS Campaigns with Invalid token', () => {
    setAccessToken(MessageEnum.EmptyParam);
    setRequest(Method.getSmsCampaignRequest(BodyRequest.Campaigns()));
});
When('I send SMS Campaigns without message', () => {
    setRequest(Method.getSmsCampaignRequest(BodyRequest.Campaigns(MessageEnum.EmptyParam)));
});
When('I send SMS Campaigns without phone', () => {
    setRequest(Method.getSmsCampaignRequest(BodyRequest.Campaigns(MessageEnum.ValidMessage, [MessageEnum.EmptyParam])));
});
When('I send SMS Campaigns with invalid phone', () => {
    setRequest(Method.getSmsCampaignRequest(BodyRequest.Campaigns(MessageEnum.ValidMessage, [MessageEnum.ValidPhone,MessageEnum.InvalidPhone])));
});
When('I send SMS Campaigns without sender', () => {
    setRequest(Method.getSmsCampaignRequest(BodyRequest.Campaigns(MessageEnum.ValidMessage,[MessageEnum.ValidPhone],MessageEnum.EmptyParam)));
});
When('I send SMS Campaigns with Invalid sender', () => {
    setRequest(Method.getSmsCampaignRequest(BodyRequest.Campaigns(MessageEnum.ValidMessage,[MessageEnum.ValidPhone],MessageEnum.InvalidPhone)));
});
When('I send SMS Campaigns with untranscode message', () => {
    setRequest(Method.getSmsCampaignRequest(BodyRequest.Campaigns(MessageEnum.TranscodeMessage)));
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
Then('I should have valid SMS Campaigns', () => {
    Method.SMSSendCallbackValidCheck();
});