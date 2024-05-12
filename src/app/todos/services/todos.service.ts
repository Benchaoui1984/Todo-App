import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Todo } from '../../models/todo.interface';

@Injectable({ providedIn: 'root' })
export class TodoService {
  constructor(private http: HttpClient) {}

  public getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(environment.host + '/todos');
  }
  public getSelectedTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(environment.host + '/todos?selected=true');
  }
  public getAvailableTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(environment.host + '/todos?available=true');
  }

  public searchTodos(name: string): Observable<Todo[]> {
    return this.http.get<Todo[]>(environment.host + '/todos?name_like=' + name);
  }
  public setSelected(todo: Todo): Observable<Todo> {
    return this.http.put<Todo>(environment.host + '/todos/' + todo.id, {
      ...todo /* selected: !todo.selected */,
    });
  }

  public delete(id: number): Observable<any> {
    return this.http.delete<void>(environment.host + '/todos/' + id);
  }
  public save(todo: Todo): Observable<Todo> {
    return this.http.post<Todo>(environment.host + '/todos/', todo);
  }
  public update(todo: Todo): Observable<Todo> {
    return this.http.put<Todo>(environment.host + '/todos/' + todo.id, todo);
  }
  public getTodo(id: number): Observable<Todo> {
    return this.http
      .get<Todo>(environment.host + '/todos/' + id)
      .pipe(tap((r) => {}));
  }
}
