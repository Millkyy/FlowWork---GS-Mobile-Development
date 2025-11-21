## Integração API — Sprint 4

Este app agora consome a API REST (C#/.NET) incluída em `backend-sprint4/` com os seguintes endpoints:

- `GET /api/Cliente` — lista clientes
- `GET /api/Cliente/{id}` — obtém um cliente
- `GET /api/Cliente/search?query=` — busca por nome/email
- `POST /api/Cliente` — cria cliente `{ nomeCompleto, email }`
- `PUT /api/Cliente/{id}` — atualiza cliente
- `DELETE /api/Cliente/{id}` — remove cliente

- `GET /api/Investimento` — lista investimentos (com Cliente)
- `GET /api/Investimento/search?query=` — busca por parte do nome
- `POST /api/Investimento` — cria investimento `{ nomeInvestimento, valorAplicado, clienteId }`
- `PUT /api/Investimento/{id}` — atualiza
- `DELETE /api/Investimento/{id}` — remove

### Como rodar (em paralelo)

1. **API (.NET 8 / SQLite)**  
   ```bash
   cd backend-sprint4/sprint4
   dotnet restore
   dotnet run
   # escuta em http://localhost:62121 (HTTPS em 62120)
   ```

2. **Mobile (Expo)**  
   ```bash
   npm i
   npm run start
   ```

- No **Android Emulator**, o app usa automaticamente `http://10.0.2.2:62121` como base.  
- No **iOS/Web**, usa `http://localhost:62121`.

### Funcionalidades (CRUD + UX)

- Abas **Clientes** e **Investimentos** implementam CRUD completo com validação de campos, mensagens de erro claras e botão “Tentar novamente” quando houver interrupção.  
- Cliente: criar/editar/excluir e busca por nome/email.  
- Investimento: criar/editar/excluir, valor numérico validado e vínculo a `clienteId`.  
- Camada `src/services/http.ts` inclui **retentativas automáticas** (backoff) para falhas de rede/5xx.  
- Pastas organizadas por **domain/services/screens**, visando clareza arquitetural.

# InvestBot - Mobile Development Challenge XP

## Contexto

  Este projeto foi desenvolvido durante o **Challenge XP Inc. 2025 – Assessor Virtual de Investimentos**, na disciplina de Mobile Development and IoT. O objetivo é oferecer um **chatbot educacional** que recomenda carteiras personalizadas e ensina conceitos financeiros de forma acessível.

## Funcionalidades

* **Autenticação & Cadastro**: fluxo de criação de conta e login local.
  
* **Quiz de Perfil**: determina o perfil (*Conservador*, *Moderado* ou *Agressivo*) através de perguntas interativas.
  
* **Recomendações**: exibe carteiras adequadas ao perfil obtido no quiz.
  
* **XP Bot**: chatbot com tópicos educativos (Renda Fixa, Liquidez, Diversificação, FIIs, Ações) e respostas em diferentes níveis de profundidade.
  
* **Perfil do Usuário**: mostra nome e e‑mail, com opção de logout.
  
* **UI/UX**: tema escuro com destaques em amarelo XP, navbar inferior customizada e logo fixa no header.

## Link do Figma

https://www.figma.com/design/BYiRCM0Ay9LoOUVta1cN9R/InvestBot---Challenge-Mobile-XP?node-id=0-1&t=gUV677zlEi6gOFip-1

## Tecnologias

* **Expo** (React Native)
* **TypeScript**
* **React Navigation** (Stack & Bottom Tabs)
* **AsyncStorage** para persistência local de dados
* **Styled-components** para estilização modular

## Estrutura

```plaintext
Mobile_Challenge/
├─ App.tsx
├─ src/
│  ├─ navigation/
│  │  ├─ AppNavigator.tsx
│  │  └─ HomeTabs.tsx
│  ├─ screens/
│  │  ├─ LoginScreen/
│  │  │  ├─ index.tsx
│  │  │  ├─ styles.ts
│  │  │  └─ services/authService.ts
│  │  ├─ SignupScreen/
│  │  │  ├─ index.tsx
│  │  │  └─ hooks/useSignup.ts
│  │  ├─ SimulationScreen/
│  │  │  ├─ index.tsx
│  │  │  ├─ styles.ts
│  │  │  ├─ hooks/useSimulation.ts
│  │  │  └─ models/questions.ts
│  │  ├─ RecommendationScreen/
│  │  │  ├─ index.tsx
│  │  │  └─ components/RecommendationCard.tsx
│  │  ├─ LearningPathScreen/
│  │  │  ├─ index.tsx
│  │  │  ├─ styles.ts
│  │  │  └─ components/InputBar.tsx
│  │  └─ ProfileScreen/
│  │     ├─ index.tsx
│  │     ├─ hooks/useProfileScreen.ts
│  │     └─ components/LogoutButton.ts
│  └─ assets/
└─ package.json
```
Essa estrutura facilita **manutenção**, **escalabilidade e testabilidade** do projeto, atendendo ao critério de organização de pastas e arquitetura.

## Uso

1. Crie uma conta em **Criar Conta**.
2. Faça login.
3. Responda ao **Quiz de Perfil**.
4. Navegue pelas abas: **Simulação**, **Recomendações**, **XP Bot** e **Perfil**.

## Telas
![image](https://github.com/user-attachments/assets/27c63b6e-bb86-4cfe-a3bd-a2ae56e49500)

**Página de Login** erro se tentar fazer login sem nenhum campo preenchido ou com usuário e senha errados.


![image](https://github.com/user-attachments/assets/6b5ead48-e6a4-4733-9aa1-34bf33f3868b)

**Página de Cadastro** erro se tentar fazer cadastro sem preencher todos os campos.


![image](https://github.com/user-attachments/assets/e9076200-7d98-47aa-b330-c227bd3fbd3b)

**Página do Quiz de perfil** determina o perfil de investimento.


![image](https://github.com/user-attachments/assets/8d712690-874e-438d-8190-d49a8bba3ada)

**Página de Recomendação** mensagem que aparece se o usuário tenta acessar a página antes de completar o quiz.


![image](https://github.com/user-attachments/assets/ad583da6-1e76-4bfb-93f1-71b22d135d4f)

**Página de Recomendação** mostra recomendações personalizadas de acordo com o perfil de investimento.


![image](https://github.com/user-attachments/assets/b47aef3c-d176-4411-9e49-a7646d056fc3)

**Página do XP Bot** chatbot educativo.


![image](https://github.com/user-attachments/assets/e2bf2cc2-2f25-47e2-a15c-d82af8594785)

**Página do Perfil** mostra seu nome, email e a opção de sair.

## Grupo

Aline Fernandes Zeppelini - RM97966

Camilly Breitbach Ishida - RM551474

Jessica Witzler Costacurta – RM99068

Julia Leite Galvão - RM550201
