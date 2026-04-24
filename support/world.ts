// support/world.ts
import { setWorldConstructor, World, IWorldOptions } from '@cucumber/cucumber';
import { Browser, BrowserContext, Page } from 'playwright';
import { LoginPage } from '../pages/loginPage';

export interface ICustomWorld extends World {
    browser:   Browser        | undefined;
    context:   BrowserContext | undefined;
    page:      Page           | undefined;
    loginPage: LoginPage      | undefined;
}

export class CustomWorld extends World implements ICustomWorld {
    browser:   Browser        | undefined = undefined;
    context:   BrowserContext | undefined = undefined;
    page:      Page           | undefined = undefined;
    loginPage: LoginPage      | undefined = undefined;

    constructor(options: IWorldOptions) {
        super(options);
    }
}

setWorldConstructor(CustomWorld);