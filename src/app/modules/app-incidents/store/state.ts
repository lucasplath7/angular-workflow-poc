import { Incident } from "../models/models";

export interface State {
  incidents: Incident[],
  incident?: Incident,
}