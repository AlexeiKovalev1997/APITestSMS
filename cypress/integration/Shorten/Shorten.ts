import {Then, When} from "cypress-cucumber-preprocessor/steps";
import {MessageEnum} from "../../support/messageEnum/messageEnum.enum";
import {ShortenBodyRequest, ShortenMethods} from "../../support/pageObject/Shorten_pageObject";
import {setAccessToken, setRequest} from "../../support/pageObject/global";

const Method: ShortenMethods = new ShortenMethods();
const BodyRequest:ShortenBodyRequest = new ShortenBodyRequest();

When('I send Shortener with 2 obsjects per request', () => {
    setRequest(Method.getShortenRequest(2));
});
When('I send Shortener with 20 obsjects per request', () => {
    setRequest(Method.getShortenRequest(20));
});
When('I send Shortener in case of missing persmissions single and campaign', () => {
    setRequest(Method.getShortenRequest());
});
When('I send Shortener with empty body', () => {
    setRequest(Method.getShortenRequest(2, [MessageEnum.EmptyParam]));
});
When('I send Shortener with more than 20 objects in the request', () => {
    setRequest(Method.getShortenRequest(21));
});
When('I send Shortener with domain that is not in the possetion of the user', () => {
    setRequest(Method.getShortenRequest(2, BodyRequest.Shorten("","","invalid domain")));
});
When('I send Shortener with long url more than 1900', () => {
    setRequest(Method.getShortenRequest(2, BodyRequest.Shorten("url"+"1".repeat(1900))));
});
When('I send Shortener with invalid url', () => {
    setRequest(Method.getShortenRequest(2, BodyRequest.Shorten("invalid url")));
});
When('I send Shortener with validity less than 3600', () => {
    setRequest(Method.getShortenRequest(2, BodyRequest.Shorten("", "3599")));
});
When('I send Shortener with validity more than 2592000', () => {
    setRequest(Method.getShortenRequest(2, BodyRequest.Shorten("", "2592001")));
});
When('I send Shortener with callback url null', () => {
    setRequest(Method.getShortenRequest(2, BodyRequest.Shorten("","","","")));
});
When('I send Shortener with callbackurl more than 1024', () => {
    setRequest(Method.getShortenRequest(2, BodyRequest.Shorten("","","","url"+"1".repeat(1024))));
});
When('I send Shortener with missing the requiered fields name longurl domain', () => {
    setRequest(Method.getShortenRequest(2, BodyRequest.Shorten("","12345","","url","")));
});

Then('Response time is less than 3000 ms', () => {
    Method.AccessResponseTimeCheck();
});
Then('I should have valid Shortener response', () => {
    Method.SMSSendValidCheck();
});
Then('I should have Access Denied response', () => {
    Method.SMSSendUrlShortenerValidCheck();
});
Then('I should have invalid Shortener response', () => {
    Method.SMSSendMultiplePartsValidCheck();
});