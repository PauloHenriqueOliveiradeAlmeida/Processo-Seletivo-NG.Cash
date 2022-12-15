
# Processo Seletivo NG.Cash

este é um Banking desenvolvido para o processo seletivo da NG.Cash

![GitHub repo size](https://img.shields.io/github/repo-size/pauloHenriqueOliveiradeAlmeida/processo-seletivo-NG.Cash?style=for-the-badge)  ![GitHub language count](https://img.shields.io/github/languages/count/pauloHenriqueOliveiradeAlmeida/processo-seletivo-NG.Cash?style=for-the-badge)


## Stack utilizada

**Geral**

![TypeScript](https://img.shields.io/badge/-typescript-336791?logo=typescript&logoColor=white&style=for-the-badge)
![Docker](https://img.shields.io/badge/-docker-0db7ed?logo=Docker&logoColor=white&style=for-the-badge)

**Front-end:**

![ReactJS](https://img.shields.io/badge/-ReactJs-61DAFB?logo=react&logoColor=black&style=for-the-badge) ![CSS](https://img.shields.io/badge/CSS3-blue?logo=css3&logoColor=white&style=for-the-badge)

**Back-end:**

![NextJS](https://img.shields.io/badge/-NextJS-black?style=for-the-badge&logo=next.js)
![PostgreSQL](https://img.shields.io/badge/-postgresql-336791?logo=postgresql&logoColor=white&style=for-the-badge)
![PrismaORM](https://img.shields.io/badge/-prisma-black?logo=prisma&logoColor=white&style=for-the-badge)

## Funcionalidades

- Cadastro de Usuários e Login
- Cash-in e Cash-out
- Lista de transferências


## Pré-Requisitos

Para o projeto funcionar, antes de tudo você precisará ter instalado:

* Docker
* Docker Compose
* Serviço de Banco de Dados Postgres (opcional)


## 🚀 Instalação

Para instalar o projeto em sua máquina, primeiro clone o repositório:

```bash
  git clone https://github.com/PauloHenriqueOliveiradeAlmeida/processo-seletivo-NG.Cash.git
```
Abra a pasta gerada no terminal:
```bash
  cd processo-seletivo-NG.Cash
```

## 💾 Banco de Dados

Caso queira usar seu próprio Banco de Dados, importe o arquivo ```database.sql``` em seu Banco e o inicie, caso não tenha um servidor de Banco de Dados Postgres, pule esta etapa.


## 👾 Variáveis de Ambiente
Para o projeto funcionar, você precisará criar/editar o arquivo
```.env``` e adicionar as seguintes variáveis:

```.env
DATABASE_URL=url do seu banco postgres
JWT_SECRET=senha para armazenar informações em tokens JWT
```
Caso não possua um serviço de Bancode Dados Postgres, use a seguinte credencial:

```bash
DATABASE_URL=postgres://dstatqvl:0WRyADbIdupQ5kAugyE08EMRFEYSKHEm@babar.db.elephantsql.com/dstatqvl
```


## 🚀 Rodando o projeto

Construa o projeto com Docker:

```bash
docker build -t seu_nome/processoseletivo-ng.cash .
```

Configure o Prisma:

```bash
npx prisma db pull
```

Gere os dados do Prisma
```bash
npx prisma generate
```

## 🏃‍♂️ Testando

Rode o Container com o Docker Compose
```bash
  docker-compose up
```
no terminal e abra a URL

https://localhost:3000


## ☕ Demonstração ao Vivo

Caso queira ver a demonstração, acesse:

https://processo-seletivo-ng-cash.vercel.app/
