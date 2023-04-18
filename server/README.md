# Habit-app
## Passo a passo do desenvolvimento dessa aplicação.
### Aula-1
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
8 - Adicionar um script para facilitar rodar as aplicações. "dev": "tsx watch src/server.ts" - Agora para rodar basta digitar "npm run dev" ... o watch serve para que toda vez que mudarmos alguma coisa no script, ele executar novamente o script. Serve para ver as alterações em tempo real.
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
4.1 - Instalar a extensão do prisma
5 - npx prisma migrate dev .. cria os migrations e a tabela no banco
6 - npx prisma studio  ..  abri uma interface para navegar no banco de dados
7 - importar o prismaClient
8 - instacia o prismaClient
9 - cria uma const e salva os dados que foram buscado do prisma
10 - Lembra que como é uma requisição, existe uma delay. Então a função deve ser assíncrona e a chamada recebe o await.
#### Configurando o CORS
1 - Instalar CORS .. npm i @fastify/cors - isso é para permitir que o front consiga acessar dados do back(restringe quem pode acessar)
2 - Importar e utilizar .. import cors from '@fastify/cors' .. app.register(cors)

### Aula-2 - Estrutura do banco de dados
#### Diagramação do Banco de dados
#### Criação das tabelas no Banco de dados
1 - Dentro de schema, criar as novas tabelas necessarias.
2 - Fazer o migration. - npx prisma migrate dev
#### Criação do relacionamento entre as tabelas no Banco de dados
4 - Fazer o migration - npx prisma migrate dev
5 - Instalar dependencias para vizualizar os diagramas entidade/relacionamento - npm i -D prisma-erd-generator @mermaid-js/mermaid-cli
5.1 - Inseriar no schema.prisma - generator erd {
  provider = "prisma-erd-generator"
}
5.2 - Para ver o diagrama - npx prisma generate
#### Criação do seed do Banco de dados
6 - Criar um arquivo seed(serve para popular o BD com informações fake)
6.1 - Acessa o prisma.io e procure por seeding. Abra seeding your database. Copiei o exemplo e limpe a função. E siga a documentação.
6.2 - Altere o que a documentação formeceu para - "prisma": {
  "seed": "tsx prisma/seed.ts"
}
6.3 - Criei um habito dentro do seed.ts do seguinte jeito - 
await prisma.habit.deleteMany()
await prisma.habit.create({
    data:{
        title:'Beber 2L de água',
        created_at: new Date('2023-01-10T00:00:00.000z')
    }
  })
6.4 - Rodar o prisma com o comando para criar os mocks- npx prisma db seed
6.5 - Rodar npx prisma studio
6.6 - Substituir o conteudo do seed.ts pelo fornecido pela rocketseat