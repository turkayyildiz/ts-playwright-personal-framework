# 🎭 Playwright BDD Login Test Framework

![CI](https://github.com/turkayyildiz/ts-playwright-personal-framework/actions/workflows/bdd-tests.yml/badge.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript&logoColor=white)
![Playwright](https://img.shields.io/badge/Playwright-1.44-45ba4b?logo=playwright&logoColor=white)
![Cucumber](https://img.shields.io/badge/Cucumber-10.x-23D96C?logo=cucumber&logoColor=white)
![License](https://img.shields.io/badge/license-MIT-blue)

A production-grade E2E test automation framework built with **TypeScript**, **Playwright**, and **Cucumber (BDD)**. Demonstrates Page Object Model architecture, Gherkin-driven scenario design, tagged test execution, and full CI/CD integration via GitHub Actions.

---

## 📋 Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Test Scenarios](#test-scenarios)
- [Getting Started](#getting-started)
- [Running Tests](#running-tests)
- [CI/CD Pipeline](#cicd-pipeline)
- [Reporting](#reporting)

---

## Overview

This framework automates the login functionality of [SauceDemo](https://www.saucedemo.com) — a purpose-built QA practice application. It covers positive flows, negative validation, edge cases, security checks, and full session lifecycle (login → logout), all expressed in plain English Gherkin syntax readable by non-technical stakeholders.

**Key engineering decisions:**
- Browser lifecycle managed exclusively in `hooks.ts` via `BeforeAll`/`AfterAll` — keeping step definitions clean and single-responsibility
- Page Object Model encapsulates all locators and assertions — steps never touch the DOM directly
- Typed `ICustomWorld` interface ensures full TypeScript safety across hooks, steps, and page objects
- Screenshots auto-attached to the Cucumber HTML report on any failure
- Tag-based execution (`@smoke`, `@negative`, `@security`) enables selective CI runs

---

## Tech Stack

| Tool | Version | Purpose |
|---|---|---|
| TypeScript | 5.x | Type-safe test authoring |
| Playwright | 1.44 | Browser automation |
| Cucumber | 10.x | BDD / Gherkin test runner |
| ts-node | 10.x | TypeScript execution without compile step |
| GitHub Actions | — | CI/CD pipeline |

---

## Project Structure

```
ts-playwright-personal-framework/
│
├── .github/
│   └── workflows/
│       └── bdd-tests.yml         # CI pipeline — smoke first, full suite after
│
├── features/
│   └── login.feature             # Gherkin scenarios (human-readable)
│
├── hooks/
│   └── hooks.ts                  # BeforeAll/AfterAll/Before/After lifecycle
│
├── pages/
│   └── loginPage.ts              # Page Object — locators + assertions
│
├── steps/
│   └── login.steps.ts            # Given/When/Then step definitions
│
├── support/
│   └── world.ts                  # ICustomWorld typed shared state
│
├── reports/                      # Generated HTML reports (gitignored)
├── cucumber.js                   # Cucumber configuration
├── playwright.config.ts          # Playwright configuration
├── tsconfig.json
└── package.json
```

---

## Test Scenarios

All scenarios are defined in [`features/login.feature`](features/login.feature).

| Tag | Scenario | Expected Result |
|---|---|---|
| `@smoke` `@positive` | Valid credentials login | Redirected to `/inventory.html` |
| `@positive` | Multiple valid user types (Outline) | All redirect to inventory |
| `@negative` | Invalid username + password | Error message displayed |
| `@negative` | Empty username | "Username is required" error |
| `@negative` | Empty password | "Password is required" error |
| `@negative` | Locked out user | "Sorry, this user has been locked out" error |
| `@security` | Error message dismissed | Error no longer visible |
| `@smoke` | Login → Logout flow | Redirected back to login page |

**Users tested:**

| Username | Password | Type |
|---|---|---|
| `standard_user` | `secret_sauce` | Valid |
| `problem_user` | `secret_sauce` | Valid (UI quirks) |
| `performance_glitch_user` | `secret_sauce` | Valid (slow response) |
| `locked_out_user` | `secret_sauce` | Blocked |
| `invalid_user` | `wrong_password` | Invalid |

---

## Getting Started

**Prerequisites:** Node.js 20+, npm

```bash
# Clone the repository
git clone https://github.com/turkayyildiz/ts-playwright-personal-framework.git
cd ts-playwright-personal-framework

# Install dependencies
npm install

# Install Playwright browsers
npx playwright install chromium
```

---

## Running Tests

```bash
# Full suite (headless)
npm test

# Smoke tests only — fast pre-deploy check
npm run test:smoke

# Negative scenarios only
npm run test:negative

# Security scenarios only
npm run test:security

# Headed mode — watch the browser (for debugging)
HEADLESS=false npm test
```

**Scripts defined in `package.json`:**

```json
{
  "test":           "cucumber-js --config cucumber.js",
  "test:smoke":     "TAGS=@smoke cucumber-js --config cucumber.js",
  "test:negative":  "TAGS=@negative cucumber-js --config cucumber.js",
  "test:security":  "TAGS=@security cucumber-js --config cucumber.js"
}
```

---

## CI/CD Pipeline

The GitHub Actions workflow ([`.github/workflows/bdd-tests.yml`](.github/workflows/bdd-tests.yml)) triggers on:

- Every push to `main` or `develop`
- Every pull request targeting `main`
- Daily schedule at **07:00 UTC** (Monday–Friday)

**Pipeline steps:**
1. Install Node 20 + dependencies
2. Install Chromium via Playwright
3. Run `@smoke` tests first — fast feedback gate
4. Run full suite regardless of smoke result
5. Upload HTML report as artifact (14-day retention)

---

## Reporting

Cucumber generates an HTML report after every run:

```bash
# After running tests locally, open the report
open reports/cucumber-report.html
```

**On failure**, a full-page screenshot is automatically captured and embedded directly inside the HTML report for the failing scenario — no manual investigation needed.

---

## Author

**Turkay Yildiz** — Test Automation Engineer  
[LinkedIn](https://linkedin.com/in/turkayyildiz) · [GitHub](https://github.com/turkayyildiz)
