const joursSemaine = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];

let aujourdHui      = new Date();
let options         = {weekday: 'long'};
let jourActuel      = aujourdHui.toLocaleDateString('fr-FR', options);

jourActuel          = jourActuel.charAt(0).toUpperCase() + jourActuel.slice(1);
//tableau en ordre
let tabJoursEnOrdre = joursSemaine.slice(joursSemaine.indexOf(jourActuel)).concat(joursSemaine.slice(0, joursSemaine.indexOf(jourActuel)));

export default tabJoursEnOrdre;