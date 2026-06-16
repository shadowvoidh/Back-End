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

    // Captura os valores dos campos usando a nova busca específica
    const nome_valor = document.querySelector('#tela-cadastro input[placeholder="Nome de Usuário"]').value;
    const email_valor = document.querySelector('#tela-cadastro input[placeholder="Email"]').value;
    const senha_valor = document.querySelector('#tela-cadastro input[placeholder="Senha"]').value;

    if (!nome_valor || !email_valor || !senha_valor) {
        alert("Por favor, preencha todos os campos.");
        return;
    }

    try {
        const resposta = await fetch(`${API_URL}/api/cadastro`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                nome: nome_valor,   // Envia exatamente como o Python espera
                email: email_valor, 
                senha: senha_valor 
            })
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

    // Captura os valores específicos da tela de login
    const email_valor = document.querySelector('#tela-login input[placeholder="Exemplo@gmail.com"]').value;
    const senha_valor = document.querySelector('#tela-login input[placeholder="Senha"]').value;

    try {
        const resposta = await fetch(`${API_URL}/api/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                email: email_valor, // Envia exatamente como o Python espera
                senha: senha_valor 
            })
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