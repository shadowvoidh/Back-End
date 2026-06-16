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



const API_URL = "https://upgraded-computing-machine-r7p59x497r5cwqvw-5000.app.github.dev";

// ==========================================
// LÓGICA DE CADASTRO
// ==========================================
async function realizarCadastro(event) {
    event.preventDefault(); 

    // Agora busca especificamente dentro da seção de cadastro
    const nome = document.querySelector('#tela-cadastro input[placeholder="Nome de Usuário"]').value;
    const email = document.querySelector('#tela-cadastro input[placeholder="Email"]').value;
    const senha = document.querySelector('#tela-cadastro input[placeholder="Senha"]').value;

    if (!nome || !email || !senha) {
        alert("Por favor, preencha todos os campos.");
        return;
    }

    try {
        const resposta = await fetch(`${API_URL}/api/cadastro`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nome, email, senha })
        });

        const resultado = await resposta.json();

        if (resposta.ok) {
            alert("Conta criada com sucesso! Mude para a tela de Login.");
            mudarTela('tela-login');
        } else {
            alert("Erro no cadastro: " + resultado.erro);
        }
    } catch (erro) {
        console.error("Erro ao conectar com o servidor Python:", erro);
        alert("Não foi possível conectar ao servidor backend.");
    }
}

// ==========================================
// LÓGICA DE LOGIN
// ==========================================
async function realizarLogin(event) {
    event.preventDefault();

    // Agora busca especificamente dentro da seção de login
    const email = document.querySelector('#tela-login input[placeholder="Exemplo@gmail.com"]').value;
    const senha = document.querySelector('#tela-login input[placeholder="Senha"]').value;

    try {
        const resposta = await fetch(`${API_URL}/api/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, senha })
        });

        const resultado = await resposta.json();

        if (resposta.ok) {
            alert(`Bem-vindo, ${resultado.usuario}! Login aprovado.`);
            mudarTela('tela-loja'); 
        } else {
            alert("Erro no login: " + resultado.erro);
        }
    } catch (erro) {
        console.error("Erro ao conectar com o servidor Python:", erro);
        alert("Não foi possível conectar ao servidor backend.");
    }
}