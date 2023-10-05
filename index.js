const header = document.querySelector('nav');

window.addEventListener('scroll', () => {
    if (window.scrollY > 1) {
        header.classList.add('small');
    } else {
        header.classList.remove('small');
    }
});


function menuShow() {
    let menuMobile = document.querySelector('.mobile-menu');
    if (menuMobile.classList.contains('open')) {
        menuMobile.classList.remove('open');
        document.querySelector('.icon').src = "assets/img/menu_white_36dp.svg";
    } else {
        menuMobile.classList.add('open');
        document.querySelector('.icon').src = "assets/img/close_white_36dp.svg";
    }
}



const blinkingStars = [];
const maxStars =207; // Limite máximo de estrelas temporárias
const starsContainer = document.querySelector('.stars');

// Função para gerar tamanhos aleatórios com base em parâmetros
function getRandomStarSize(min, max) {
    return Math.random() * (max - min) + min;
}

// Função para definir o tamanho das estrelas fixas
function setFixedStarSize(star) {
    const size = getRandomStarSize(0.1, 3.6); // Tamanho das estrelas fixas
    star.style.width = `${size}px`;
    star.style.height = `${size}px`;
}

// Função para definir o tamanho das estrelas piscantes
function setBlinkingStarSize(star) {
    const size = getRandomStarSize(0.1, 1.1); // Tamanho das estrelas piscantes
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

    const x = Math.random() * 95;
    const y = Math.random() * 1500;

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

    const timeout = Math.random() * 46000 + 3000;

    setTimeout(function () {
        const index = blinkingStars.indexOf(star);
        if (index !== -1) {
            blinkingStars.splice(index, 0.1); // Remove a estrela da matriz
            star.remove();
        }

        setTimeout(createBlinkingStar, Math.random() * 9000);
    }, timeout);
}


function addBlinkingStars(count) {
    const remainingStars = maxStars - blinkingStars.length;
    const starsToAdd = Math.min(count, remainingStars); // Limita a quantidade de estrelas a serem adicionadas

    for (let i = 0; i < starsToAdd; i++) {
        if (blinkingStars.length < maxStars) {
            createBlinkingStar();
        }
    }

    // Remova o excesso de estrelas se necessário
    while (blinkingStars.length > maxStars) {
        const starToRemove = blinkingStars.pop();
        starToRemove.remove();
    }
}

// Adiciona estrelas fixas (80%)
function addFixedStars(count) {
    for (let i = 0; i < count; i++) {
        const star = createStar(true, false);
        starsContainer.appendChild(star);
    }
}

// Inicialmente adiciona estrelas fixas e começa a adicionar estrelas piscantes
addFixedStars(480); // Adiciona estrelas fixas (80%)
setInterval(function () {
    const remainingStars = maxStars - blinkingStars.length;
    if (remainingStars > 0) {
        addBlinkingStars(Math.min(remainingStars, 130));
    }
}, 100);



document.addEventListener("DOMContentLoaded", function () {
    const button = document.getElementById("ver-mais");

    // Função para alternar o texto do botão
    function alternarTextoBotao() {
        if (button.textContent === "Ver mais") {
            button.textContent = "Ver menos";
        } else {
            button.textContent = "Ver mais";
        }
    }

    // Adicionar um evento de clique ao botão "Ver mais"
    button.addEventListener("click", function () {
        const elementosVisiveis = document.querySelectorAll(".pro.visivel");

        // Verificar se algum dos elementos visíveis está oculto
        let algumOculto = false;
        elementosVisiveis.forEach(function (element) {
            if (element.classList.contains("oculta")) {
                algumOculto = true;
            }
        });

        // Alternar a classe .oculta com base no estado
        elementosVisiveis.forEach(function (element) {
            if (algumOculto) {
                element.classList.remove("oculta");
            } else {
                element.classList.add("oculta");
            }
        });

        // Alternar o texto do botão
        alternarTextoBotao();
    });
});



document.addEventListener("DOMContentLoaded", function () {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener("click", function (event) {
            event.preventDefault();

            const targetId = this.getAttribute("href").substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop,
                    behavior: "smooth"
                });
            }
        });
    });
});


