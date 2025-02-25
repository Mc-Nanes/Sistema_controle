# Controle de Gastos

## Descrição

Este é um projeto de **Controle de Gastos** desenvolvido em **React** com **Vite** no frontend e **Django** no backend. Ele permite o cadastro e gerenciamento de pessoas e transações financeiras, bem como a visualização de totais de receitas, despesas e saldo.

## Funcionalidades

### 📋 Cadastro de Pessoas
- ✅ Criar pessoa com **Nome** e **Idade**.
- ✅ Listar todas as pessoas cadastradas.
- ✅ Deletar uma pessoa.
  - 🔄 Ao deletar uma pessoa, todas as transações vinculadas a ela também são removidas.

### 💳 Cadastro de Transações
- ✅ Criar transações financeiras associadas a uma pessoa.
  - Cada transação possui:
    - Descrição
    - Valor (positivo)
    - Tipo (**Receita** ou **Despesa**)
    - Pessoa associada
  - ⚠️ **Restrições:**
    - Para menores de 18 anos, **apenas despesas** podem ser cadastradas.
- ✅ Listar todas as transações cadastradas.

### 📊 Consulta de Totais
- ✅ Exibe para cada pessoa:
  - Total de receitas
  - Total de despesas
  - Saldo (Receitas - Despesas)
- ✅ Exibe o total geral de:
  - Receitas
  - Despesas
  - Saldo líquido

---

## 🚀 Como Rodar o Projeto

### 1️⃣ Clonando o Repositório
```bash
git clone https://github.com/seu-usuario/Sistema_controle.git
cd controle-gastos
```

### 2️⃣ Configurando o Backend (Django)
1. Acesse o diretório do backend:
   ```bash
   cd controle-gastos-backend
   ```
2. Crie e ative um ambiente virtual:
   ```bash
   python -m venv venv
   source venv/bin/activate  # Linux/Mac
   venv\Scripts\activate    # Windows
   ```

3. Configure o banco de dados:
   - No arquivo `controle-gastos-backend/settings.py`, atualize as credenciais do banco PostgreSQL:
     ```python
     DATABASES = {
         'default': {
             'ENGINE': 'django.db.backends.postgresql',
             'NAME': 'nome_do_seu_banco',
             'USER': 'seu_usuario',
             'PASSWORD': 'sua_senha',
             'HOST': 'localhost',
             'PORT': '5432',
         }
     }
     ```
4. Execute as migrações:
   ```bash
   python manage.py makemigrations
   python manage.py migrate
   ```
5. Inicie o servidor:
   ```bash
   python manage.py runserver
   ```
   O backend estará rodando em: **http://localhost:8000**

### 3️⃣ Configurando o Frontend (React + Vite)
1. Acesse o diretório do frontend:
   ```bash
   cd ../controle-gastos-frontend
   ```
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```
   O frontend estará disponível em: **http://localhost:5173**

---

## 🛠️ Tecnologias Utilizadas

- **Frontend:**
  - [React](https://reactjs.org/)
  - [Vite](https://vitejs.dev/)
  - [TypeScript](https://www.typescriptlang.org/)
  - [CSS]()

- **Backend:**
  - [Django](https://www.djangoproject.com/)
  - [Django REST Framework](https://www.django-rest-framework.org/)
  - [PostgreSQL](https://www.postgresql.org/)


## 📁 Estrutura do Projeto

```
controle-gastos/
├── controle_gastos_backend/      # Backend (Django)
│   ├── manage.py
│   └── ...
│
├── controle_gastos_frontend/     # Frontend (React/TypeScript + Vite)
│   ├── src/
│   │   ├── components/
│   │   │   |── Pessoa.tsx
│   │   │   ├── Transacao.tsx
│   │   │   └── Totais.tsx
│   │   └── App.tsx
│   └── vite.config.ts
│
└── README.md
```

## 🧑‍💻 Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir uma _issue_ ou enviar um _pull request_.

1. Faça um **fork** do projeto
2. Crie sua branch (`git checkout -b feature/NovaFuncionalidade`)
3. Commit suas alterações (`git commit -m 'feat: Adiciona nova funcionalidade'`)
4. Push para a branch (`git push origin feature/NovaFuncionalidade`)
5. Abra um **Pull Request**




Desenvolvido por **Leonardo Nanes** 🚀



