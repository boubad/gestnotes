import { IBaseDoc } from './IBaseDoc';
export enum InfoEventType {
    Absence = 0,
    Retard = 1,
    Comportement = 2,
    Cours = 3,
    TD = 4,
    TP = 5,
    Examen = 6,
    Projet = 7,
    Autre = 8,
    Inconnu = 9
} // enum InfoEventType

export interface IEvenement extends IBaseDoc  {
    evt_type?: InfoEventType;
    evt_name?: string;
    etudiantid?: string;
} // interface IEvevement
