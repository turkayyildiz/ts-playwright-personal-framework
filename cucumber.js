module.exports = {
    default: {
        requireModule: ['ts-node/register'],
        require: [
            'steps/**/*.ts',  // Bütün alt klasörlerdeki adımları bulur
            'hooks/**/*.ts'   // Browser'ı açıp kapatan hooks dosyasını bulur
        ],
        paths: [
            'features/**/*.feature' // Tüm feature dosyalarını okur
        ],
        format: [
            'progress-bar', // Terminalde şık bir ilerleme çubuğu gösterir
            'html:reports/cucumber-report.html' // Otomatik rapor oluşturur
        ],
        parallel: 1 // Şimdilik tek tek çalışsın, kafalar karışmasın
    }
}