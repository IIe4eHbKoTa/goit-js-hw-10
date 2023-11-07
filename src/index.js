import axios from 'axios';
import Notiflix from 'notiflix';
import SlimSelect from 'slim-select';
import { fetchBreeds, fetchCatByBreed } from './js/cat-api';

const breedSelect = document.querySelector('.breed-select');
const loader = document.querySelector('.loader');
const error = document.querySelector('.error');
const catInfo = document.querySelector('.cat-info');

error.style.display = 'none'; // Початково приховати елемент помилки
breedSelect.style.display = 'none';

fetchBreeds()
  .then(breeds => {
    loader.style.display = 'none';

    // Очищаємо існуючий селект
    breedSelect.innerHTML = '';

    // Додаємо опції на основі відповіді від сервера
    breeds.forEach(breed => {
      const option = document.createElement('option');
      option.value = breed.id;
      option.text = breed.name;
      breedSelect.appendChild(option);
    });
    breedSelect.style.display = 'flex';
    new SlimSelect({
      select: '#slim',
    });
  })
  .catch(err => {
    loader.style.display = 'none';
    error.style.display = 'none';
    Notiflix.Notify.failure(
      'Oops! Something went wrong! Try reloading the page!'
    );
    console.error(err);
  });

// ...

// Обробник події для вибору породи
breedSelect.addEventListener('change', () => {
  const selectedBreedId = breedSelect.value;
  if (selectedBreedId) {
    catInfo.style.display = 'none'; // Сховати інформацію про кота
    loader.style.display = 'block'; // Показати завантаження

    fetchCatByBreed(selectedBreedId)
      .then(catData => {
        loader.style.display = 'none';

        // Очищаємо існуючий контент в блоці cat-info
        catInfo.innerHTML = '';

        // Створюємо нові елементи img, h2 і p
        const catImage = document.createElement('img');
        catImage.src = catData[0].url;
        catImage.classList.add('image');

        const catName = document.createElement('h2');
        catName.textContent = catData[0].breeds[0].name;
        catName.classList.add('name');

        const catDescription = document.createElement('p');
        catDescription.textContent = catData[0].breeds[0].description;
        catDescription.classList.add('description');

        const catTemperament = document.createElement('p');
        catTemperament.innerHTML = `<strong>Temperament</strong>: ${catData[0].breeds[0].temperament}.`;
        catTemperament.classList.add('temperament');

        // Додаємо створені елементи до блоців cat-info
        catInfo.appendChild(catImage);
        catInfo.appendChild(catName);
        catInfo.appendChild(catDescription);
        catInfo.appendChild(catTemperament);

        catInfo.style.display = 'flex'; // Показати інформацію про кота
      })
      .catch(err => {
        error.style.display = 'none'; // Приховати елемент помилки
        Notiflix.Notify.failure(
          'Oops! Something went wrong! Try reloading the page!'
        ); // Відобразити повідомлення про помилку через Notiflix.Notify
        loader.style.display = 'none';
        console.error(err);
      });
  }
});
