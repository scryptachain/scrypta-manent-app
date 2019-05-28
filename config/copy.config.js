const existingConfig = require('../node_modules/@ionic/app-scripts/config/copy.config');

module.exports = Object.assign(existingConfig, {
	scrypta: {
        src: './assets/js/scryptacore.js',
        dest: ''
    }
    
});