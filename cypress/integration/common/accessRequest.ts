import {Given} from "cypress-cucumber-preprocessor/steps";
import {AccessMethods} from "../../support/pageObject/Access_pageObject";

const accessMethod: AccessMethods = new AccessMethods();
Given('AccessRequest', () => {
    accessMethod.getAccessToken();
});