# 🎭 TypeScript Playwright BDD Framework

![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript&logoColor=white)
![Playwright](https://img.shields.io/badge/Playwright-1.44-45ba4b?logo=playwright&logoColor=white)
![Cucumber](https://img.shields.io/badge/Cucumber-10.x-23D96C?logo=cucumber&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-ready-2496ED?logo=docker&logoColor=white)
![License](https://img.shields.io/badge/license-MIT-blue)

Note: This repository is a personal showcase of the architectural patterns and best practices I implement in my professional automation projects. My primary daily contributions are hosted in private repositories at @turkayyildizz.

A production-grade E2E test automation framework built with **TypeScript**, **Playwright**, and **Cucumber (BDD)**. Designed to scale across multiple environments and teams — featuring multi-environment config management, Pino structured logging, Playwright trace + visual regression, Docker containerisation, and full CI/CD via GitHub Actions.

---

## 📋 Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Architecture Decisions](#architecture-decisions)
- [Test Scenarios](#test-scenarios)
- [Getting Started](#getting-started)
- [Running Tests](#running-tests)
- [Environment Management](#environment-management)
- [CI/CD Pipeline](#cicd-pipeline)
- [Docker](#docker)
- [Reporting & Observability](#reporting--observability)

---

## Overview

This framework automates the login functionality of [SauceDemo](https://www.saucedemo.com) and is architected to support multiple applications, teams, and environments without code changes. It covers positive flows, negative validation, edge cases, security checks, and full session lifecycle — all expressed in plain English Gherkin readable by non-technical stakeholders.

---

## Tech Stack

| Tool | Version | Purpose |
|---|---|---|
| TypeScript | 5.x | Strict type-safe test authoring |
| Playwright | 1.44 | Browser automation + visual regression |
| Cucumber | 10.x | BDD / Gherkin test runner |
| Pino | 9.x | Structured JSON logging |
| Docker | — | Containerised test execution |
| GitHub Actions | — | CI/CD pipeline |
| cross-env | 7.x | Cross-platform env variable management |
| ts-node | 10.x | TypeScript execution without compile step |

---

## Project Structure

```
ts-playwright-personal-framework/
│
├── .github/
│   └── workflows/
│       └── bdd-tests.yml             # CI: smoke gate → full suite → Docker run
│
├── config/
│   └── env.config.ts                 # Multi-environment config — reads .env.{ENV}
│
├── features/
│   └── login.feature                 # Gherkin scenarios (@smoke @negative @security)
│
├── hooks/
│   └── hooks.ts                      # BeforeAll/AfterAll/Before/After lifecycle
│                                     # Trace, screenshot, console error capture
│
├── pages/
│   └── loginPage.ts                  # Page Object — strict interfaces, logging,
│                                     # API layer, visual regression assertions
│
├── steps/
│   └── login.steps.ts                # Given/When/Then — clean, no browser logic
│
├── support/
│   └── world.ts                      # ICustomWorld typed shared state
│
├── utils/
│   ├── logger.ts                     # Pino structured logger (console + file)
│   └── test-data.factory.ts          # Type-safe user factory + scenario datasets
│
├── reports/                          # Generated — gitignored
│   ├── cucumber-report.html
│   ├── test-run.log
│   ├── videos/
│   └── traces/
│
├── .env.example                      # Committed — template for local setup
├── .env.staging                      # Gitignored — staging credentials
├── .env.dev                          # Gitignored — dev credentials
├── Dockerfile                        # Containerised test runner
├── cucumber.config.js                # Cucumber config — tag + env aware
├── package.json
└── tsconfig.json
```

---

## Architecture Decisions

**Single responsibility hooks** — Browser lifecycle lives exclusively in `hooks/hooks.ts` via `BeforeAll`/`AfterAll`. Step definitions contain zero browser setup code — they only call Page Object methods.

**Typed world** — `ICustomWorld` interface enforces strict TypeScript across hooks, steps, and page objects. Includes `consoleErrors: string[]` for runtime browser error capture.

**Test data factory** — `UserFactory` and `LoginScenarios` in `utils/test-data.factory.ts` provide all test data via typed factory functions. No hardcoded strings in tests or page objects.

**Environment abstraction** — `config/env.config.ts` loads `.env.{TEST_ENV}` at runtime. Switching environments requires zero code changes.

**Structured observability** — Pino logger writes to console (pretty-printed) and `reports/test-run.log` simultaneously. On failure: screenshot + Playwright trace zip + browser console errors all auto-attached to the HTML report.

---

## Test Scenarios

All scenarios defined in [`features/login.feature`](features/login.feature):

| Tag | Scenario | Expected Result |
|---|---|---|
| `@smoke` `@positive` | Valid credentials login | Redirected to `/inventory.html` |
| `@positive` | Multiple valid user types (Outline) | All redirect to inventory |
| `@negative` | Invalid username + password | Error message shown |
| `@negative` | Empty username | "Username is required" |
| `@negative` | Empty password | "Password is required" |
| `@negative` | Locked out user | "Sorry, this user has been locked out" |
| `@security` | Error message dismissed | Error no longer visible |
| `@smoke` | Login → Logout full flow | Redirected back to login page |

**Users under test:**

| Type | Username | Outcome |
|---|---|---|
| Standard | `standard_user` | Login success |
| Performance | `performance_glitch_user` | Login success (slow) |
| Locked | `locked_out_user` | Blocked |
| Invalid | `invalid_user` | Auth error |

---

## Getting Started

**Prerequisites:** Node.js 20+, npm, Docker (optional)

```bash
# Clone
git clone https://github.com/turkayyildiz/ts-playwright-personal-framework.git
cd ts-playwright-personal-framework

# Install dependencies
npm install

# Install Playwright browsers
npx playwright install chromium

# Set up local environment
cp .env.example .env.staging
# Edit .env.staging with your values
```

---

## Running Tests

```bash
# Full suite — staging environment
npm test

# Full suite — dev environment
npm run test:dev

# Smoke tests only (fast pre-deploy gate)
npm run test:smoke

# Negative scenarios
npm run test:negative

# Security scenarios
npm run test:security

# Headed mode — watch the browser
npm run test:headed

# Update visual regression snapshots
npm run test:visual:update
```

---

## Environment Management

The framework supports multiple environments with zero code changes.

**Switch environment at runtime:**
```bash
cross-env TEST_ENV=dev npm test        # loads .env.dev
cross-env TEST_ENV=staging npm test    # loads .env.staging
```

**`.env.staging` example** (copy from `.env.example`):
```
BASE_URL=https://www.saucedemo.com
USER_STANDARD=standard_user
USER_LOCKED=locked_out_user
USER_INVALID=invalid_user
USER_PERF=performance_glitch_user
PASSWORD=secret_sauce
PASSWORD_INVALID=wrong_password
TIMEOUT_DEFAULT=30000
TIMEOUT_NAVIGATION=60000
TIMEOUT_ASSERTION=10000
```

> ⚠️ Never commit `.env.staging` or `.env.dev` — they are gitignored. Only `.env.example` is committed.

---

## CI/CD Pipeline

The GitHub Actions pipeline runs on every push to `main`/`develop`, every pull request, and daily at **07:00 UTC** Monday–Friday.

**Three-stage pipeline:**

```
┌─────────────────┐     ┌──────────────────┐     ┌─────────────────┐
│   1. Smoke      │────▶│  2. Full Suite   │────▶│   3. Docker     │
│   @smoke tags   │     │  all scenarios   │     │  containerised  │
│   ~2 minutes    │     │  ~10 minutes     │     │  isolated run   │
└─────────────────┘     └──────────────────┘     └─────────────────┘
```

Credentials injected via **GitHub Secrets** — never hardcoded:
- `STAGING_URL` → base URL for staging environment
- `TEST_PASSWORD` → test account password

Reports uploaded as artifacts with 14-day retention after every run.

---

## Docker

Run the full suite in a fully isolated container — no local browser install needed:

```bash
# Build
docker build -t ts-playwright-framework .

# Run against staging
docker run --rm \
  -e TEST_ENV=staging \
  -e BASE_URL=https://www.saucedemo.com \
  -e PASSWORD=secret_sauce \
  -v $(pwd)/reports:/app/reports \
  ts-playwright-framework
```

The Dockerfile uses the official `mcr.microsoft.com/playwright` base image — Chromium is pre-installed, ensuring identical execution between local and CI environments.

---

## Reporting & Observability

**After every run:**

```bash
# Open HTML report
open reports/cucumber-report.html

# View structured log
cat reports/test-run.log
```

**On failure, the following are automatically captured and embedded in the HTML report:**

| Artifact | Content |
|---|---|
| Screenshot | Full-page capture at point of failure |
| Playwright Trace | `reports/traces/{scenario}.zip` — open with `npx playwright show-trace` |
| Console errors | Browser JS errors captured during the scenario |
| Video | Recorded in CI (`reports/videos/`) |

**View a trace locally:**
```bash
npx playwright show-trace "reports/traces/Scenario Name.zip"
```

---

## Author

**Turkay Yildiz** — Test Automation Engineer  
[LinkedIn](https://linkedin.com/in/turkayyildiz) · [GitHub](https://github.com/turkayyildiz)
