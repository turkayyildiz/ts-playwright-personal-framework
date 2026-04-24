FROM mcr.microsoft.com/playwright:v1.44.0-jammy

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

RUN npx playwright install chromium

ENV TEST_ENV=staging
ENV HEADLESS=true
ENV CI=true

CMD ["npm", "test"]
