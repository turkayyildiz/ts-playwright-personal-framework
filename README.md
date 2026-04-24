# Playwright E2E & API Test Framework
### Restful Booker · TypeScript · Playwright · GitHub Actions · BDD-ready

[![Playwright Tests](https://github.com/turkayyildizz/playwright-restful-booker/actions/workflows/playwright.yml/badge.svg)](https://github.com/turkayyildizz/playwright-restful-booker/actions)

A production-grade test automation framework built with TypeScript and Playwright,
demonstrating E2E UI testing, REST API testing, Page Object Model architecture,
and full CI/CD integration via GitHub Actions.

## Stack
- **Framework**: Playwright 1.x + TypeScript
- **Pattern**: Page Object Model (POM)
- **CI/CD**: GitHub Actions (parallel matrix execution)
- **API Testing**: Playwright request context (no extra library needed)
- **Reporting**: HTML report + JUnit XML + trace viewer

## What's tested
| Layer | Coverage |
|-------|----------|
| UI E2E | Login, booking creation, admin panel |
| API | Auth, full CRUD on /booking endpoint |
| Cross-browser | Chromium, Firefox |

## Run locally
```bash
npm install
npx playwright install
npx playwright test                    # all tests
npx playwright test --project=api      # API only
npx playwright test --project=chromium # UI only
npx playwright show-report             # open HTML report
```

## CI Results
Tests run automatically on every push and daily at 8am UTC.
View the latest run → [GitHub Actions](link)