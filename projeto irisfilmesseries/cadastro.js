const form = document.getElementById('cadastroForm');
const mensagem = document.getElementById('mensagem');

form.addEventListener('submit', function(e) {
    e.preventDefault();

    // Pega valores dos inputs
    const nome = document.getElementById('nome').value.trim();
    const dataNascimento = document.getElementById('datanascimento').value;
    const genero = form.querySelector('input[name="Sexo"]:checked')?.value || '';
    const nomeMaterno = document.getElementById('nomeMaterno').value.trim();
    const cpf = document.getElementById('cpf').value.trim();
    const email = document.getElementById('email').value.trim();
    const telCelular = document.getElementById('telCelular').value.trim();
    const telFixo = document.getElementById('telFixo').value.trim();
    const endereco = document.getElementById('endereco').value.trim();
    const cep = document.getElementById('cep').value.trim();
    const login = document.getElementById('login').value.trim();
    const senha = document.getElementById('senha').value;
    const confirmaSenha = document.getElementById('confirmaSenha').value;

    // Validação básica das senhas
    if (senha !== confirmaSenha) {
        mensagem.textContent = 'As senhas não coincidem.';
        mensagem.style.color = 'red';
        return;
    }

    // Recupera array de usuários ou cria vazio
    let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

    // Verifica se login já existe
    if (usuarios.some(u => u.login === login)) {
        mensagem.textContent = 'Usuário já cadastrado!';
        mensagem.style.color = 'red';
        return;
    }

    // Cria objeto novo usuário
    const novoUsuario = {
        nome,
        dataNascimento,
        genero,
        nomeMaterno,
        cpf,
        email,
        telCelular,
        telFixo,
        endereco,
        cep,
        login,
        senha
    };

    // Adiciona e salva no localStorage
    usuarios.push(novoUsuario);
    localStorage.setItem('usuarios', JSON.stringify(usuarios));

    mensagem.textContent = 'Usuário cadastrado com sucesso!';
    mensagem.style.color = 'green';
    
    setTimeout(()=>{
        window.location.href = 'LOGIN.html'
    }, 3000)


    form.reset();
});
// Máscara para CPF: 000.000.000-00
function mascaraCPF(valor) {
    return valor
      .replace(/\D/g, '')             // Remove tudo que não é dígito
      .replace(/(\d{3})(\d)/, '$1.$2') // Coloca ponto entre 3 primeiros dígitos
      .replace(/(\d{3})(\d)/, '$1.$2') // Outro ponto após mais 3 dígitos
      .replace(/(\d{3})(\d{1,2})$/, '$1-$2'); // Hífen antes dos últimos 2 dígitos
}

// Máscara para telefone celular: (99) 99999-9999
function mascaraTelCelular(valor) {
    valor = valor.replace(/\D/g, '');
    if (valor.length > 11) valor = valor.slice(0, 11);
    valor = valor.replace(/^(\d{2})(\d)/g, '($1) $2');
    valor = valor.replace(/(\d{5})(\d)/, '$1-$2');
    return valor;
}

// Máscara para telefone fixo: (99) 9999-9999
function mascaraTelFixo(valor) {
    valor = valor.replace(/\D/g, '');
    if (valor.length > 10) valor = valor.slice(0, 10);
    valor = valor.replace(/^(\d{2})(\d)/g, '($1) $2');
    valor = valor.replace(/(\d{4})(\d)/, '$1-$2');
    return valor;
}

// Aplica máscaras ao digitar
document.getElementById('cpf').addEventListener('input', function(e) {
    e.target.value = mascaraCPF(e.target.value);
});

document.getElementById('telCelular').addEventListener('input', function(e) {
    e.target.value = mascaraTelCelular(e.target.value);
});

document.getElementById('telFixo').addEventListener('input', function(e) {
    e.target.value = mascaraTelFixo(e.target.value);
});

// aplica o endereço automatico ao digitar o cep
document.getElementById('cep').addEventListener('blur', function() {
    const cep = this.value.replace(/\D/g, ''); // Remove caracteres não numéricos
    if (cep.length === 8) {
      fetch(`https://viacep.com.br/ws/${cep}/json/`)
        .then(response => response.json())
        .then(data => {
          if (!data.erro) {
            document.getElementById('endereco').value = `${data.logradouro}, ${data.bairro}, ${data.localidade} - ${data.uf}`;
          } else {
            alert('CEP não encontrado.');
            document.getElementById('endereco').value = '';
          }
        })
        .catch(() => {
          alert('Erro ao buscar o CEP.');
        });
    } else {
      alert('Por favor, insira um CEP válido de 8 dígitos.');
    }
});