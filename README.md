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
- `components/` → Interface e interação do usuário  
- `logic/` → Funções principais da calculadora  
- `utils/` → Formatação e funções auxiliares genéricas  
- `style/` → Tema centralizado (cores, espaçamento, tipografia)

---

**Principais arquivos:**

| Arquivo | Descrição |
|----------|------------|
| `App.tsx` | Componente principal. Armazena estados globais (`expression`, `memory`, `history`, `decimalPlaces`) e controla modais. |
| `calculate.ts` | Avalia expressões matemáticas com sanitização e arredondamento controlado. |
| `helper.ts` | Funções auxiliares de formatação, memória e aplicação de resultados. |
| `keyUtils.ts` | Normaliza teclas e trata inserção de números, operadores e funções. |
| `display.tsx` | Mostra o valor atual no display e trata a entrada pelo teclado. |
| `historyPanel.tsx` | Exibe o histórico de operações. |
| `memoryPanel.tsx` | Mostra valores guardados na memória e permite apagá-los. |

---

## Configuração de casas decimais

No modal de configurações (`settingsModal.tsx`), o usuário pode definir quantas casas decimais deseja exibir (padrão = 6).  
Futuras opções de personalização da calculadora poderão ser incluídas nesse modal.

---
