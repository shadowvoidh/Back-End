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



const API_URL = "https://back-end-3-ll1x.onrender.com";

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
    // Impede a página de recarregar e sumir com os dados
    event.preventDefault(); 
    
    console.log("Botão de login clicado! Iniciando captura de dados...");

    // Captura os valores buscando estritamente na seção de login
    const email_input = document.querySelector('#tela-login input[placeholder="Exemplo@gmail.com"]');
    const senha_input = document.querySelector('#tela-login input[placeholder="Senha"]');

    // Validação de segurança caso o seletor falhe no HTML
    if (!email_input || !senha_input) {
        console.error("Erro: Não foi possível encontrar os campos de texto no HTML. Verifique os placeholders.");
        alert("Erro interno nos campos da tela. Verifique o console do navegador.");
        return;
    }

    const email_valor = email_input.value.trim();
    const senha_valor = senha_input.value;

    if (!email_valor || !senha_valor) {
        alert("Por favor, preencha o e-mail e a senha.");
        return;
    }

    console.log(`Enviando requisição de login para: ${API_URL}/api/login`);

    try {
        const resposta = await fetch(`${API_URL}/api/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                email: email_valor, 
                senha: senha_valor 
            })
        });

        const resultado = await resposta.json();

        if (resposta.ok) {
            console.log("Login autorizado pelo servidor Render!");
            alert(`Bem-vindo, ${resultado.usuario}! Login aprovado.`);
            mudarTela('tela-loja'); 
        } else {
            console.warn("Servidor recusou o login:", resultado.erro);
            alert("Erro no login: " + resultado.erro);
        }
    } catch (erro) {
        console.error("Erro crítico na conexão de rede:", erro);
        alert("Não foi possível conectar ao servidor backend.");
    }
}