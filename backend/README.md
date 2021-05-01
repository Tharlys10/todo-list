# Usuário

## Cadastro de usuário
**RF**
  * Deve ser possível cadastrar um novo usuário
  * O usuário deve recebe um e-mail de boas vindas

**RNF**
  * Deve ser utilizado o nodemailer para envio de e-mail

**RN**
  * [] Não deve ser possível cadastrar um usuário com o e-mail já existente
  * [] O usuário deve ser cadastro sem avatar
  * [] No final do cadastro deve ser enviado um e-mail de boas vindas para o e-mail do usuário

## Buscar usuário pelo ID
**RF**
  * Deve ser possivel localizar um usuário pelo id 

**RN**
  * [] O usuário deve está logado

## Atualização de avatar
**RF**
  * Deve ser possível atualizar o avatar de um usuário

**RNF**
  * Deve ser utilizado o multer para upload dos arquivos

**RN**
  * [] O usuário deve está logado

# Categoria

## Cadastro de categoria
**RF**
  * Deve ser possível cadastrar uma nova categoria

**RN**
  * [] O usuário deve está logado
  * [] Não deve ser possivel cadastrar uma categoria já existente com o mesmo nome
  
## Listagem de categorias
**RF**
  * Deve ser possível lista todas as categorias

**RN**
  * [] O usuário deve está logado

# Tarefas

## Cadastro de tarefa
**RF**
  * Deve ser possível cadastrar uma nova tarefa

**RN**
  * [] O usuário deve está logado
  * [] A tarefa deve ser cadastrador, por padrão, como não finalizada

## Listagem de tarefa do usuário
**RF**
  * Deve ser lista todas as tarefas de um usuário

**RN**
  * [] O usuário deve está logado

## Finalização/Abetura de tarefa
**RF**
  * Deve ser possível finalizar uma tarefa
  * Deve ser possível reabrir uma tarefa

**RN**
  * [] O usuário deve está logado
  * [] Deve ser possivel marcar uma tarefa como finalizada e não finalizada

---

# Routes

### User
* POST -> /users
* GET -> /users/profile
* PATCH -> /users/avatar

### Category
* POST -> /categories
* GET -> /categories

### Task
* POST -> /tasks
* GET -> /tasks/user
* PATCH -> /tasks/status/:value

### Authentication
* POST -> /session
* POST -> /refresh/token