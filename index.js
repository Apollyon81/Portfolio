const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    if (window.scrollY > 1) {
        header.classList.add('small');
    } else {
        header.classList.remove('small');
    }
});


const blinkingStars = [];
const maxStars = 198; // Limite máximo de estrelas temporárias
const starsContainer = document.querySelector('.stars');

// Função para gerar tamanhos aleatórios com base em parâmetros
function getRandomStarSize(min, max) {
    return Math.random() * (max - min) + min;
}

// Função para definir o tamanho das estrelas fixas
function setFixedStarSize(star) {
    const size = getRandomStarSize(0.1, 3.4); // Tamanho das estrelas fixas (0.1 a 0.9)
    star.style.width = `${size}px`;
    star.style.height = `${size}px`;
}

// Função para definir o tamanho das estrelas piscantes
function setBlinkingStarSize(star) {
    const size = getRandomStarSize(0.1, 0.8); // Tamanho das estrelas piscantes (1 a 2)
    star.style.width = `${size}px`;
    star.style.height = `${size}px`;
}

function createStar(isSmall, isBlinking) {
    const star = document.createElement('div');
    star.classList.add('star');
    star.classList.add('rotated');

    if (isSmall) {
        star.classList.add('small');
    }

    const x = Math.random() * 63;
    const y = Math.random() * 1300;

    star.style.left = `${x}%`;
    star.style.top = `${y}px`;

    if (isBlinking) {
        setBlinkingStarSize(star); // Define o tamanho das estrelas piscantes
        blinkingStars.push(star);
    } else {
        setFixedStarSize(star); // Define o tamanho das estrelas fixas
    }

    return star;
}

function createBlinkingStar() {
    const star = createStar(true, true);
    starsContainer.appendChild(star);

    const timeout = Math.random() * 36000 + 3000;

    setTimeout(function () {
        blinkingStars.shift();
        star.remove();
        setTimeout(createBlinkingStar, Math.random() * 6000); // Atraso aleatório entre 0 e 5 segundos para criar uma nova estrela
    }, timeout);
}

function addBlinkingStars(count) {
    for (let i = 0; i < count; i++) {
        if (blinkingStars.length < maxStars) {
            createBlinkingStar();
        }
    }
}

// Adiciona estrelas fixas (80%)
function addFixedStars(count) {
    for (let i = 0; i < count; i++) {
        const star = createStar(true, false);
        starsContainer.appendChild(star);
    }
}

addFixedStars(450); // Adiciona estrelas fixas (80%)

// Adiciona estrelas temporárias (20%) com atraso aleatório
setInterval(function () {
    const remainingStars = maxStars - blinkingStars.length;
    if (remainingStars > 0) {
        addBlinkingStars(Math.min(remainingStars, 270));
    }
}, 1000);



document.addEventListener("DOMContentLoaded", function () {
    addRandomStar();
});
