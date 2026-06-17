
// ==========================================
// FUNÇÃO PARA MUDAR DE TELA
// ==========================================
function mudarTela(idDaTela) {
    const telas = document.querySelectorAll('.tela-card');
    telas.forEach(tela => {
        tela.classList.add('hidden');
    });
    const telaAtiva = document.getElementById(idDaTela);
    if (telaAtiva) {
        telaAtiva.classList.remove('hidden');
    }
}

// ==========================================
// LÓGICA DE CADASTRO LOCAL (Sem Servidor)
// ==========================================
function realizarCadastro(event) {
    event.preventDefault(); 

    // Captura os valores dos campos do cadastro
    const nome = document.querySelector('#tela-cadastro input[placeholder="Nome de Usuário"]').value;
    const email = document.querySelector('#tela-cadastro input[placeholder="Email"]').value;
    const senha = document.querySelector('#tela-cadastro input[placeholder="Senha"]').value;

    if (!nome || !email || !senha) {
        alert("Por favor, preencha todos os campos.");
        return;
    }

    const usuario = { nome, email, senha };

    localStorage.setItem(email, JSON.stringify(usuario));

    alert("Conta criada com sucesso localmente! Redirecionando para o Login.");
    mudarTela('tela-login');
}

// ==========================================
// LÓGICA DE LOGIN LOCAL (Sem Servidor)
// ==========================================
function realizarLogin(event) {
    event.preventDefault();

    // Captura os valores dos campos do login
    const email = document.querySelector('#tela-login input[placeholder="Exemplo@gmail.com"]').value;
    const senha = document.querySelector('#tela-login input[placeholder="Senha"]').value;

    const dadosSalvos = localStorage.getItem(email);

    if (!dadosSalvos) {
        alert("Erro no login: Conta não encontrada!");
        return;
    }

    const usuarioCadastrado = JSON.parse(dadosSalvos);

    if (usuarioCadastrado.senha === senha) {
        alert(`Bem-vindo, ${usuarioCadastrado.nome}! Login aprovado com sucesso.`);
        mudarTela('tela-loja'); 
    } else {
        alert("Erro no login: Senha incorreta!");
    }
}