let foodItems = [
    { id: 'fries', name: 'Fries', price: 30.00, image: './IMAGES/fries.png'},
    { id: 'burger', name: 'Burger', price: 105.90, image: './IMAGES/burg.png'},
    { id: 'pizza', name: 'Pizza', price: 365.55, image: './IMAGES/pep.png' },
];

let quantities = {};

window.onload = function() {
    let container = document.getElementById('foodContainer');
    for (let food of foodItems) {
        quantities[food.id] = 0;
        container.innerHTML += `
            <div class="food-item">
                <img src="${food.image}" alt="${food.name}">
                <p>${food.name}</p>
                <p>Price: ${food.price.toFixed(2)}</p>
                <input type="number" id="${food.id}" name="${food.id}" min="0" required onchange="updateQuantity('${food.id}')">
            </div>
        `;
    }
}

function updateQuantity(id) {
    quantities[id] = parseInt(document.getElementById(id).value) || 0;
    calculateTotalPrice();
}

function calculateTotalPrice() {
    let totalPrice = 0;
    let totalItems = 0;
    for (let food of foodItems) {
        totalPrice += quantities[food.id] * food.price;
        totalItems += quantities[food.id];
    }
    document.getElementById('totalPrice').innerText = totalPrice.toFixed(2);
    document.getElementById('totalItems').innerText = totalItems;
}

function submitOrder() {
    let name = document.getElementById('nameInput').value;
    let address = document.getElementById('addressInput').value;
    let contact = document.getElementById('contactInput').value;
    let cash = parseFloat(document.getElementById('cashInput').value);
    let totalPrice = parseFloat(document.getElementById('totalPrice').innerText);
    let change = cash - totalPrice;

    let summary = `Name: ${name}<br>Address: ${address}<br>Contact: ${contact}<br>Total: ${totalPrice.toFixed(2)}<br>Cash: ${cash.toFixed(2)}<br>Change: ${change.toFixed(2)}`;
    document.getElementById('summaryText').innerHTML = summary;

    // Show the modal
    let modal = document.getElementById('orderSummary');
    modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
document.getElementsByClassName('close')[0].onclick = function() {
    document.getElementById('orderSummary').style.display = "none";
}

function closeModal() {
    document.getElementById('orderSummary').style.display = "none";
}