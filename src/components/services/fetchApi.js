import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';
const API_KEY = '33671711-e7c4a63df0ba9dde612e7c95b';
const PARAMS =
  'image_type=photo&orientation=horizontal&safesearch=true&per_page=12';

async function fetchApi(searchQuery, page) {
  const response = await axios.get(
    `?key=${API_KEY}&q=${searchQuery}&${PARAMS}&page=${page}`
  );
  return response.data;
}
export default fetchApi;
