function prepararLink(event, title, date) {
    // 1. Criamos os textos seguros para o link
    const eventTitle = encodeURIComponent("🐾 Assistir: " + title);
    const details = encodeURIComponent("Lembrete do seu CineList fofinho! ✨");
    
    // 2. Calculamos a data (Ex: 20241127/20241128)
    const startDate = date;
    const endDate = (parseInt(date) + 1).toString();
    
    // 3. Montamos a URL COMPLETA (concatenando com + para evitar erro de crase)
    const fullUrl = "https://calendar.google.com" + eventTitle + "&dates=" + startDate + "/" + endDate + "&details=" + details;

    // 4. Em vez de window.open, mudamos o destino do próprio link clicado
    event.currentTarget.href = fullUrl;
    event.currentTarget.target = "_blank"; // Garante que abre em nova aba
}
function marcarComoAssistido(idCard) {
    const card = document.getElementById(idCard);
    const listaAssistidos = document.getElementById('watched'); // ID da sua coluna de assistidos

    // 1. Adiciona efeito de saída
    card.classList.add('fade-out');

    // 2. Espera a animação acabar e move o card
    setTimeout(() => {
        card.classList.remove('fade-out');
        // Remove o botão de agenda e o de check, já que ela já viu
        const botoes = card.querySelector('.buttons-row');
        if (botoes) botoes.remove();
        
        // Move para a outra lista
        listaAssistidos.appendChild(card);
    }, 500);
}
const API_KEY = '865882676767606353986708e3305a41'; // Chave de exemplo (pode expirar)
const inputBusca = document.querySelector('.search-container input');
const btnBusca = document.querySelector('.search-container button');
const listaWatchlist = document.getElementById('watchlist');

// Função para buscar o filme
async function buscarFilme() {
    const nomeFilme = inputBusca.value;
    if (!nomeFilme) return alert("Digite o nome de um filme, miau! 🐾");

    const url = `https://api.themoviedb.org{API_KEY}&query=${encodeURIComponent(nomeFilme)}&language=pt-BR`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        const item = data.results[0]; // Pega o primeiro resultado

        if (item) {
            adicionarCardNaTela(item);
            inputBusca.value = ""; // Limpa a barra
        } else {
            alert("Não achei esse filme... 😿");
        }
    } catch (error) {
        console.error("Erro na busca:", error);
    }
}

// Função para criar o card fofinho dinamicamente
function adicionarCardNaTela(item) {
    const idUnico = 'card-' + Date.now();
    const titulo = item.title || item.name;
    const dataBruta = item.release_date || item.first_air_date || "2024-01-01";
    const dataFormatada = dataBruta.replace(/-/g, ""); // Formato para o Google: 20241127
    const imagem = item.poster_path 
        ? `https://image.tmdb.org{item.poster_path}` 
        : 'https://via.placeholder.com';

    const novoCard = document.createElement('div');
    novoCard.className = 'movie-card';
    novoCard.id = idUnico;

    novoCard.innerHTML = `
        <img src="${imagem}" alt="Poster">
        <div class="movie-info">
            <h4>${titulo}</h4>
            <p>Lançamento: ${dataBruta.split('-').reverse().join('/')}</p>
            <div class="buttons-row">
                <a class="btn-calendar" href="#" onclick="prepararLink(event, '${titulo}', '${dataFormatada}')">🐾 Agenda</a>
                <button class="btn-check" onclick="marcarComoAssistido('${idUnico}')">✅ Vi!</button>
            </div>
        </div>
    `;

    listaWatchlist.appendChild(novoCard);
}

// Conectar o botão de Adicionar à função
btnBusca.onclick = buscarFilme;

// Permitir apertar "Enter" no teclado para buscar
inputBusca.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') buscarFilme();
});






