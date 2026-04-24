// support/world.ts
import { setWorldConstructor, World, IWorldOptions } from '@cucumber/cucumber';
import { Browser, BrowserContext, Page } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';

export interface ICustomWorld extends World {
    browser:    Browser    | undefined;
    context:    BrowserContext | undefined;
    page:       Page       | undefined;
    loginPage:  LoginPage  | undefined;
}

export class CustomWorld extends World implements ICustomWorld {
    browser:   Browser    | undefined;
    context:   BrowserContext | undefined;
    page:      Page       | undefined;
    loginPage: LoginPage  | undefined;

    constructor(options: IWorldOptions) {
        super(options);
    }
}

setWorldConstructor(CustomWorld);