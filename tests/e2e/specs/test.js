// For authoring Nightwatch tests, see
// https://nightwatchjs.org/guide



module.exports = {
    'testing home component title': browser => {
        browser
            .init()
            .waitForElementVisible('#home')
            .assert.containsText('h1', 'Lista de juegos')
            .end()
    },

    'testing admin component title': browser => {
        browser
            .init()
            .url('http://localhost:8080/administracion')
            .waitForElementVisible('#administracion')
            .assert.containsText('h1', 'Administración de las opiniones')
            .end()
    },
    'testing create new opinion': browser => {
        browser
            .init()
            .waitForElementVisible('#botonOpinar')
            .click('#botonOpinar')
            .saveScreenshot('./reports/openForm.png')
            .setValue('#nombre', 'gustavo')
            .setValue('#opinion', 'esta es una opinion de prueba test e2e')
            .saveScreenshot('./reports/filledFields.png')
            .click('#submitOpinion')
            .saveScreenshot('./reports/submitForm.png')
            .url('http://localhost:8080/administracion')
            .click('#botonEditar')
            .saveScreenshot('./reports/availabilityOpinion.png')
            .end()
    },
    /*
        'testing opinion availability in administracion component': browser => {
            browser
                .init()
                .url('http://localhost:8080/administracion')
                .click('#botonEditar')
                .saveScreenshot('./reports/availabilityOpinion.png')
                .end()
        },
    */
}