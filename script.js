// --- CAMADA DE DADOS (Persistência) ---
class Storage {
    static getTasks() {
        const tasks = localStorage.getItem('taskflow_tasks');
        return tasks ? JSON.parse(tasks) : [];
    }

    static saveTasks(tasks) {
        localStorage.setItem('taskflow_tasks', JSON.stringify(tasks));
    }
}

// --- CONTROLADOR PRINCIPAL (Regras de Negócio e Interface) ---
class TaskManager {
    constructor() {
        // Estado da aplicação
        this.tasks = Storage.getTasks();
        
        // Elementos DOM
        this.form = document.getElementById('task-form');
        this.input = document.getElementById('task-input');
        this.list = document.getElementById('task-list');
        this.pendingCount = document.getElementById('pending-count');
        this.completedCount = document.getElementById('completed-count');
        this.clearBtn = document.getElementById('clear-all-btn');
        
        this.init();
    }

    init() {
        // Escutadores de Eventos
        this.form.addEventListener('submit', this.addTask.bind(this));
        this.clearBtn.addEventListener('click', this.clearCompleted.bind(this));
        
        // Renderiza a tela inicial
        this.render();
    }

    addTask(e) {
        e.preventDefault();
        
        const text = this.input.value.trim();
        if (!text) return; // Evita tarefas em branco

        const newTask = {
            id: crypto.randomUUID(),
            text: text,
            completed: false, // Toda tarefa nasce como pendente
            createdAt: Date.now()
        };

        this.tasks.push(newTask);
        Storage.saveTasks(this.tasks);
        
        this.input.value = ''; // Limpa o campo
        this.render();
    }

    toggleTaskStatus(id) {
        // Encontra a tarefa e inverte o status dela (de false para true, ou vice-versa)
        const task = this.tasks.find(t => t.id === id);
        if (task) {
            task.completed = !task.completed;
            Storage.saveTasks(this.tasks);
            this.render();
        }
    }

    deleteTask(id) {
        // Filtra o array, mantendo apenas as tarefas que NÃO têm o ID selecionado
        this.tasks = this.tasks.filter(t => t.id !== id);
        Storage.saveTasks(this.tasks);
        this.render();
    }

    clearCompleted() {
        // Mantém apenas as tarefas que ainda estão pendentes
        this.tasks = this.tasks.filter(t => !t.completed);
        Storage.saveTasks(this.tasks);
        this.render();
    }

    render() {
        this.list.innerHTML = '';
        let pending = 0;
        let completed = 0;

        // Lógica de Ordenação: Tarefas pendentes ficam no topo, concluídas vão para o final
        const sortedTasks = [...this.tasks].sort((a, b) => {
            if (a.completed === b.completed) return b.createdAt - a.createdAt; // Mais recentes primeiro
            return a.completed ? 1 : -1; 
        });

        sortedTasks.forEach(task => {
            // Atualiza os contadores
            if (task.completed) {
                completed++;
            } else {
                pending++;
            }

            // Cria o elemento visual da tarefa
            const li = document.createElement('li');
            li.className = `task-item ${task.completed ? 'completed' : ''}`;
            
            li.innerHTML = `
                <div class="task-content">
                    <button class="toggle-btn" title="Marcar como concluída">
                        <i class="ph ${task.completed ? 'ph-check-circle fill' : 'ph-circle'}"></i>
                    </button>
                    <span class="task-text">${task.text}</span>
                </div>
                <button class="delete-btn" title="Excluir tarefa">
                    <i class="ph ph-trash"></i>
                </button>
            `;

            // Encapsulamento: Adiciona os eventos diretamente aos botões gerados
            li.querySelector('.toggle-btn').addEventListener('click', () => this.toggleTaskStatus(task.id));
            li.querySelector('.delete-btn').addEventListener('click', () => this.deleteTask(task.id));

            this.list.appendChild(li);
        });

        // Atualiza o painel de estatísticas no topo da página
        this.pendingCount.innerText = pending;
        this.completedCount.innerText = completed;
    }
}

// Inicia a aplicação
const app = new TaskManager();