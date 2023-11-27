const products = [
    {
        code: 0,
        name: 'Stand 1',
        image: 'stand1-fis.jpg'
    },
    {
        code: 1,
        name: 'Stand 2',
        image: 'stand2-fis.jpg'
    },
    {
        code: 2,
        name: 'Stand 3',
        image: 'stand3-fis.jpg'
    },
    {
        code: 3,
        name: 'Stand 4',
        image: 'stand4-fis.jpg'
    },
    {
        code: 4,
        name: 'Stand 5',
        image: 'stand5-fis.jpg'
    },
    {
        code: 5,
        name: 'Stand 6',
        image: 'stand6-fis.jpg'
    }
];

document.addEventListener('DOMContentLoaded', () => {
    const productContainer = document.querySelector('#product-scroll');
    const resultContainer = document.getElementById('result');

    products.forEach(product => {
        const productElement = document.createElement('div');
        productElement.classList.add('product');
        productElement.innerHTML = `
            <h4>${product.name}</h4>
            <img src="${product.image}" alt="${product.name}" style="max-width: 100%; height: 100%;">
            <br><br>
            <button class="btn btn-primary buy-button" data-code="${product.code}">Lihat Menu</button>
        `;
        productContainer.appendChild(productElement);

        const buyButton = productElement.querySelector('.buy-button');
        buyButton.addEventListener('click', () => redirectToMenu(product.code));
    });

    function redirectToMenu(productCode) {
        const menuLinks = [
            'link_menu_1.html',
            'link_menu_2.html',
            'stand-3-fis.html',
            'link_menu_4.html',
            'link_menu_5.html',
            'link_menu_6.html'
        ];

        const link = menuLinks[productCode];
        window.location.href = link;
    }

    const welcomeText = document.getElementById('welcome');
    welcomeText.style.animation = 'neonColor 2s infinite alternate';

    function updateClock() {
        const clock = document.getElementById('clock');
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        const seconds = now.getSeconds().toString().padStart(2, '0');
        const day = now.toLocaleDateString('en-US', { weekday: 'long' });
        const date = now.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

        clock.textContent = `${hours}:${minutes}:${seconds} | ${day}, ${date}`;
    }

    setInterval(updateClock, 1000);

    const successScreen = document.getElementById('success-screen');
    const buyAgainButton = document.getElementById('buy-again');
    const exitButton = document.getElementById('exit');

    buyAgainButton.addEventListener('click', () => {
        successScreen.style.display = 'none';
        productContainer.style.display = 'flex';
    });

    exitButton.addEventListener('click', () => {
        window.close();
    });

});
