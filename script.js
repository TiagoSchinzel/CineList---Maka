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






