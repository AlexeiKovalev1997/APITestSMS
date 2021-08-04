import {When,Then} from "cypress-cucumber-preprocessor/steps";
import {assessRequest, setAssessRequest, setBase64Token} from "../../support/pageObject/global";
import {MessageEnum} from "../../support/messageEnum/messageEnum.enum";
import {AccessMethods} from "../../support/pageObject/Access_pageObject";

const accessMethod: AccessMethods = new AccessMethods();
When('I send AccessRequest with valid Base64Token', () => {
    setBase64Token(MessageEnum.Base64Token);
    setAssessRequest(accessMethod.AccessRequest());
});
When('I send AccessRequest without valid Base64Token', () => {
    setBase64Token(MessageEnum.EmptyParam);
    setAssessRequest(accessMethod.AccessRequest());
});
Then('I should have Authenticate response', () => {
    accessMethod.AccessValidCheck();
});
Then('I should have Authentication error response', () => {
    accessMethod.AccessInvalidBase64TokenCheck();
});
Then('Response time is less than 3000 ms', () => {
    accessMethod.AccessResponseTimeCheck();
});