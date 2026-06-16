function mudarTela(idDaTela) {
    // Seleciona todas as telas que têm a classe 'tela-card'
    const telas = document.querySelectorAll('.tela-card');
    
    // Esconde todas as telas adicionando a classe 'hidden'
    telas.forEach(tela => {
        tela.classList.add('hidden');
    });
    
    // Mostra apenas a tela que você deseja removendo a classe 'hidden'
    const telaAtiva = document.getElementById(idDaTela);
    if (telaAtiva) {
        telaAtiva.classList.remove('hidden');
    }
}
