Primeiro criar a pasta web e dentro dela rodar o comando npm create vite@latest. Dar o nome do projeto, "web". Escolher o framework "React". Escolher "TypeScript" para desenvolver o projeto.
Acessar o projeto - cd web.
1 - Instalar as dependencias - npm install
1.1 - Para rodar o projeto  - npm run dev
1.2 - Limpar o projeto.
2 - Instalar biblioteca de estilização - nppm intall -D tailwindcss postcss autoprefixer
2.1 o Postcss é uma ferramenta para automatizar tarefas dentro do css
2.2 o autoprefixer vai adicionar os elementos de browser, como, -webkit-
3 - Para iniciar o tailwind - npx tailwindcss init -p
3.1 - o "-p" é para criar o arquivo postcss, para que o vite possa reconhecer o tailwind
3.2 - Intalar as extensões do postcss e tailwindcss
3.3 - Criar o arquivo global.css dentro da pasta styles
3.4 - Dentro do global.css colocar - @tailwind base; @tailwind utilities; @tailwind components;
3.5 - No app importar o global.css - import './styles/global.css'
3.6 - Dentro do arquivo tailwind.config.cjs, dentro do content colocar - content: ['./src/**/*.tsx','./index.html']
3.7 - Agora pode usar o tailwind, por exemplo: <div className="bg-zinc-900 w-10 h-10 text-white rounded m-2 flex items-center justify-center">
4 - Criar um componente "Habit.tsx" 

5 - Dentro de tailwind.config extender as configurações de cor e definir uma cor. - theme: { extend: {colors:{background: '#09090A'}},},
5.1 - Utilizar na classe body - <body class="bg-background">
6.1 - importar a lib de icons, phosphorIcons - npm i phosphor-react
6.1 - importar no projeto - import { plus } from "phosphor-react"