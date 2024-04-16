# Wonder-API RESTful

Esta API foi desenvolvida seguindo os padrões REST, e foi feita em conjunto com o projeto Wonder. 

Wonder é uma rede social de mensagens de textos semelhante ao X, antigo Twitter. No total há 2 CRUD e outras rotas. Sendo elas seguindo os modelos: USER, POST, ANSWER, LIKE e FOLLOWS. 

Cique [aqui](https://github.com/gabriel-augg/wonder) para mais informações sobre o projeto Wonder.

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
