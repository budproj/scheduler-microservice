import { Agenda } from 'agenda';

export let _agendaSingleton: Agenda;

export const setSingleton = (instance: Agenda) => {
  _agendaSingleton = instance;
};

export const getSingleton = () => _agendaSingleton;
