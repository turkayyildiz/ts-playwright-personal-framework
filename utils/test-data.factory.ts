// utils/test-data.factory.ts
import envConfig from '../config/env.config';

// ── Strict types — zero `any` ────────────────────────────────

export type UserType = 'standard' | 'locked' | 'invalid' | 'performance';

export interface UserCredentials {
  readonly username: string;
  readonly password: string;
}

export interface LoginScenarioData {
  readonly credentials:     UserCredentials;
  readonly expectedOutcome: 'success' | 'error';
  readonly expectedMessage?: string;
}

// ── Factory functions ────────────────────────────────────────

export const UserFactory = {
  get(type: UserType): UserCredentials {
    return envConfig.users[type];
  },

  standard():    UserCredentials { return envConfig.users.standard; },
  locked():      UserCredentials { return envConfig.users.locked; },
  invalid():     UserCredentials { return envConfig.users.invalid; },
  performance(): UserCredentials { return envConfig.users.performance; },

  withCredentials(username: string, password: string): UserCredentials {
    return { username, password };
  },

  empty(): UserCredentials {
    return { username: '', password: '' };
  },

  emptyUsername(): UserCredentials {
    return { username: '', password: envConfig.users.standard.password };
  },

  emptyPassword(): UserCredentials {
    return { username: envConfig.users.standard.username, password: '' };
  },
};

// ── Scenario data sets ───────────────────────────────────────

export const LoginScenarios: Record<string, LoginScenarioData> = {
  validLogin: {
    credentials:     UserFactory.standard(),
    expectedOutcome: 'success',
  },
  lockedUser: {
    credentials:     UserFactory.locked(),
    expectedOutcome: 'error',
    expectedMessage: 'Sorry, this user has been locked out',
  },
  invalidCredentials: {
    credentials:     UserFactory.invalid(),
    expectedOutcome: 'error',
    expectedMessage: 'Username and password do not match any user in this service',
  },
  emptyUsername: {
    credentials:     UserFactory.emptyUsername(),
    expectedOutcome: 'error',
    expectedMessage: 'Username is required',
  },
  emptyPassword: {
    credentials:     UserFactory.emptyPassword(),
    expectedOutcome: 'error',
    expectedMessage: 'Password is required',
  },
};
