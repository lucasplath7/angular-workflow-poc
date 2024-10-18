import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Store } from '../store/store';
import { Observable } from 'rxjs';
import { Incident } from '../models/models';

const API_BASE_URL = 'http://localhost:3001/api'

@Injectable({
  providedIn: 'root'
})
export class IncidentService {

  constructor(
    private http: HttpClient,
    private store: Store
  ) { }

  fetchIncident(id: number) {
    this.http.get(`${API_BASE_URL}/incident/${id}`).subscribe((res) => {
      console.log('fetch incident by id res: ', res)
      this.store.set('incident', res)
    });
  }

  fetchIncidents() {
    this.http.get(`${API_BASE_URL}/incident`).subscribe((res) => {
      console.log('fetch incidents res: ', res)
      this.store.set('incidents', res)
    });
  }

  createIncident(payload: Incident) {
    this.http.post(`${API_BASE_URL}/incident`, payload).subscribe((res) => {
      console.log('create inc res: ', res)
      this.store.set('incidents', [...this.store.value.incidents, res]);
    });
  }

  updateIncident(payload: Incident) {
    this.http.put(`${API_BASE_URL}/incident`, payload).subscribe((res) => {
      console.log('update res: ', res)
      const filtered = this.store.value.incidents.filter(inc => inc.id !== payload.id);
      this.store.set('incidents', [...filtered, res]);
      this.store.set('incident', res);
    });
  }

  deleteIncident(incidentId: any) {
    this.http.delete(`${API_BASE_URL}/incident/${incidentId}`).subscribe((res) => {
      this.store.set('incidents', this.store.value.incidents.filter(inc => inc.id !== incidentId));
    });
  }

  fetchDiscovery(id: number) {
    this.http.get(`${API_BASE_URL}/discovery/${id}`).subscribe((res) => {
      console.log('fetch discovery: ', res)
      this.store.set('discovery', res)
    });
  }

  updateDiscovery(payload: any) {
    console.log('called update sicovery')
    this.http.put(`${API_BASE_URL}/discovery`, payload).subscribe((res) => {
      console.log('update res: ', res)
      this.store.set('discovery', res);
    });
  }

  fetchActionPlan(id: number) {
    this.http.get(`${API_BASE_URL}/actionPlan/${id}`).subscribe((res) => {
      console.log('fetch ap: ', res)
      this.store.set('actionPlan', res)
    });
  }

  updateActionPlan(payload: any) {
    console.log('called update ap')
    this.http.put(`${API_BASE_URL}/actionPlan`, payload).subscribe((res) => {
      console.log('update ap res: ', res)
      this.store.set('actionPlan', res);
    });
  }

  fetchImplementation(id: number) {
    this.http.get(`${API_BASE_URL}/implementation/${id}`).subscribe((res) => {
      console.log('fetch imp: ', res)
      this.store.set('implementation', res)
    });
  }

  updateImplementation(payload: any) {
    console.log('called update imp')
    this.http.put(`${API_BASE_URL}/implementation`, payload).subscribe((res) => {
      console.log('update imp res: ', res)
      this.store.set('implementation', res);
    });
  }

  promoteIncident(payload: any) {
    this.http.post(`${API_BASE_URL}/qaReview`, payload).subscribe((res) => {
      console.log('create inc res: ', res)
      const filtered = this.store.value.incidents.filter(inc => inc.id !== payload.incidentId);
      this.store.set('incidents', [...filtered, res]);
      this.store.set('incident', res);
    });
  }

  updateQaReview(payload: any) {
    console.log('called update qa')
    this.http.put(`${API_BASE_URL}/qaReview`, payload).subscribe((res) => {
      console.log('update qa res: ', res)
      const filtered = this.store.value.incidents.filter(inc => inc.id !== payload.incidentId);
      this.store.set('incidents', [...filtered, res]);
      this.store.set('incident', res);
    });
  }
}
