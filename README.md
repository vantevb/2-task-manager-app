# TaskFlow: Sistema de Gestão de Produtividade e Operações

## Visão Geral
O TaskFlow é um micro-sistema web concebido para o controle de tarefas diárias e gestão de produtividade. O projeto foca no gerenciamento de estados lógicos (CRUD completo) e na persistência de dados, oferecendo uma interface reativa para o monitoramento de pendências operacionais.

## Contexto e Problema de Negócio
Ambientes operacionais necessitam de ferramentas de acompanhamento que não adicionem atrito cognitivo ao usuário. O TaskFlow resolve a complexidade excessiva de gerenciadores tradicionais ao focar exclusivamente na entrada ágil de dados, na transição visual de estados (pendente para concluído) e na organização automática baseada na prioridade de execução.

## Documentação Técnica e Arquitetura (RFC)

### 1. Requisitos do Sistema
**Requisitos Funcionais (RF):**
- [RF-01] O sistema deve permitir a criação e leitura de novas tarefas textuais.
- [RF-02] O sistema deve permitir a alteração do estado lógico da tarefa (booleano de pendente para concluída e vice-versa).
- [RF-03] O sistema deve ordenar automaticamente a lista, priorizando tarefas pendentes no topo e realocando as concluídas na base da estrutura de dados.
- [RF-04] O sistema deve calcular e exibir indicadores quantitativos de progresso operacional (tarefas pendentes vs. concluídas).
- [RF-05] O sistema deve permitir a exclusão de tarefas individuais e a limpeza em lote do histórico de tarefas já concluídas.

**Requisitos Não Funcionais (RNF):**
- [RNF-01] A interface não deve sofrer bloqueios (Non-blocking UI) durante a reordenação das listas.
- [RNF-02] O estado da aplicação deve ser integralmente persistido entre sessões utilizando a API de LocalStorage do navegador.

### 2. Registro de Decisão de Arquitetura (ADR)
- **Single Source of Truth (SSOT):** O estado da aplicação não é inferido a partir dos elementos visuais do DOM. Toda a "fonte de verdade" reside em um array de objetos em memória (`this.tasks`). Qualquer alteração de estado modifica o array e dispara um método de renderização determinístico, assemelhando-se ao fluxo de trabalho de bibliotecas reativas modernas.
- **Identificação Única Criptográfica:** Para garantir a integridade referencial nas operações de atualização (Update) e exclusão (Delete), cada tarefa recebe um identificador único via `crypto.randomUUID()` no exato momento de sua instanciação.

## Tecnologias Utilizadas
- Estrutura e Estilização: HTML5 Semântico e CSS3 (Design System modular com suporte a Dark Mode nativo).
- Lógica de Negócios: JavaScript (ES6+) aplicando princípios de Programação Orientada a Objetos (POO) e métodos iterativos de array (`filter`, `sort`, `reduce`).
- Iconografia: Phosphor Icons.

## Execução do Projeto
Para inspecionar ou executar a aplicação localmente, realize o clone do repositório:

```bash
git clone [https://github.com/vantevb/2-task-manager-app.git](https://github.com/vantevb/2-task-manager-app.git)