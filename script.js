// --- Lógica do Modo Contraste (existente) ---
const toggleContrastButton = document.getElementById('toggle-contrast');
const moonIcon = document.getElementById('moon-icon');
const sunIcon = document.getElementById('sun-icon');

function applyTheme(theme) {
    if (theme === 'dark') {
        document.body.classList.add('dark-mode');
        moonIcon.classList.remove('active');
        sunIcon.classList.add('active');
        toggleContrastButton.setAttribute('aria-label', 'Alternar para Modo Claro');
    } else {
        document.body.classList.remove('dark-mode');
        moonIcon.classList.add('active');
        sunIcon.classList.remove('active');
        toggleContrastButton.setAttribute('aria-label', 'Alternar para Modo Escuro');
    }
}

const prefersDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
const currentMode = localStorage.getItem('theme');

if (currentMode === 'dark') {
    applyTheme('dark');
} else if (currentMode === 'light') {
    applyTheme('light');
} else if (prefersDarkMode) {
    applyTheme('dark');
} else {
    applyTheme('light');
}

toggleContrastButton.addEventListener('click', () => {
    if (document.body.classList.contains('dark-mode')) {
        applyTheme('light');
        localStorage.setItem('theme', 'light');
    } else {
        applyTheme('dark');
        localStorage.setItem('theme', 'dark');
    }
});

// --- NOVA Lógica do Modal de Imagem ---
const imageModal = document.getElementById('image-modal');
const expandedImage = document.getElementById('expanded-image');
const modalCaption = document.getElementById('caption');
const closeButton = document.querySelector('.close-button');
const contentImages = document.querySelectorAll('.content-image'); // Seleciona todas as imagens de conteúdo

// Adiciona um evento de clique para cada imagem de conteúdo
contentImages.forEach(image => {
    image.addEventListener('click', () => {
        imageModal.classList.add('active'); // Mostra o modal
        expandedImage.src = image.src; // Define a fonte da imagem expandida
        expandedImage.alt = image.alt; // Define o texto alt para acessibilidade
        modalCaption.textContent = image.alt; // Usa o texto alt como legenda
        document.body.style.overflow = 'hidden'; // Evita rolagem da página principal
    });
});

// Fecha o modal ao clicar no botão de fechar
closeButton.addEventListener('click', () => {
    imageModal.classList.remove('active'); // Esconde o modal
    document.body.style.overflow = 'auto'; // Restaura a rolagem da página
});

// Fecha o modal ao clicar fora da imagem (no overlay do modal)
imageModal.addEventListener('click', (event) => {
    // Se o clique foi no próprio modal e não na imagem expandida ou legenda
    if (event.target === imageModal) {
        imageModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

// Fecha o modal ao pressionar a tecla ESC
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && imageModal.classList.contains('active')) {
        imageModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});
