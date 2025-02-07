const axios = require('axios');

// Exemplo de uso:
const apiUrl = 'https://dataprovider.paytrack.com.br/data?view=view_colaboradores_teste_tecnico';

async function obterDados() {
	const axios = require('axios');

	let config = {
	  method: 'get',
	  maxBodyLength: Infinity,
	  url: apiUrl,
	  headers: { 
		'Content-Type': 'application/json', 
		'Authorization': 'Basic MjU4Mzg1NDc4NjA0NGU0YThkNDc5MWIzOTlhYTg4YWI6MGUwMWYwNDc1MzRiNGNjOGJlZjg5OWMwM2U4ZGQ2OGY=',
		'Cookie': 'JSESSIONID=DFB0A1EB06770A374497CA40069CB873',
	  }
	};
	
	try {
		const response = await axios.request(config);
		return response.data;
	} catch (error) {
		console.error('Erro ao buscar os dados:', error);
		throw error;	
	}

		/*axios.request(config)
			.then((response) => {
				//console.log(JSON.stringify(response.data));
				console.log('Dados recebidos com sucesso!');
				return response.data;
			})
			.catch((error) => {
				console.log(error);
			});*/
}

module.exports = obterDados;