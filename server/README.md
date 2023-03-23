# Habit-app
## Passo a passo do desenvolvimento dessa aplicação.
#### Preparando o ambiente de desenvolvimento - Setup TypeScript
1 - Instale o node, ou atualize para a versão estável mais recente.
2 - Crie o package.json com o comando npm init -y .. será criada a pasta node_modules
3 - instale a lib fastify - "npm install fastify" .. dependencia do projeto
3.1 - crie a pasta src e criar um arquivo para teste .. serve.ts
4 - Instale o typescrip como dependencia de desenvolvimento - "npm install typescript -D"
5 - No terminal faça: "npx tsc --init" , assim ele criará o tsconfig.json
6 - Alterar dentro do tsconfig.json "target":es2016, para "target":es2020
7 - Instalar a dependencia de desenvolvimento tsx - "npm i tsx -D" .. essa dependencia permite utilizar o typescript com node sem que seja necessário nenhuma conversão.
7.1 - Se quiser rodar o arquivo e ver que não vai daar erro, faça: npx tsx src/server.ts
8 - Adicionar um script para facilitar rodar as aplicações. "dev": "npx watch src/server.ts" - Agora para rodar basta digitar "npm run dev" ... o watch serve para que toda vez que mudarmos alguma coisa no script, ele executar novamente o script. Serve para ver as alterações em tempo real.
#### Criando a primeira rota
1 - Importar o fastify
2 - utilizar o método que importamos .. const app = fastify();
3 - Criar primeira requisição com .. app.GET('/',() => return 'ola')
4 - Colocar uma escuta em uma porta .. app.listen({port:3333})
5 - Coloquei um console.log apenas para ver que a aplicação esta rodando .. app.listen({port:3333}).then(() => {console.log('ta rodando')})
#### Configurando o Prisma
1 - npm i -D prisma
2 - npm i @prisma/client
3 - npx prisma init --datasource-provider SQLite
4 - criar as tabelas no schema.prisma
5 - npx prisma migrate dev .. cria os migrations e a tabela no banco
6 - npx prisma studio  ..  abri uma interface para navegar no banco de dados
7 - importar o prismaClient
8 - instacia o prismaClient
9 - cria uma const e salva os dados que foram buscado do prisma
10 - Lembra que como é uma requisição, existe uma delay. Então a função deve ser assíncrona e a chamada recebe o await.
#### Configurando o CORS
** retomar no instante 41:17
