module.exports = {
    default: {
        requireModule: ['ts-node/register'],
        require: [
            'hooks/*.ts',
            'steps/**/*.ts',
            'support/**/*.ts'
        ],
        paths: [
            'features/**/*.feature'
        ],
        format: [
            'progress-bar',
            'html:test-results/cucumber-report.html'
        ],
        formatOptions: {
            snippetInterface: 'async-await'
        },
        parallel: 1,
        publishQuiet: true
    }
}