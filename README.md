# FlowWork

Aplicativo mobile desenvolvido para a disciplina **Mobile Development & IoT (3º ano – Engenharia de Software, FIAP)**, utilizando **React Native + Expo + AsyncStorage**.

O FlowWork é uma proposta de plataforma gamificada para equipes presenciais ou remotas, focada em **produtividade sustentável**: em vez de premiar só quem produz mais, valoriza **ritmo saudável, equilíbrio e bem-estar**.

---

## 🌍 Problema & motivação

Em muitas empresas, especialmente com equipes distribuídas, as pessoas trabalham sob:

- metas agressivas  
- pressão constante  
- sensação de vigilância e controle

Ferramentas de ranking e produtividade até geram resultados no curto prazo, mas costumam:

- aumentar ansiedade e competição tóxica  
- esconder sinais de sobrecarga  
- elevar o risco de burnout  

O **FlowWork** nasce como uma alternativa a esse modelo: usa gamificação, mas com foco em **cuidado, saúde mental e colaboração**.

---

## 💡 Ideia do app

O app transforma o dia a dia de trabalho em:

- **Tarefas de trabalho** (ex.: “resolver ticket”, “abrir chamado”)  
- **Missões de bem-estar** (ex.: pausas, alongamentos, hidratação, check-ins de humor)  
- **Pontuação por equipe**, não por indivíduo

Os dados são salvos localmente com **AsyncStorage**, simulando como a solução poderia funcionar em escala em um produto real (com backend e IA).

---

## 📱 Funcionalidades principais

### 1. Login & Cadastro

- Tela de **cadastro** simples (nome, e-mail, senha – armazenados localmente).
- Tela de **login** para simular a entrada do colaborador no app.
- Após logar, o usuário vê uma experiência **personalizada** (saudação com o nome, resumo do dia só com os dados dele).

<img width="404" height="798" alt="image" src="https://github.com/user-attachments/assets/818e5dce-fab3-4909-b1d5-5efecb4c9007" />
<img width="402" height="796" alt="image" src="https://github.com/user-attachments/assets/fb0248fd-e6f7-4f84-b711-0c513785146e" />



> ☑️ Atende ao requisito de usar o app de forma individual/pessoal.

---

### 2. Missões (Home) – “trabalhar melhor, não mais”

Tela inicial após o login.

- Saudação personalizada: **“Olá, Milly!”** (pega o nome cadastrado).
- **Resumo de hoje (por usuário)**  
  - Tarefas de trabalho registradas hoje  
  - Missões de bem-estar registradas hoje  
  - Último check-in de humor
- **Quadro de missões** com checkboxes (diário, não persistido), por exemplo:  
  - Registrar 3 tarefas de trabalho  
  - Concluir 2 missões de bem-estar  
  - Fazer 1 check-in de humor no meio do expediente

  <img width="402" height="790" alt="image" src="https://github.com/user-attachments/assets/cc8b3fbd-e8a5-4e32-9d18-a2ccc5ae7aae" />


> Ideia: a pessoa não é cobrada por produzir mais que os outros, e sim por **cuidar do próprio fluxo de trabalho**.

---

### 3. Tarefas de trabalho

Tela para registrar atividades do dia a dia, associadas a uma **equipe**.

- Lista de tarefas já registradas (persistidas via AsyncStorage).
- Cada registro contém:
  - **Descrição** (ex.: “Resolveu ticket”, “Abriu chamado”)  
  - **Nome da pessoa**  
  - **Equipe** (vermelha, roxa ou azul)  
  - **Pontuação** (ex.: 5 pts)
- Formulário de cadastro:
  - Nome do usuário (preenchido automaticamente com o nome logado, mas editável)
  - **Seleção de equipe** via dropdown
  - Descrição da tarefa
  - Pontos atribuídos
- **Regra de segurança**:  
  - Cada usuário **só consegue excluir as tarefas que ele mesmo registrou**.

  <img width="402" height="796" alt="image" src="https://github.com/user-attachments/assets/6b388cd9-e3a7-46dd-8ab3-d3c7028f40eb" />


> Esses dados alimentam o **Ranking de equipes**.

---

### 4. Bem-estar & humor

Tela dedicada aos hábitos saudáveis e à saúde mental.


#### Check-in de humor & energia

- Usuário escolhe o humor em uma escala colorida:
  - 🟥 **Muito sobrecarregado**  
  - 🟧 Cansado  
  - 🟨 Ok  
  - 🟩 Bem  
  - 🟦 Em flow
- Informa nível de energia (1 a 5)
- Pode adicionar um comentário sobre o dia
- Tudo é salvo via AsyncStorage como histórico de check-ins.

#### Missões de bem-estar

- Formulário para registrar pequenas missões, por exemplo:
  - “Pausa de 5 minutos”
  - “Alongamento rápido”
  - “Bebeu água”
- Usuário escolhe:
  - Equipe (vermelha, roxa, azul)
  - Descrição da missão
  - Pontos (ex.: 3 pts)
- Essas missões também contam para o **ranking das equipes**.

<img width="401" height="796" alt="image" src="https://github.com/user-attachments/assets/87ee1ac4-53ae-4737-b54b-418901bd0494" />


> O app reforça que **se cuidar também conta pontos**, tanto para a pessoa quanto para o time.

---

### 5. Ranking de equipes

Tela pública, focada na visão **de time**, não individual.

- Mostra as três equipes fixas:
  - Equipe vermelha
  - Equipe roxa
  - Equipe azul
- Para cada equipe:
  - Total de pontos (tarefas + missões de bem-estar)
  - Posição no ranking (1º, 2º, 3º)
  - Lista de contribuições ao expandir:
    - **Nome da pessoa**
    - Descrição (tarefa ou missão)
    - Pontos (+X pts)

    <img width="398" height="717" alt="image" src="https://github.com/user-attachments/assets/b439e69b-b572-462d-962d-90555aed57b0" />


> O ranking é **coletivo**. Não há exposição de ranking individual “de melhor funcionário”, reduzindo o risco de competição tóxica.

---

### 6. Perfil do usuário

- Exibe nome e e-mail do colaborador.
- Permite **sair do app** (logout) e retornar às telas de login/cadastro.

<img width="406" height="796" alt="image" src="https://github.com/user-attachments/assets/26fac961-91f8-4f3f-9668-f9ed9463e665" />


---

## 🧠 Futuro do Trabalho & IA (conceito)

No protótipo mobile, a persistência é toda local (AsyncStorage).  
Na visão de produto completo, o FlowWork poderia:

- Coletar dados de tarefas, missões e check-ins de humor ao longo do tempo.
- Usar IA/analytics para:
  - detectar padrões de **sobrecarga** (muitas tarefas, poucos registros de pausa, humor caindo),
  - sugerir **ajustes de metas** ou redistribuição de trabalho,
  - sinalizar times com risco de burnout para ações preventivas de RH.

O foco é sempre **prevenir adoecimento**, não punir.

---

## 🛠️ Tecnologias utilizadas

- **React Native** (via **Expo**)  
- **TypeScript**  
- **React Navigation** (`@react-navigation/bottom-tabs`)  
- **AsyncStorage** (`@react-native-async-storage/async-storage`) para persistência local:
  - Tarefas de trabalho
  - Missões de bem-estar
  - Check-ins de humor
  - Dados simples de perfil/login

---

👥 Integrantes

- Camilly Ishida - RM551474 

- Jessica Witzler Costacurta - RM99068


Professor: Hete Caetano

Disciplina: Mobile Development & IoT – 3º ano Eng. de Software (ESR)
    
