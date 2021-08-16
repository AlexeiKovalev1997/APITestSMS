export let accessToken: string;
export function setAccessToken(newValue: string) {
    accessToken = newValue;
}
export let base64Token: string;
export function setBase64Token(newValue: string) {
    base64Token = newValue;
}
export let assessRequest: object;
export function setAssessRequest(newValue: object) {
    assessRequest = newValue;
}
export let Request: object;
export function setRequest(newValue: object) {
    const newLocal = Request = newValue;
}
export let currentDate: Date = new Date()
export function setDate(newValue?: Date) {
    return currentDate = newValue;
}