// Data Produk
const products = [
    { id: 1, name: 'Kopi', price: 12000, icon: '☕' },
    { id: 2, name: 'Teh', price: 8000, icon: '🍵' },
    { id: 3, name: 'Coklat', price: 15000, icon: '🍫' },
    { id: 4, name: 'Donat', price: 10000, icon: '🍩' },
    { id: 5, name: 'Kue', price: 20000, icon: '🍰' },
    { id: 6, name: 'Roti', price: 5000, icon: '🥐' },
    { id: 7, name: 'Sandwich', price: 25000, icon: '🥪' },
    { id: 8, name: 'Minuman', price: 6000, icon: '🥤' },
];

// Keranjang
let cart = [];

// DOM Elements
const productGrid = document.getElementById('productGrid');
const cartItems = document.getElementById('cartItems');
const subtotalEl = document.getElementById('subtotal');
const taxEl = document.getElementById('tax');
const totalEl = document.getElementById('total');
const discountInput = document.getElementById('discountInput');
const checkoutBtn = document.getElementById('checkoutBtn');
const clearCartBtn = document.getElementById('clearCartBtn');
const checkoutModal = document.getElementById('checkoutModal');
const successModal = document.getElementById('successModal');
const closeModal = document.getElementById('closeModal');
const cancelBtn = document.getElementById('cancelBtn');
const confirmPaymentBtn = document.getElementById('confirmPaymentBtn');
const newTransactionBtn = document.getElementById('newTransactionBtn');
const cashAmountInput = document.getElementById('cashAmount');
const paymentMethodSelect = document.getElementById('paymentMethod');
const cashPaymentRow = document.getElementById('cashPaymentRow');
const changeRow = document.getElementById('changeRow');
const changeAmount = document.getElementById('changeAmount');
const modalTotal = document.getElementById('modalTotal');

// Initialize
function init() {
    renderProducts();
    attachEventListeners();
}

// Render Products
function renderProducts() {
    productGrid.innerHTML = products.map(product => `
        <div class="product-card" onclick="addToCart(${product.id})">
            <div class="product-icon">${product.icon}</div>
            <div class="product-name">${product.name}</div>
            <div class="product-price">Rp ${product.price.toLocaleString('id-ID')}</div>
        </div>
    `).join('');
}

// Add to Cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    
    updateCart();
}

// Remove from Cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCart();
}

// Update Cart Display
function updateCart() {
    if (cart.length === 0) {
        cartItems.innerHTML = '<p class="empty-cart">Keranjang kosong</p>';
    } else {
        cartItems.innerHTML = cart.map(item => `
            <div class="cart-item">
                <div class="cart-item-info">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-details">${item.quantity} x Rp ${item.price.toLocaleString('id-ID')}</div>
                </div>
                <div class="cart-item-price">Rp ${(item.quantity * item.price).toLocaleString('id-ID')}</div>
                <button class="cart-item-remove" onclick="removeFromCart(${item.id})">✕</button>
            </div>
        `).join('');
    }
    
    updateCartSummary();
}

// Update Cart Summary
function updateCartSummary() {
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const discount = parseInt(discountInput.value) || 0;
    const taxable = subtotal - discount;
    const tax = Math.round(taxable * 0.1);
    const total = taxable + tax;
    
    subtotalEl.textContent = `Rp ${subtotal.toLocaleString('id-ID')}`;
    taxEl.textContent = `Rp ${tax.toLocaleString('id-ID')}`;
    totalEl.textContent = `Rp ${total.toLocaleString('id-ID')}`;
    modalTotal.textContent = `Rp ${total.toLocaleString('id-ID')}`;
    
    return { subtotal, discount, tax, total };
}

// Attach Event Listeners
function attachEventListeners() {
    discountInput.addEventListener('change', updateCartSummary);
    checkoutBtn.addEventListener('click', openCheckoutModal);
    clearCartBtn.addEventListener('click', clearCart);
    closeModal.addEventListener('click', closeCheckoutModal);
    cancelBtn.addEventListener('click', closeCheckoutModal);
    confirmPaymentBtn.addEventListener('click', processPayment);
    newTransactionBtn.addEventListener('click', newTransaction);
    paymentMethodSelect.addEventListener('change', updatePaymentUI);
    cashAmountInput.addEventListener('input', calculateChange);
}

// Open Checkout Modal
function openCheckoutModal() {
    if (cart.length === 0) {
        alert('Keranjang masih kosong!');
        return;
    }
    
    checkoutModal.classList.add('active');
    paymentMethodSelect.value = 'cash';
    updatePaymentUI();
}

// Close Checkout Modal
function closeCheckoutModal() {
    checkoutModal.classList.remove('active');
    cashAmountInput.value = '';
}

// Update Payment UI
function updatePaymentUI() {
    const method = paymentMethodSelect.value;
    
    if (method === 'cash') {
        cashPaymentRow.style.display = 'flex';
        changeRow.style.display = 'none';
    } else {
        cashPaymentRow.style.display = 'none';
        changeRow.style.display = 'none';
    }
    
    cashAmountInput.value = '';
}

// Calculate Change
function calculateChange() {
    const { total } = updateCartSummary();
    const cashAmount = parseInt(cashAmountInput.value) || 0;
    
    if (cashAmount > 0) {
        changeRow.style.display = 'flex';
        const change = cashAmount - total;
        changeAmount.textContent = `Rp ${change.toLocaleString('id-ID')}`;
        
        if (change < 0) {
            changeAmount.style.color = '#ff6b6b';
            confirmPaymentBtn.disabled = true;
        } else {
            changeAmount.style.color = '#51cf66';
            confirmPaymentBtn.disabled = false;
        }
    } else {
        changeRow.style.display = 'none';
        confirmPaymentBtn.disabled = false;
    }
}

// Process Payment
function processPayment() {
    const method = paymentMethodSelect.value;
    const { total } = updateCartSummary();
    
    if (method === 'cash') {
        const cashAmount = parseInt(cashAmountInput.value) || 0;
        if (cashAmount < total) {
            alert('Jumlah uang tidak cukup!');
            return;
        }
    }
    
    // Simpan data transaksi
    const transaction = {
        id: Date.now(),
        items: cart,
        total: total,
        method: method,
        date: new Date().toLocaleString('id-ID'),
    };
    
    saveTransaction(transaction);
    
    checkoutModal.classList.remove('active');
    showSuccessModal(transaction);
}

// Show Success Modal
function showSuccessModal(transaction) {
    const message = `
        Transaksi berhasil diproses!<br>
        ID: ${transaction.id}<br>
        Total: Rp ${transaction.total.toLocaleString('id-ID')}<br>
        Tanggal: ${transaction.date}
    `;
    
    document.getElementById('successMessage').innerHTML = message;
    successModal.classList.add('active');
}

// New Transaction
function newTransaction() {
    successModal.classList.remove('active');
    clearCart();
}

// Clear Cart
function clearCart() {
    cart = [];
    cashAmountInput.value = '';
    discountInput.value = '';
    updateCart();
}

// Save Transaction to LocalStorage
function saveTransaction(transaction) {
    let transactions = JSON.parse(localStorage.getItem('transactions')) || [];
    transactions.push(transaction);
    localStorage.setItem('transactions', JSON.stringify(transactions));
}

// Initialize App
init();