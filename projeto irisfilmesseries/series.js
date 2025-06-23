// modal //

function abrirModal(modalId) {
  const modal = document.getElementById(modalId);
  modal.classList.add('abrir');

  const fecharBtn = modal.querySelector('.fechar');
  fecharBtn.addEventListener('click', () => {
    modal.classList.remove('abrir');
  });

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('abrir');
    }
  });
}

// busca //

const searchInput = document.getElementById('search');

searchInput.addEventListener('input', (event) => {
    const value = event.target.value.toLowerCase().trim();

    const items = document.querySelectorAll('.filme');
    const recomendadosTitulo = document.querySelector('.recomendados_titulo');
    const popularesTitulo = document.querySelector('.populares_titulo');
    const emAltaSection = document.querySelector('.EmAlta');
    const emAltaFilmes = document.querySelector('.container');
    const recomendadosContainer = document.querySelector('.recomendados-container');
    const popularesContainer = document.querySelector('.populares-container');
    const noResults = document.getElementById('no_results');

    let hasResults = false;
    let emAltaHasMatch = false;
    let recomendadosHasMatch = false;
    let popularesHasMatch = false;

    if (value !== '') {
        items.forEach(item => {
            const itemText = item.textContent.toLowerCase();
            const match = itemText.includes(value);

            if (match) {
                hasResults = true;
                item.style.display = '';
                item.style.transition = 'transform 0.3s, width 0.3s, height 0.3s';

                if (emAltaFilmes.contains(item)) {
                    item.style.width = '500px';
                    item.style.height = '450px';
                } else {
                    item.style.width = '350px';
                    item.style.height = '400px';
                }
                item.style.margin = '-5px';

                if (emAltaFilmes.contains(item)) emAltaHasMatch = true;
                if (recomendadosContainer.contains(item)) recomendadosHasMatch = true;
                if (popularesContainer.contains(item)) popularesHasMatch = true;
            } else {
                item.style.display = 'none';
            }
        });

        recomendadosTitulo.style.display = recomendadosHasMatch ? '' : 'none';
        recomendadosContainer.style.display = recomendadosHasMatch ? '' : 'none';

        popularesTitulo.style.display = popularesHasMatch ? '' : 'none';
        popularesContainer.style.display = popularesHasMatch ? '' : 'none';

        emAltaSection.style.display = emAltaHasMatch ? '' : 'none';
        emAltaFilmes.style.display = emAltaHasMatch ? '' : 'none';

    } else {
        items.forEach(item => {
            item.style.display = '';
            item.style.width = '';
            item.style.height = '';
            item.style.margin = '';
            item.style.transition = '';
        });

        recomendadosTitulo.style.display = '';
        recomendadosContainer.style.display = '';
        popularesTitulo.style.display = '';
        popularesContainer.style.display = '';
        emAltaSection.style.display = '';
        emAltaFilmes.style.display = '';

        if (noResults) {
            noResults.style.display = 'none';
        }
    }

    if (noResults) {
        noResults.style.display = hasResults || value === '' ? 'none' : 'block';
    }

});
const nome = localStorage.getItem('login');
const nomeUsuarioSpan = document.getElementById('usuarios');

if (nome && nomeUsuarioSpan) {
  nomeUsuarioSpan.textContent = nome;
} else if (nomeUsuarioSpan) {
  nomeUsuarioSpan.textContent = 'Você não está logado';
}

// Redireciona para a tela de login e faz logout

document.getElementById('logout').addEventListener('click', () => {
  window.location.href = 'login.html';  
});