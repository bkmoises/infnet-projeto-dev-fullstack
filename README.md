# INFNET - Desenvolvimento Full Stack com React e Spring Boot 

## Lista de Carros
- Autor: Moisés Reis de Andrade

---

## Instruções de Execução

Para executar a aplicação localmente, siga as etapas abaixo:

### Pré-requisitos

1. **Instalar o Node.js e npm**:
   O Node.js é necessário para executar a aplicação, e o npm (Node Package Manager) é instalado automaticamente com o Node.js. Siga os passos abaixo para instalar:

   - **Windows**:
     - Acesse a página oficial do [Node.js](https://nodejs.org/) e baixe o instalador para Windows.
     - Execute o instalador e siga as instruções na tela, certificando-se de marcar a opção para instalar o npm.

   - **macOS**:
     - Abra o Terminal e execute o seguinte comando para instalar o Node.js via Homebrew (caso não tenha o Homebrew, instale-o primeiro):
       ```bash
       brew install node
       ```

   - **Linux**:
     - Para distribuições baseadas em Debian/Ubuntu, execute:
       ```bash
       sudo apt update
       sudo apt install nodejs npm
       ```

   Após a instalação, você pode verificar se o Node.js e o npm foram instalados corretamente com os comandos:
   ```bash
   node -v
   npm -v
   ```

### Passo a Passo

1. **Execução do Backend**
   Para execução do projeto, será necessário executar o backend utilizado. Acesso o repositório [https://github.com/leoinfnet/trabalho_final_react_noite](https://github.com/leoinfnet/trabalho_final_react_noite) e siga as instruções do README.md para execução.

3. **Clone o Repositório**:
   Abra o terminal e clone o repositório onde o projeto está armazenado:
   ```bash
   git clone https://github.com/bkmoises/infnet-projeto-dev-react
   cd infnet-projeto-dev-react
   ```

4. **Instale as Dependências**:
   Execute o seguinte comando para instalar todas as dependências necessárias, conforme especificado no `package.json`:
   ```bash
   npm install
   ```

5. **Inicie a Aplicação**:
   Para simular o backend da aplicação, execute o comando:
   ```bash
   npm start
   ```
   Isso executa a aplicação e você pode acessá-la em `http://localhost:8089` (ou outra porta, se configurada).
