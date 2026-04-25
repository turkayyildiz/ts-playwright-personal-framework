require('dotenv').config({
    path: `.env.${process.env.TEST_ENV ?? 'staging'}`
});

module.exports = {
    default: {
        paths:         ['features/**/*.feature'],
        require:       [
            'support/world.ts',
            'hooks/hooks.ts',
            'hooks/api.hooks.ts',
            'steps/**/*.ts',
        ],
        requireModule: ['ts-node/register'],
        format: [
            'progress-bar',
            'html:reports/cucumber-report.html',
        ],
        tags: process.env.TAGS || '',
    },
};