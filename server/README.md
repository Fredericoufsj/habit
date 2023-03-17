# Habit-app
## Passo a passo do desenvolvimento dessa aplicação.
#### Preparando o ambiente de desenvolvimento.
1 - Instale o node, ou atualize para a versão estável mais recente.
2 - Crie o package.json com o comando npm init -y
3 - instale a lib fastify - "npm install fastify"
4 - Instale o typescrip como dependencia de desenvolvimento - "npm install typescript -D"
5 - No terminal faça: "npx tsc --init" , assim ele criará o tsconfig.json
6 - Alterar dentro do tsconfig.json "target":es2016, para "target":es2020
7 - Instalar a dependencia de desenvolvimento tsx - "npm i tsx -D"
8 - Adicionar um script para facilitar rodar as aplicações. "npx watch src/server.ts" - Agora para rodar basta digitar "npm run dev"
