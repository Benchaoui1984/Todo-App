import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';

@Injectable({
  providedIn: 'root',
})
export class DataService implements InMemoryDbService {
  constructor() {}
  createDb() {
    return {
      todos: [
        {
          id: 1,
          name: 'Hacer la compra',
          description: 'Comprar verduras, frutas y pan.',
        },
        {
          id: 2,
          name: 'Terminar el informe',
          description: 'Completar el informe para el proyecto.',
        },
        {
          id: 3,
          name: 'Ir al gimnasio',
          description: 'Hacer ejercicio por una hora.',
        },
        {
          id: 4,
          name: 'Llamar al médico',
          description: 'Hacer una cita para el chequeo anual.',
        },
        {
          id: 5,
          name: 'Estudiar para el examen',
          description: 'Revisar los apuntes y resolver problemas de práctica.',
        },
      ],
    };
  }
  // Método para generar un nuevo ID único
  genId(todos: any[]): number {
    return todos.length > 0 ? Math.max(...todos.map((todo) => todo.id)) + 1 : 1;
  }
}
