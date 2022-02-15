const API_KEY = '24468331-2772ee4e74396411a92d27e8c';
const PER_PAGE = 12;

function imageRequest(query, page){
    return fetch(`https://pixabay.com/api/?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=${PER_PAGE}`)

        .then(response => {
            if(response.ok) {
                return response.json();
            }
            return Promise.reject(
                new Error('Упс что-то пошло не так'))
        })
}

export default imageRequest;