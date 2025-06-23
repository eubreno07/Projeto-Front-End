document.addEventListener('DOMContentLoaded', function() {
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    
    // Verificar preferência salva ou preferência do sistema
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Aplicar tema inicial
    if (savedTheme) {
        body.classList.toggle('light-mode', savedTheme === 'light');
    } else {
        body.classList.toggle('light-mode', !systemPrefersDark);
    }
    updateToggleIcon();
    
    // Alternar temas
    themeToggle.addEventListener('click', function() {
        body.classList.toggle('light-mode');
        const isLightMode = body.classList.contains('light-mode');
        localStorage.setItem('theme', isLightMode ? 'light' : 'dark');
        updateToggleIcon();
    });
    
    // Atualizar ícone do toggle
    function updateToggleIcon() {
        themeToggle.textContent = body.classList.contains('light-mode') ? '🌙' : '☀️';
    }
    
    // Ouvir mudanças no tema do sistema (opcional)
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
        if (!localStorage.getItem('theme')) { // Só muda se não tiver preferência salva
            body.classList.toggle('light-mode', !e.matches);
            updateToggleIcon();
        }
    });
});
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

// carrosel-filmes //

function scrollCarrossel(direcao) {
  const carrossel = document.getElementById('carrossel-filmes');
  const scrollAmount = 350;
  carrossel.scrollBy({
    left: direcao * scrollAmount,
    behavior: 'smooth'
  });
}
