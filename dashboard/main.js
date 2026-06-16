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
    event.preventDefault(); // Impede a página de recarregar

   
    const nome = document.querySelector('input[placeholder="Nome de Usuário"]').value;
    const email = document.querySelector('input[placeholder="Email"]').value;
    const senha = document.querySelector('input[placeholder="Senha"]').value;

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
            event.target.reset();
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

    const email = document.querySelector('input[placeholder="Exemplo@gmail.com"]').value;
    const senha = document.querySelector('input[placeholder="Senha"]').value;

    try {
        const resposta = await fetch(`${API_URL}/api/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, senha })
        });

        const resultado = await resposta.json();

        if (resposta.ok) {
            alert(`Bem-vindo, ${resultado.usuario}! Login aprovado.`);
            document.getElementById('tela-login').classList.add('hidden');
            document.getElementById('tela-cadastro').classList.add('hidden');
            document.getElementById('tela-loja').classList.remove('hidden');
            
        } else {
            alert("Erro no login: " + resultado.erro);
        }
    } catch (erro) {
        console.error("Erro ao conectar com o servidor Python:", erro);
        alert("Não foi possível conectar ao servidor backend.");
    }
}

// ==========================================
// ATIVAR OS FORMULÁRIOS
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
    const formCadastro = document.querySelector('#tela-cadastro form');
    const formLogin = document.querySelector('#tela-login form');

    if (formCadastro) formCadastro.addEventListener('submit', realizarCadastro);
    if (formLogin) formLogin.addEventListener('submit', realizarLogin);
});

body: JSON.stringify({ 
    nome: nome,   
    email: email, 
    senha: senha  
})

// DENTRO DA FUNÇÃO DE LOGIN:
body: JSON.stringify({ 
    email: email, 
    senha: senha  
})