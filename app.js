const cron = require('node-cron');

(async () => {
	const cron = require('node-cron');
	const processarDados = require('./controller');
 
	cron.schedule('*/1 * * * *', () => {
		try {
			processarDados();
		} catch (error) {
			console.log(error);
		}
		console.log('Aguarde a próxima execução em 15 minutos...');
	});
})();