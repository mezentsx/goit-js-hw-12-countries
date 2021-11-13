const URL = 'https://restcountries.com/v2';

export default function fetchCountries(searchQuery) {
    return fetch(`${URL}/name/${searchQuery}`).then(r => {
                if (!r.ok) {
                    throw Error(r.status);
                }
                return r.json();
            });
};