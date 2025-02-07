# Teste Técnico para Analista de Integrações Sênior

Este é uma aplicação para leitura de uma API com retorno em JSON.
Com os dados obtidos na API, a persistência dos dados será realizada 
com o ORM SEQUELIZE.

A base de dados utilizada será SQLITE;

Regras de negócio:

- Será criada três tabelas: Pessoa, Empresa e Centro_Custo;
- A tabela pessoa possui o campo cpf como chave primária;
	- O campo empresa_cnpj possui chave estrangeira com referência ao campo cnpj da tabela empresa;
	- O campo cc_id possui chave estrangeira com referência ao campo id da tabela centro_custo.
- A tabela empresa possui o campo cnpj como chave primária;
- A tabela centro_custo possui o campo id como chave primária;

O script será executado a cada 15 minutos.

## Instalação

Instruções para instalar e configurar o projeto.

Para o bom funcionamento do projeto é essencial a instalação dos seguintes pacotes:

axios
sqlite3
sqlite
sequelize
node-cron

```bash
# Clone o repositório
git clone https://github.com/ruisjr/paytrack.git

# Navegue até o diretório do projeto
cd paytrack

# Instale as dependências
npm install axios
npm install sqlite3
npm install sqlite
npm install sequelize
npm install node-cron

## Execução

Para iniciar o script, basta executar o seguinte comando:

node app.js
