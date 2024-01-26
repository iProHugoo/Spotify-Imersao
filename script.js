console.log('Javascript operando em normalidade');
// O console.log pode entrar dentro de qualquer função para realizar principalmente debug dentro de funções do código

const searchInput = document.getElementById('search-input'); // Constante para pegar o input na busca superior
const resultArtist = document.getElementById('result-artist'); // Constante para exibit o artista de uma busca
const resultPlaylist = document.getElementById('result-playlists'); // Constante para exibir os cards de playlists

// Função para chamar a API local rodando pelo NPM
function requestApi(searchTerm) {
    const url = `http://localhost:3000/artists?name_like=${searchTerm}`
    fetch(url)
        .then((response) => response.json())
        .then((result) => displayResults(result))
}

// Função que faz exibir os resultados da busca
function displayResults(result) {
    resultPlaylist.classList.add('hidden')
    const artistName = document.getElementById('artist-name');
    const artistImage = document.getElementById('artist-img');

    result.forEach(element => {
        artistName.innerText = element.name;
        artistImage.src = element.urlImg;
    });

    resultArtist.classList.remove('hidden');
}

document.addEventListener('input', function () {
    const searchTerm = searchInput.value.toLowerCase();
    if (searchTerm === '') { // Faz retornar as playlists padrão caso a busca esteja vazia
        resultPlaylist.classList.remove('hidden');
        resultArtist.classList.add('hidden');
        return;
    }

    requestApi(searchTerm);
})