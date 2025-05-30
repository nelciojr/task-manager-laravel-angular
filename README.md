
# Projeto Laravel + Angular - Gestão de Usuários

Sistema completo de gestão de usuários, utilizando **Laravel** no backend e **Angular standalone** no frontend.

Inclui autenticação JWT, refresh token automático, ambiente dockerizado e interface moderna com Tailwind CSS.

## Tecnologias utilizadas

- **Backend**
  - Laravel 10
  - JWT Auth (tymon/jwt-auth)
  - MySQL
  - Docker

- **Frontend**
  - Angular 17 Standalone
  - Tailwind CSS
  - RxJS
  - Angular Router e Http Interceptor
  - Docker

- **DevOps**
  - Docker / Docker Compose
  - Makefile para automação


- **Configuração de Segurança com Nginx**

  Este projeto utiliza o Nginx como proxy reverso para garantir mais segurança e performance na aplicação.
  Benefícios da utilização do Nginx:
  - Proxy reverso protegendo diretamente a aplicação Laravel
  - Camada adicional de segurança HTTP
  - Redirecionamento de rotas para melhor organização das requisições
  - Controle de acesso aos arquivos sensíveis da aplicação
  - Preparação futura para HTTPS (SSL/TLS)

## Funcionalidades

- Autenticação com JWT
- Refresh Token automático após expiração
- Proteção de rotas privadas com AuthGuard
- Interceptor para anexar token nas requisições
- CRUD completo de usuários (listar, visualizar, editar, excluir)
- Confirmação visual antes de excluir usuários
- Notificações para ações e erros
- Interface limpa e responsiva

## Estrutura do projeto

```
backend/          # Laravel API
frontend/         # Angular App
docker-compose.yml
Makefile
```

## Instalação e execução

### Pré-requisitos
- Docker
- Docker Compose

### Passos

Clone o projeto:

```
git clone https://github.com/nelciojr/task-manager-laravel-angular
cd task-manager-laravel-angular
```

Suba os containers:

```
make full-setup
```

Acesse:
- Frontend: http://localhost:4200
- Backend API: http://localhost:8000/api

### Banco de dados
- Host: localhost
- Usuário: root
- Senha: root
- Banco: laravel

Popular banco (opcional):

```
make artisan-seed
```

## Endpoints da API

### Autenticação

| Método | Rota          | Descrição                          | Status esperado |
|--------|---------------|------------------------------------|----------------|
| POST   | /api/login    | Login do usuário                   | 200 OK / 401 Unauthorized |
| POST   | /api/logout   | Logout do usuário                  | 200 OK |
| POST   | /api/refresh  | Renovação do token JWT             | 200 OK / 401 Unauthorized |
| GET    | /api/me       | Perfil do usuário autenticado      | 200 OK / 401 Unauthorized |

### Usuários

| Método | Rota            | Descrição                       | Status esperado |
|--------|-----------------|---------------------------------|----------------|
| GET    | /api/users      | Lista todos os usuários         | 200 OK |
| GET    | /api/users/{id} | Detalha um usuário específico   | 200 OK / 404 Not Found |
| PUT    | /api/users/{id} | Atualiza dados do usuário       | 200 OK / 404 Not Found / 422 Unprocessable Entity |
| DELETE | /api/users/{id} | Remove um usuário               | 200 OK / 404 Not Found |

### Registro de Usuário

| Método | Rota            | Descrição                       | Status esperado                                         |
|--------|-----------------|---------------------------------|---------------------------------------------------------|
| POST   | /api/register      | Cria um novo usuário        | 201 Created / 422 Unprocessable Entity: Validação falho |

***Request Body:***
```
{
"name": "Nome do Usuário",
"email": "email@example.com",
"password": "password"
}
```


## Fluxo da aplicação

1. Login com credenciais
2. Token armazenado no localStorage
3. Interceptor injeta token nas requisições automaticamente
4. Dashboard carrega lista de usuários
5. Operações de visualizar, editar ou excluir usuário
6. Notificações visuais para cada ação
7. Refresh token automático para manter a sessão ativa
8. Logout manual limpa o token e redireciona para login

## Implementações extras

- Refresh Token automático após expiração
- Interceptor Angular para token automático
- NotificationService para mensagens globais
- ConfirmationService para ações críticas
- Validação de e-mails duplicados no backend
- Layout responsivo e profissional
- Makefile para facilitar comandos Docker

## Melhorias futuras

- Recuperação de senha por e-mail
- Cadastro de novos usuários pelo frontend
- Filtro e paginação na listagem de usuários
- Perfil de usuário: Admin / User para permissões avançadas
- Testes automatizados e integração contínua (CI/CD)
- Configurar HTTPS com certificado SSL (Let's Encrypt ou outro)
- Configurar cache estático para melhorar performance
- Implementar rate limiting para prevenir ataques de força bruta


