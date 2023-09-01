const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    if (window.scrollY > 1) {
        header.classList.add('small');
    } else {
        header.classList.remove('small');
    }
});


const blinkingStars = [];

function createStar(isBlinking, isSmall) {
    const star = document.createElement('div');
    star.classList.add('star');
    star.classList.add('rotated');

    if (isBlinking) {
        star.classList.add('blinking');
        blinkingStars.push(star);
    }

    if (isSmall) {
        star.classList.add('small');
    }

    const x = Math.random() * 63; // Ajuste para criar estrelas apenas no gradiente preto
    const y = Math.random() * 1800;

    star.style.left = `${x}%`;
    star.style.top = `${y}px`;

    const size = isSmall ? Math.random() * 1 + 0.5 : Math.random() * 2 + 1;
    star.style.width = `${size}px`;
    star.style.height = `${size}px`;
   


    return star;
}

function toggleBlinkingStars() {
    for (const star of blinkingStars) {
        star.style.display = star.style.display === 'none' ? 'block' : 'none';
    }
}

function addStars(count, isBlinking, isSmall) {
    const starsContainer = document.querySelector('.stars');

    for (let i = 0; i < count; i++) {
        const star = createStar(isBlinking, isSmall);
        starsContainer.appendChild(star);
    }
}

addStars(360); // Adiciona estrelas fixas (80%)

// Adiciona estrelas que piscam e são pequenas (20%) a cada 1 segundo
setInterval(function() {
    addStars(1, Math.random() < 0.2, true); // 20% chance of blinking and being small
    setTimeout(function() {
        blinkingStars.shift().remove();
    }, 100); // Remove a estrela após 1 segundo
}, 1000);

// Função para alternar a visibilidade das estrelas piscantes a cada 0.5 segundos
setInterval(toggleBlinkingStars, 500);
