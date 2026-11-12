import { Component, computed, signal } from '@angular/core';

interface Tarefa {
  id: number;
  titulo: string;
  concluida: boolean;
}

@Component({
  selector: 'app-gerenciador',
  standalone: true,
  imports: [],
  styleUrl: './gerenciador.css',
  templateUrl: './gerenciador.html',
})
export class Gerenciador {
  novaTarefa = signal('');
  private proximoId = 4;

  tarefas = signal<Tarefa[]>([
    { id: 1, titulo: 'Estudar TypeScript', concluida: false },
    { id: 2, titulo: 'Criar projeto Angular', concluida: true },
    { id: 3, titulo: 'Praticar Signals', concluida: false }
  ]);

  pendentes = computed(() => this.tarefas().filter(tarefa => !tarefa.concluida).length);

  tarefasConcluidas = computed(() => {
    const lista = this.tarefas();
    return lista.length > 0 && lista.every(tarefa => tarefa.concluida);
  });

  atualizarTexto(evento: Event) {
    const campo = evento.target as HTMLInputElement;
    this.novaTarefa.set(campo.value);
  }

  adicionarTarefa() {
    const texto = this.novaTarefa().trim();
    if (texto.length < 3) return;
    
    const tarefa: Tarefa = {
      id: this.proximoId++,
      titulo: texto,
      concluida: false
    };
    this.tarefas.update(lista => [...lista, tarefa]);
    this.novaTarefa.set('');
  }

  alternar(id: number) {
    this.tarefas.update(lista => 
      lista.map(tarefa => tarefa.id === id ? { ...tarefa, concluida: !tarefa.concluida } : tarefa)
    );
  }
  
  excluir(id: number) {
    this.tarefas.update(lista => lista.filter(tarefa => tarefa.id !== id));
  }

  limparTarefasConcluidas() {
    this.tarefas.update(lista => lista.filter(tarefa => !tarefa.concluida));
  }

  limparTodasTarefas() {
    this.tarefas.set([]);
  }
}