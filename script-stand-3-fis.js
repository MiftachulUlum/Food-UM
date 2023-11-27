const products = [
    {
        code: 0,
        name: 'Coca cola',
        price: 7500,
        image: 'coca-cola.png'
    },
    {
        code: 1,
        name: 'Fanta',
        price: 8000,
        image: 'fanta.png'
    },
    {
        code: 2,
        name: 'Aqua',
        price: 1500,
        image: 'aqua.png'
    },
    {
        code: 3,
        name: 'Good day',
        price: 6000,
        image: 'good-day.png'
    },
    {
        code: 4,
        name: 'Floridina',
        price: 3500,
        image: 'floridina.png'
    },
    {
        code: 5,
        name: 'Pocari',
        price: 5500,
        image: 'pocari.png'
    }
];

document.addEventListener('DOMContentLoaded', () => {
    const productContainer = document.querySelector('#product-scroll');
    const paymentScreen = document.getElementById('payment-screen');
    const resultContainer = document.getElementById('result');

    let orderNumber = 0;
    let countdownTimer;

    products.forEach(product => {
        const productElement = document.createElement('div');
        productElement.classList.add('product');
        productElement.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h4>${product.name}</h4>
            <p>Harga: Rp ${product.price}</p>
            <button class="btn btn-primary buy-button" data-code="${product.code}">Order Now</button>
        `;
        productContainer.appendChild(productElement);
    });

    productContainer.addEventListener('click', e => {
        if (e.target.classList.contains('buy-button')) {
            const code = parseInt(e.target.getAttribute('data-code'));
            const selectedProduct = products.find(product => product.code === code);

            if (selectedProduct) {
                displayPaymentScreen(selectedProduct);
            }
        }
    });

    function displayPaymentScreen(product) {
        const productName = document.getElementById('selected-product-name');
        const productPrice = document.getElementById('selected-product-price');
        const productImage = document.getElementById('selected-product-image');
        const paymentInput = document.getElementById('payment-input');
        const confirmPaymentButton = document.getElementById('confirm-payment');
        const cancelPaymentButton = document.getElementById('cancel-payment');
        const countdownText = document.getElementById('countdown-text');

        productName.textContent = product.name.toUpperCase();
        productPrice.textContent = `Rp ${product.price}`;
        productImage.src = product.image;

        paymentScreen.style.display = 'block';
        productContainer.style.display = 'none';

        let remainingTime = 300;

        function updateCountdown() {
            const minutes = Math.floor(remainingTime / 60);
            const seconds = remainingTime % 60;
        
            if (remainingTime <= 0) {
                clearInterval(countdownTimer);
                countdownText.textContent = 'Mohon maaf.. Waktu pengambilan telah habis.';
                const successMessage = document.getElementById('success-message');
                successMessage.innerHTML += '<br>Waktu telah habis.';
            } else {
                countdownText.textContent = `Segera ambil pesanan sebelum: ${minutes}:${seconds}`;
                remainingTime--;
        
                // Menampilkan nomor antrian
                const queueNumber = Math.floor(Math.random() * 100) + 1; // Nomor antrian acak, bisa diganti dengan data yang sesuai
                const queueMessage = document.getElementById('queue-number');
                queueMessage.textContent = `Nomor Antrian: ${queueNumber}`;
            }
        }
        
        countdownTimer = setInterval(updateCountdown, 1000);

        confirmPaymentButton.addEventListener('click', () => {
            const insertedAmount = parseInt(paymentInput.value);

            if (insertedAmount >= product.price) {
                const change = insertedAmount - product.price;
                const successMessage = document.getElementById('success-message');
                successMessage.innerHTML = `Anda telah memesan ${product.name} 🎉 Silakan ambil barang langsung di stand 3 FIS<br>Nomor Antrian: ${++orderNumber}`;
    
                if (change > 0) {
                    successMessage.innerHTML += `<br>Kembalian Anda: Rp ${change}`;
                }
    
                resultContainer.innerHTML = '';
                const insufficientFunds = document.getElementById('insufficient-funds');
                insufficientFunds.innerHTML = '';
                paymentScreen.style.display = 'none';
                successScreen.style.display = 'block';
            } else {
                const shortage = product.price - insertedAmount;
                const insufficientFunds = document.getElementById('insufficient-funds');
                insufficientFunds.textContent = `Uang Anda kurang Rp ${shortage}. Mohon masukkan uang yang cukup`;

                const successMessage = document.getElementById('success-message');
                successMessage.textContent = '';
            }
        });

        cancelPaymentButton.addEventListener('click', () => {
            resultContainer.innerHTML = '';
            paymentScreen.style.display = 'none';
            productContainer.style.display = 'flex';

            const successMessage = document.getElementById('success-message');
            successMessage.textContent = '';

            const insufficientFunds = document.getElementById('insufficient-funds');
            insufficientFunds.textContent = '';

            clearInterval(countdownTimer);
        });
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