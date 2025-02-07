const cron = require('node-cron');
const processarDados = require('./controller');

// Agendar a tarefa para ser executada a cada 15 minutos
cron.schedule('*/15 * * * *', async () => {
	console.log('Aguarde a próxima execução em 15 minutos...');
	await processarDados();
});

(async () => {
	try {
		await processarDados();
	} catch (error) {
		console.log(error);
	}
})();