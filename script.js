// Функция для генерации случайного номера отслеживания
function generateTrackingNumber() {
    let trackingNumber = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    for (let i = 0; i < 10; i++) {
        trackingNumber += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return trackingNumber;
}

// Обработчик для секции "Рассчитать стоимость"
document.querySelector('#calculate form').addEventListener('submit', function(event) {
    event.preventDefault();  // Предотвращаем перезагрузку страницы при отправке формы

    const weight = parseFloat(document.getElementById('weight').value);
    const fromCity = document.getElementById('from-city').value;
    const toCity = document.getElementById('to-city').value;

    if (isNaN(weight) || weight < 500) {
        alert('Вес должен быть не менее 500 кг');
        return;
    }

    const basePrice = 15000;  // Стоимость за 500 кг
    const pricePerKg = 30;    // Стоимость за каждый дополнительный кг
    const totalCost = basePrice + (weight - 500) * pricePerKg;

    // Генерация случайного номера отслеживания
    const trackingNumber = generateTrackingNumber();

    document.getElementById('cost-result').innerHTML = `
        <p>Стоимость перевозки: ${totalCost} тенге</p>
        <p>Номер отслеживания: ${trackingNumber}</p>
        <p>Откуда: ${fromCity}</p>
        <p>Куда: ${toCity}</p>
    `;
});

// Обработчик для секции "Отследить груз"
document.querySelector('#track form').addEventListener('submit', function(event) {
    event.preventDefault();  // Предотвращаем перезагрузку страницы при отправке формы

    const trackingNumber = document.getElementById('tracking-number').value;

    // Проверка введенного номера отслеживания
    if (!trackingNumber) {
        alert('Пожалуйста, введите номер отслеживания.');
        return;
    }

    // Для демонстрации: предполагаем, что номер отслеживания существует
    // В реальности нужно бы было делать запрос к серверу для получения статуса
    document.querySelector('#track .track-container').innerHTML = `
        <h2>Статус груза</h2>
        <p>Номер отслеживания: ${trackingNumber}</p>
        <p>Груз в пути, ожидайте прибытие через 3 дня.</p>
    `;
});

// Обработчик для секции "Оставить заявку"
document.querySelector('#request form').addEventListener('submit', function(event) {
    event.preventDefault();  // Предотвращаем перезагрузку страницы при отправке формы

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.querySelector('#request textarea').value;

    // Проверка, что все поля заполнены
    if (!name || !email || !message) {
        alert('Пожалуйста, заполните все поля формы.');
        return;
    }

    // Здесь должна быть отправка данных на сервер, но для демонстрации просто показываем сообщение
    alert(`Спасибо, ${name}! Ваша заявка успешно отправлена. Мы свяжемся с вами по email: ${email}.`);
    
    
    // Очищаем форму после отправки
    document.querySelector('#request form').reset();
});

// Обработчик для формы "Узнать стоимость" в разделе Контакты
document.querySelector('.contact-form form').addEventListener('submit', function(event) {
    event.preventDefault();  // Предотвращаем стандартное поведение формы (перезагрузку страницы)

    // Получаем значения из формы
    const name = document.querySelector('input[name="name"]').value;
    const tel = document.querySelector('input[name="tel"]').value;
    const cargoType = document.querySelector('input[name="cargo-type"]').value;
    const pickupAddress = document.querySelector('input[name="pickup-address"]').value;
    const deliveryMethod = document.querySelector('select[name="delivery-method"]').value;

    // Проверка на заполненность обязательных полей
    if (!name || !tel || !cargoType || !pickupAddress || !deliveryMethod) {
        alert('Пожалуйста, заполните все поля формы!');
        return;
    }

    // Основные тарифы для разных способов доставки
    let baseCost = 0;
    switch (deliveryMethod) {
        case 'land':
            baseCost = 3000;  // Наземный транспорт
            break;
        case 'air':
            baseCost = 10000;  // Авиа
            break;
        case 'sea':
            baseCost = 5000;  // Морской транспорт
            break;
        default:
            baseCost = 0;
            break;
    }

    // Дополнительная наценка за тип груза
    let cargoCost = 0;
    if (cargoType.toLowerCase() === 'опасный') {
        cargoCost = 2000;  // Наценка за опасный груз
    } else if (cargoType.toLowerCase() === 'хрупкий') {
        cargoCost = 1000;  // Наценка за хрупкий груз
    }

    // Рассчитываем итоговую стоимость
    const totalCost = baseCost + cargoCost;

    // Отображаем сообщение с результатом расчета стоимости
    const resultMessage = `
        <h2>Рассчитанная стоимость доставки:</h2>
        <p>Тип груза: ${cargoType}</p>
        <p>Способ доставки: ${deliveryMethod === 'land' ? 'Наземный транспорт' : deliveryMethod === 'air' ? 'Авиа' : 'Морской транспорт'}</p>
        <p>Адрес отправки: ${pickupAddress}</p>
        <p><strong>Стоимость доставки: ${totalCost} тенге</strong></p>
    `;

    // Добавляем результат на страницу в нужное место (например, в блок с результатом)
    const resultContainer = document.createElement('div');
    resultContainer.classList.add('result-message');
    resultContainer.innerHTML = resultMessage;

    // Вставляем результат после формы
    document.querySelector('.contact-form').appendChild(resultContainer);
});




