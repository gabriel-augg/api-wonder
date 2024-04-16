# Wonder-API RESTful

Esta API foi desenvolvida seguindo os padrões REST, e foi feita em conjunto com o projeto Wonder. 

Wonder é uma rede social de mensagens de textos semelhante ao X, antigo Twitter. No total há 2 CRUD e outras rotas. Sendo elas seguindo os modelos: USER, POST, ANSWER, LIKE e FOLLOWS. 

Cique [aqui](https://github.com/gabriel-augg/wonder) para mais informações sobre o projeto Wonder.

Cique [aqui]() para ver os ENDPOINTS da API.

## 💻 Tecnologias

- JavaScript
- Express
- Sequelize
- MySQL
- MVC
- JWT
- Bcrypt
- CORS

## 🚀 Getting started

Para rodar esta API localmente, é necessério fazer clone do projeto e instalar todas as suas dependências.

### Requisitos

- Git
- Node
- NPM
- MySQL

### Clonando o repositório

```bash
git clone https://github.com/gabriel-augg/wonder-api
```

### Configurando variáveis .env

Crie um arquivo .env no raiz  do repositório e defina as seguintes variáveis:

```yaml
PORT=3000

DB_NAME="wonder"

SERVER_USERNAME="root"

SERVER_HOST="localhost"

SERVER_PORT=3306

SERVER_PASSWORD=""
```

Defina os valores das variáveis de acordo com as suas configurações.

### Iniciando

```bash
npm start
```



## 📍 API Endpoints​

Para informações mais especificas, consulte a documentação da API [aqui](https://documenter.getpostman.com/view/33182163/2sA3BkcDYP).

/AUTH

| routes               | description
|----------------------|-----------------------------------------------------
| <kbd>POST /auth/signup</kbd>     | retorna o token do usuários.
| <kbd>POST /auth/signin</kbd>     | retorna o token do usuários.

/USERS

| routes               | description
|----------------------|-----------------------------------------------------
| <kbd>GET /users/check-user</kbd> <kbd>Protegida</kbd>    | retorna os dados do usuário do logado.
| <kbd>GET /users/:id/get-user</kbd>     | retorna os dados do usuário.
| <kbd>PUT /users/update-user</kbd> <kbd>Protegida</kbd>     | atualiza as informações do usuário.
| <kbd>PATCH /users/add-posts-count</kbd> <kbd>Protegida</kbd>     | adiciona um a quantidade de posts.
| <kbd>PATCH /users/remove-posts-count</kbd> <kbd>Protegida</kbd>      | subtrai um a quantidade de posts.
| <kbd>PATCH /users/add-follows-count</kbd>  <kbd>Protegida</kbd>     | adiciona um a quantidade de seguidores.
| <kbd>PATCH /users/remove-follows-count</kbd> <kbd>Protegida</kbd>      | subtrai um a quantidade de seguidores.

/POSTS

| rotas               | descrição
|----------------------|-----------------------------------------------------
| <kbd>GET /posts</kbd>    | retorna todas as publicações.
| <kbd>GET /posts/:id/get-post</kbd>   | retorna uma publicação com o id da publicações.
| <kbd>GET /posts/my-posts</kbd> <kbd>Protegida</kbd>    | retorna todas publicações do usuário logado.
| <kbd>GET /posts/my-likes</kbd> <kbd>Protegida</kbd>    | retorna todas publicações curtidas pelo usuário logado.
| <kbd>POST /posts/create</kbd> <kbd>Protegida</kbd>    | cria uma publicação.
| <kbd>PUT /posts/update-post</kbd> <kbd>Protegida</kbd>    | atualiza a publicação com base no id.
| <kbd>PATCH /posts/:id/add-answers-count</kbd> <kbd>Protegida</kbd>    | adiciona um a quantidade de respostas.
| <kbd>PATCH /posts/:id/remove-answers-count</kbd> <kbd>Protegida</kbd>    | subtrai um a quantidade de respostas.
| <kbd>PATCH /posts/:id/add-likes-count</kbd> <kbd>Protegida</kbd>    | adiciona um a quantidade de likes.
| <kbd>PATCH /posts/:id/remove-likes-count</kbd> <kbd>Protegida</kbd>    | subtrai um a quantidade de likes.
| <kbd>DELETE /posts/:id/remove-post</kbd> <kbd>Protegida</kbd>    | deleta o post com base no id.

/ANSWERS
| rotas               | descrição
|----------------------|-----------------------------------------------------
| <kbd>POST /answers/create</kbd>  <kbd>Protegida</kbd>  | cria uma respostas com base no id da publicação.
| <kbd>GET /posts/:id/get-post</kbd>   | retorna uma publicação com o id da publicações.
| <kbd>PATCH /answers/:id/add-likes-count</kbd> <kbd>Protegida</kbd>    | adiciona um a quantidade de likes.
| <kbd>PATCH /answers/:id/remove-likes-count</kbd> <kbd>Protegida</kbd>    | subtrai um a quantidade de likes.

/LIKES
| rotas               | descrição
|----------------------|-----------------------------------------------------
| <kbd>GET /likes/:id/post</kbd>  <kbd>Protegida</kbd>  | verifica se o usuário já curtiu a publicação com o id do usuário.
| <kbd>GET /likes/:id/answer</kbd>  <kbd>Protegida</kbd>  | verifica se o usuário já curtiu a resposta com o id do usuário.
| <kbd>POST /likes/posts/:id/like</kbd>  <kbd>Protegida</kbd> | cria o like com base no id da publicação e do usuário
| <kbd>POST /likes/answers/:id/like</kbd>  <kbd>Protegida</kbd> | cria o like com base no id da resposta e do usuário
| <kbd>DELETE /likes/posts/:id/dislike</kbd>  <kbd>Protegida</kbd> | remove o like com base no id da publicação e do usuário
| <kbd>DELETE /likes/answers/:id/dislike</kbd>  <kbd>Protegida</kbd> | remove o like com base no id da resposta e do usuário

/FOLLOWS

| rotas               | descrição
|----------------------|-----------------------------------------------------
| <kbd>GET /follows/:id/followed</kbd>  <kbd>Protegida</kbd>  | verifica se um usuário segue outro com base no id.
| <kbd>POST /follows/:id/follow</kbd>  <kbd>Protegida</kbd> | cria um registro do seguidor com base no id do usuário
| <kbd>DELETE /follows/:id/unfollow</kbd>  <kbd>Protegida</kbd> | remove um registro do seguidor com base no id do usuário









