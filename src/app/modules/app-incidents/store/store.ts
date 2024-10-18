import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { State } from './state';
import { Injectable } from '@angular/core';


const state: State = {
  incidents: [],
  incident: undefined,
};


@Injectable({
  providedIn: 'root',
})
export class Store {

  private subject = new BehaviorSubject<State>(state);
  private store = this.subject.asObservable();

  get value() {
    return this.subject.value;
  }

  select(name: string): Observable<any> {
    return this.store.pipe(
      map((x: any) => x[name])
    );
  }

  set(name: string, state: any) {
    this.subject.next({
      ...this.value, [name]: state
    });
  }
}