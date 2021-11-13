import './styles.css';
import fetchCountries from './fetchCountries';
import debounce from 'lodash.debounce';
import country from './templates/country.hbs'
import countryList from './templates/country-list.hbs'


import { alert, defaultModules } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import * as PNotifyMobile from '@pnotify/mobile';
import '@pnotify/mobile/dist/PNotifyMobile.css';

const refs = {
    input: document.querySelector('.js-input'),
    cardContainer: document.querySelector('.js-card-container'),
};
  
refs.input.addEventListener('input', debounce(onInput, 500));

function onInput(e) {
    e.preventDefault();
    refs.cardContainer.innerHTML = "";
    const searchQuery = e.target.value;
    
    if (searchQuery.length > 0) {
        fetchCountries(searchQuery)
            .then(dataControl)
            .catch(error => {
                defaultModules.set(PNotifyMobile, {});
                alert({
                    text: '!Information not found!',
                    addClass: 'notify',
                    maxOpen: 1,
                    maxStrategy: 'close',
                    delay: 3000,
                });
            });
    }
};

function dataControl(data) {
    if (data.length === 1) {
        refs.cardContainer.insertAdjacentHTML('beforeend', country(data));
    } else if (data.length < 11) {
        refs.cardContainer.insertAdjacentHTML('beforeend', countryList(data));
    }
    else if (data.length > 10) {
        defaultModules.set(PNotifyMobile, {});
        alert({
            text: '!Too many matches found. Please, enter a more specific query!',
            addClass: 'notify',
            maxOpen: 1,
            maxStrategy: 'close',
            delay: 3000,
        });
    }

}

