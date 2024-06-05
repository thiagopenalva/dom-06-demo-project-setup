const addMovieModal = document.getElementById('add-modal');
const StartAddMovieButton = document.querySelector('header button');
const backdrop = document.getElementById('backdrop');
const cancelAddMovielButton = addMovieModal.querySelector('.btn--passive');
const confirmAddMovieButton = cancelAddMovielButton.nextElementSibling;
const userInputs = addMovieModal.querySelectorAll('input');
const entryText = document.getElementById('entry-text');
const movieList = document.getElementById('movie-list');
const DeleteMovieModal = document.getElementById('delete-modal');
const cancelDeleteMovieButton = DeleteMovieModal.querySelector('button');
let confirmDeleteMovieButton = cancelDeleteMovieButton.nextElementSibling;

const movies = [];

const toggleBackdrop = () => {
  backdrop.classList.toggle('visible');
};

const updateUi = () => {
  if (movies.length === 0) {
    entryText.style.display = 'block';
  } else {
    entryText.style.display = 'none';
  }
};

const cancelDeleteMovieModal = () => {
  DeleteMovieModal.classList.remove('visible');
  toggleBackdrop();
};

const deleteMovieHandler = (movieId) => {
  let movieIndex = 0;
  for (const movie of movies) {
    if (movie.id === movieId) {
      break;
    }
    movieIndex++;
  }
  movies.splice(movieIndex, 1);
  movieList.children[movieIndex].remove();
  updateUi();
  cancelDeleteMovieModal();
};

const startDeleteMovieHandler = (movieId) => {
  DeleteMovieModal.classList.add('visible');
  toggleBackdrop();

  confirmDeleteMovieButton.replaceWith(
    confirmDeleteMovieButton.cloneNode(true)
  );

  confirmDeleteMovieButton = cancelDeleteMovieButton.nextElementSibling;

  cancelDeleteMovieButton.removeEventListener('click', cancelDeleteMovieModal);
  cancelDeleteMovieButton.addEventListener('click', cancelDeleteMovieModal);
  confirmDeleteMovieButton.addEventListener(
    'click',
    deleteMovieHandler.bind(null, movieId)
  );
};

const renderNewMovieElement = (id, title, imageUrl, rating) => {
  const newMovieElement = document.createElement('li');
  newMovieElement.className = 'movie-element';
  newMovieElement.innerHTML = `
  <div class="movie-element__image">
    <img src="${imageUrl}" alt="${title}">
  </div>
  <div class="movie-element__info">
    <h2>${title}</h2>
    <p>${rating}/ 5 stars</p>
  </div>`;
  newMovieElement.addEventListener(
    'click',
    startDeleteMovieHandler.bind(null, id)
  );

  movieList.append(newMovieElement);
};

const clearUserInputs = () => {
  for (const userInput of userInputs) {
    userInput.value = '';
  }
};

const closeMovieModal = () => {
  addMovieModal.classList.remove('visible');
  clearUserInputs();
  toggleBackdrop();
};

const showMovieModal = () => {
  addMovieModal.classList.add('visible');
  toggleBackdrop();
};

const cancelAddMovieHandler = () => {
  closeMovieModal();
  clearUserInputs();
};

const backdropClickHandler = () => {
  closeMovieModal();
  cancelDeleteMovieModal();
  toggleBackdrop();
};

const addMovieHandler = () => {
  const titleValue = userInputs[0].value;
  const imageUrlValue = userInputs[1].value;
  const ratingValue = userInputs[2].value;

  if (
    titleValue.trim() === '' ||
    imageUrlValue.trim() === '' ||
    ratingValue.trim() === '' ||
    +ratingValue < 1 ||
    +ratingValue > 5
  ) {
    alert('please enter a valid values');
    return;
  }

  const newMovies = {
    id: Math.random().toString(),
    title: titleValue,
    image: imageUrlValue,
    rating: ratingValue,
  };

  movies.push(newMovies);
  clearUserInputs();
  closeMovieModal();
  updateUi();
  renderNewMovieElement(
    newMovies.id,
    newMovies.title,
    newMovies.image,
    newMovies.rating
  );
};

StartAddMovieButton.addEventListener('click', showMovieModal);
backdrop.addEventListener('click', backdropClickHandler);
cancelAddMovielButton.addEventListener('click', cancelAddMovieHandler);
confirmAddMovieButton.addEventListener('click', addMovieHandler);
