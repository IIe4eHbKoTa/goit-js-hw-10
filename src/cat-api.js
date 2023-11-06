import axios from "axios";

const apiKey = "live_m3DbR21LqZXay1ULiCE6Wjca4zHyvoRxpi6w3ERozLcoKEGMgs0xjjStA2weLASc"; 

axios.defaults.headers.common["x-api-key"] = apiKey;

const baseUrl = "https://api.thecatapi.com/v1";

// Функція для отримання колекції порід
export function fetchBreeds() {
  return axios
    .get(`${baseUrl}/breeds`)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
}

// Функція для отримання інформації про кота за ідентифікатором породи
export function fetchCatByBreed(breedId) {
  return axios
    .get(`${baseUrl}/images/search?breed_ids=${breedId}`)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
}

