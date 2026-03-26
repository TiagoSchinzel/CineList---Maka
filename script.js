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
const API_KEY = '738c1218fbddc9a52409e0081c55a76f'; 
const inputBusca = document.querySelector('.search-container input');
const btnBusca = document.querySelector('.btn-add'); // Ajustado para a classe correta
const listaWatchlist = document.getElementById('watchlist');

// Substitua a sua função buscarFilme por esta:
async function buscarFilme() {
    const nomeFilme = inputBusca.value.trim();
    if (!nomeFilme) return alert("Digite o nome de um filme! 🐾");

    // IMPORTANTE: Usei HTTPS e conferi o link da API v3 do TMDB
   // O segredo está no '?' depois de 'multi'
const url = "https://api.themoviedb.org" + API_KEY + "&query=" + encodeURIComponent(nomeFilme) + "&language=pt-BR";



    try {
        console.log("Tentando conectar em:", url); // Veja se o link aparece certo no F12
        const response = await fetch(url);
        
        if (!response.ok) {
            // Se a chave estiver errada, o erro vai aparecer aqui
            throw new Error(`Erro na API: ${response.status}`);
        }

        const data = await response.json();
        console.log("Sucesso!", data);

        if (data.results && data.results.length > 0) {
            const resultadoValido = data.results.find(item => item.media_type !== 'person');
            if (resultadoValido) {
                adicionarCardNaTela(resultadoValido);
                inputBusca.value = ""; 
            }
        } else {
            alert("Nenhum filme encontrado com esse nome! 😿");
        }
    } catch (error) {
        console.error("Erro detalhado:", error);
        alert("Erro ao conectar! Dica: Abra o console (F12) para ver o erro em vermelho.");
    }
}

// Vincula o clique do botão à função
if (btnBusca) {
    btnBusca.addEventListener('click', buscarFilme);
}







