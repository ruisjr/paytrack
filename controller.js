const obterDados = require('./webservice');
const Pessoa = require('./model/pessoa');
const Empresa = require('./model/empresa');
const CentroCusto = require('./model/centro_custo');
const sequelize = require('./db');

let pessoaIgnorados = 0;
let pessoaAdicionadas = 0;
let pessoaAtualizadas = 0;

async function updateOrInsertEmpresa(jsonData) {
	// Encontrar o registro pelo cnpj
	const registro = await Empresa.findByPk(jsonData.empresa_cnpj);

	// Verificar se o registro existe
	if (registro) {
		//console.log('CNPJ localizado na base de dados: ', jsonData.empresa_cnpj);

		registro.cnpj = jsonData.empresa_cnpj;
		registro.nome = jsonData.empresa_nome;

		// Salvar as alterações no banco de dados
		await registro.save();
		//console.log('Empresa atualizada com sucesso.');
	} else {
		//console.log('CNPJ não localizado na base de dados, será incluído');
		if (jsonData.empresa_cnpj != null && jsonData.empresa_nome)  {
			await Empresa.create({			
				cnpj: jsonData.empresa_cnpj,
				nome: jsonData.empresa_nome,
			});
			//console.log('Empresa cadastrada com sucesso.');
		}		
	}
}

async function updateOrInsertCCusto(jsonData) {
	// Encontrar o registro pelo ID
	const registro = await CentroCusto.findByPk(jsonData.centro_custo_identificador);

	// Verificar se o registro existe
	if (registro) {
		//console.log('Id do Centro de Custo localizado na base de dados: ', jsonData.centro_custo_identificador);

		registro.id = jsonData.centro_custo_identificador;
		registro.nome = jsonData.centro_custo_nome;

		// Salvar as alterações no banco de dados
		await registro.save();
		//console.log('Centro de Custo atualizado com sucesso.');
	} else {
		//console.log('Centro de Custo não localizado na base de dados, será incluído');
		if (jsonData.centro_custo_identificador != null && jsonData.centro_custo_nome)  {
			await CentroCusto.create({			
				id: jsonData.centro_custo_identificador,
				nome: jsonData.centro_custo_nome,
			});
			//console.log('Centro de Custo cadastrado com sucesso.');
		}		
	}
}

async function updateOrInsertPessoa(jsonData) {
	// Primeiro verifica se o centro de custo é diferente de nulo, evitando consulta desnecessária ao banco de dados
	if (jsonData.centro_custo_identificador != null) {
		const registro = await Pessoa.findByPk(jsonData.cpf);

		if (registro) {
			registro.cpf = jsonData.cpf;
			registro.nome = jsonData.nome;
			registro.sobrenome = jsonData.sobrenome;
			registro.cargo = jsonData.cargo;
			registro.matricula = jsonData.matricula;
			registro.empresa_cnpj = jsonData.empresa_cnpj;
			registro.empresa_nome = jsonData.empresa_nome;
			registro.centro_custo_identificador = jsonData.centro_custo_identificador;
			registro.centro_custo_nome = jsonData.centro_custo_nome;
			
			await registro.save();
			pessoaAtualizadas++;
		} else {
			await Pessoa.create({
				cpf: jsonData.cpf,
				nome: jsonData.nome,
				sobrenome: jsonData.sobrenome,
				cargo: jsonData.cargo,
				matricula: jsonData.matricula,
				empresa_cnpj: jsonData.empresa_cnpj,
				empresa_nome: jsonData.empresa_nome,
				cc_id: jsonData.centro_custo_identificador,
				cc_nome: jsonData.centro_custo_nome
			});
			pessoaAdicionadas++;
		}
	} else {
		pessoaIgnorados++;
	}
}

async function processarDados() {
	try {
		await sequelize.sync({ force: false });

		//Realiza a comunicação com a API
		const jsonData = await obterDados();

		console.log('Dados recebidos pela API.');

		for (const item of jsonData) {
			await updateOrInsertEmpresa(item);
			await updateOrInsertCCusto(item);
			await updateOrInsertPessoa(item);	
		};
		
		console.log('\n--------------------------------------------- \
							 \nRelatório do processamento: \
					\nRegistros Ignorados...: ' + pessoaIgnorados +' \
					\nRegistros Adicionados.: ' + pessoaAdicionadas + '\
					\nRegistros Atualizados.: ' + pessoaAtualizadas + '\
					\n---------------------------------------------');
		
		console.log('Dados salvos no banco de dados SQLite.');

		// Fechando a conexão com o banco de dados
		await sequelize.close();
	} catch (error) {
		console.error('Erro ao salvar os dados:', error);
	}
};

module.exports = processarDados;
