/*--------------------------------------------------------------------------*IMPORTATION*/
import tabJoursEnOrdre from "./utilitaires/gestionTemps.js";
const cleApi               = '';
const api                  = 'api.openweathermap.org';
const temps                = document.querySelector('.temps');
const temperature          = document.querySelector('.temperature');
const localisation         = document.querySelector('.localisation');
const heure                = document.querySelectorAll('.heure-nom-prevision');
const tempPourH            = document.querySelectorAll('.heure-prevision-valeur');
const joursDiv             = document.querySelectorAll('.jour-prevision-nom');
const tempJoursDiv         = document.querySelectorAll('.jour-prevision-temp');
const imgIcone             = document.querySelector('.logo-meteo');
const chargementContainer  = document.querySelector('.overlay-icone-chargement');
let resultatsApi;
/*-------------------------------------------------------------------------------------------------------*GEOLOCALISATION*/
if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(position => {
        let long = position.coords.longitude;
        let lat  = position.coords.latitude;
        AppelApi(long,lat);
    }, ()=> {
        alert(`Vous avez refusé la géolocation, l'application ne peut pas fonctionner, veuillez l'activer!`)
    })
}
/*--------------------------------------------------------------------------------------------------------------------*FECTH*/
function AppelApi(long,lat){
    fetch(`https://${api}/data/2.5/onecall?lat=${lat}&lon=${long}&exclude=minutely&units=metric&lang=fr&appid=${cleApi}`)
    .then(function (reponse){
        return reponse.json();
    })
    .then(function (data){
        console.log(data);
        resultatsApi=data;
        temps.innerText         = resultatsApi.current.weather[0].description;
        temperature.innerText   = `${Math.trunc(resultatsApi.current.temp)}°`
        localisation.innerText  = resultatsApi.timezone;

        //les heures par tranches de trois, avec leur température.

        let heureActuelle       = new Date().getHours();
        var i;
        for(i = 0 ; i < heure.length; i++){
            let heureIncr = heureActuelle + i * 3;

            if(heureIncr > 24){
                heure[i].innerText  = `${heureIncr - 24}h`;
            }else if(heureIncr      === 24){
                heure[i].innerText  ="00h";
            }else{
                heure[i].innerText  = `${heureIncr}h`;
            }
               
        }
        // température pour 3h
        for(let j = 0 ; j < tempPourH.length; j++){
            tempPourH[j].innerText = `${Math.trunc(resultatsApi.hourly[j * 3].temp)}°`
        }
        //trois premières lettres des jours 
        for(let k = 0; k  < tabJoursEnOrdre.length; k++){
            joursDiv[k].innerText = tabJoursEnOrdre[k].slice(0,3);
        }
        //Température par jour
        for(let m = 0; m < 7; m++){
        tempJoursDiv[m].innerText = `${Math.trunc(resultatsApi.daily[m+1].temp.day)}°`
        }
        //Icône dynamique
        if(heureActuelle >= 6 && heureActuelle < 19){
            imgIcone.src = `ressources/jour/${resultatsApi.current.weather[0].icon}.svg`
        } else{
            imgIcone.src = `ressources/nuit/${resultatsApi.current.weather[0].icon}.svg`
        }

        //chargement...
        chargementContainer.classList.add('disparition')
    })
}

