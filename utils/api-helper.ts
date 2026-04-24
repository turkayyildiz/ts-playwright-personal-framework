import { request, APIRequestContext } from '@playwright/test';

export class ApiHelper {
    private requestContext: APIRequestContext;

    constructor(requestContext: APIRequestContext) {
        this.requestContext = requestContext;
    }

    async createToken(username: string, password: string) {
        const response = await this.requestContext.post('/auth', {
            data: {
                username: username,
                password: password
            }
        });
        const body = await response.json();
        return body.token;
    }
}