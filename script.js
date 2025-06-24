// Função para gerar um hash SHA-256 da senha
async function gerarHash(senha) {
    const encoder = new TextEncoder();
    const data = encoder.encode(senha);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');
}

// Função para registrar um novo usuário
async function registrarUsuario(username, password) {
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    const usuarioExistente = usuarios.find(user => user.username === username);

    if (usuarioExistente) {
        alert('Usuário já existe!');
        return false;
    }

    // Gera o hash da senha
    const hashedPassword = await gerarHash(password);

    // Adiciona o novo usuário com a senha criptografada
    usuarios.push({ username, password: hashedPassword });
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
    alert('Usuário registrado com sucesso!');
    return true;
}

// Função para verificar login
async function verificarUsuario(username, password) {
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    const hashedPassword = await gerarHash(password);

    const usuarioValido = usuarios.find(user => user.username === username && user.password === hashedPassword);

    if (usuarioValido) {
        alert('Login bem-sucedido!');
        return true;
    } else {
        alert('Usuário ou senha incorretos!');
        return false;
    }
}

// Conexão com o formulário HTML
document.querySelector('form').addEventListener('submit', async function (event) {
    event.preventDefault(); // Impede o envio do formulário

    const username = document.getElementById('usuario').value;
    const password = document.getElementById('senha').value;

    // Verifica se é um login ou registro
    const isLogin = event.submitter && event.submitter.innerText === 'Entrar';
    if (isLogin) {
        await verificarUsuario(username, password);
    } else {
        await registrarUsuario(username, password);
    }
});