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
#### Isolando arquivos do back-end
7 - Separa os arquivos da aplicação - como a conexão com banco será usada várias vezes é melhor deixar ela separada
7.1 - Criar a pasta lib dentro do src, e criar o arquivo prisma.ts. Copiar a importação do prisma e a conexão para lá.
7.2 - Criar o arquivo routes.ts dentro da pasta src. Passar as rotas para ele. Criar uma função assincrona, exportar essa função e colocar as rotas dentro dele. O "app" ficará dando erro, para resolver importamos - import {FastifyInstance} from 'fastify';. Tipar o parâmetro "app" - app:FastifyInstace. Importa o prisma - import {prisma} from lib.prisma.ts
7.3 - Para utilizar a rota, chamar o arquivo criado dentro de server.ts - app.register(appRoutes)

#### Criação das rotas no back-end
1 - Criação da Rota de novo Hábito
1.1 - Primeiro instalar e importar o zod. Uma lib para validação e tipagem - npm i zod e import {z} from zod;
1.2 - Apagamos a rota que tem e criamos uma rota do tipo post com o caminho '/habits'. O segundo parâmetro é uma função async passando como parâmetro uma request. Dentro dessa request pode ser acessado(params, query(os que tem ?) e body). Usaremos o body.
1.3 - É uma requisição do tipo post. Então estarei enviando informações. Portando o parâmetro request, dentro do função.
1.4 - Criar validações para verificar se os dados realmente vieram. Como Já importei o zod, agora vou usá-lo. Isso se assemelha um pouco
como fazer a tipagem com typescript. Depois de criar essa validação, coloco ela envolta do request.body - createHabitBody.parse(request.body)
1.5 - Criar um novo habito.
1.6 - instalar a lib dayjs - npm i dayjs - Essa lib é para poder zerar a hora do dia, de modo que se uma pessoa criar um habito no meio do dia, ele poder utilizar esse habito naquele mesmo dia, senão ele poderia não conseguir usar.
1.7 - Utilizar o dayjs - const today = dayjs().startOf('day').toDate() e transformar no formato de data do javascript com toDate()
1.8 - Testar pelo postman e depois congerir pelo prisma studio. Não dá pra verificar pelo navegador por ser uma requisição post.
2 - Criar Rota de Detalhe do dia(hábitos completos/possíveis)
2.1 - Criar uma rota com o endereço '/day' e a função(segundo parâmetro) recebe um request como parâmetro. Detro dessa função assincrona fazemos:
criar uma const que vai tipar e converter a request, que vai ser do tipo query. Para converter a data usamos o 'coerce'. do zod.
criar uma const para buscar os habitos possíveis usando a função findmany e passando um where que deve ser especificado.

COntinuar.. minuto 50

3 - Toggle do hábito do dia
4 - Resumo de dias

#### Front-end web

1 - Estrutura da homepage
2 - Componente: Header
3 - Tabela de hábitos diários
4 - Geração de range de dias
5 - Preenchimento de dias no fim
6 - Adicionado scroll horizontal

#### Mobile - 