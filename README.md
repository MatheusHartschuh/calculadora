# Calculadora

Esta Calculadora foi desenvolvida em **React** com o uso de **Vite**, e terá seu deploy realizado via **Vercel**.  
---

## Funcionalidades principais

- Operações básicas: `+`, `-`, `×`, `÷`, `^`, `√`, `x²`
- Modal de funções trigonométricas: `sin`, `cos`, `tan`, `π`
- Histórico de cálculos
- Memória de valores (`MC`, `MR`, `M+`, `M-`)
- Configuração de casas decimais ajustáveis
- Tooltips explicando o uso de cada botão
- Tema visual customizado via arquivo `theme.ts`

---

## Estrutura do projeto

**Organização modular:**
- `components/` → Interface e interação do usuário, cada componente em sua pasta com `index.tsx` e `styles.ts`  
- `logic/` → Funções principais da calculadora  
- `utils/` → Formatação e funções auxiliares genéricas  
- `style/` → Tema centralizado (cores, espaçamento, tipografia)

---

**Principais arquivos e componentes:**

| Arquivo / Componente | Descrição |
|----------------------|-----------|
| `App.tsx` | Componente principal. Armazena estados globais (`expression`, `memory`, `history`, `decimalPlaces`) e controla modais. |
| `calculate.ts` | Avalia expressões matemáticas com sanitização e arredondamento controlado. |
| `helper.ts` | Funções auxiliares de formatação, memória e aplicação de resultados a expressões. |
| `keyUtils.ts` | Normaliza teclas e trata inserção de números, operadores, parênteses e funções. |
| `keyHandlers.ts` | Lógica principal das teclas (ação, função, memória e tratamento de erros). |
| `components/Display/index.tsx` | Mostra o valor atual no display e trata a entrada pelo teclado. |
| `components/HistoryPanel/index.tsx` | Exibe o histórico de operações. |
| `components/MemoryPanel/index.tsx` | Mostra valores guardados na memória e permite apagá-los. |
| `components/Keypad/index.tsx` | Exibe o teclado virtual com números, operadores e funções. |
| `components/Button/index.tsx` | Botão reutilizável com estilo dinâmico e tooltip. |
| `components/TrigModal/index.tsx` | Modal com funções trigonométricas e botão de fechamento. |
| `components/SettingsModal/index.tsx` | Modal de configurações para ajuste de casas decimais. |

---

## Configuração de casas decimais

No modal de configurações (`components/SettingsModal/index.tsx`), o usuário pode definir quantas casas decimais deseja exibir (padrão = 6).  
Futuras opções de personalização da calculadora poderão ser incluídas nesse modal.
