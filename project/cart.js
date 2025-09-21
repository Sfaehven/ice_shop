// Gestion du panier
class Cart {
    constructor() {
        this.items = this.loadFromStorage();
        this.whatsappNumber = "22893411323"; // À remplacer par le vrai numéro WhatsApp du client
    }

    // Charger le panier depuis localStorage
    loadFromStorage() {
        const saved = localStorage.getItem('ice_shop_cart');
        return saved ? JSON.parse(saved) : [];
    }

    // Sauvegarder le panier dans localStorage
    saveToStorage() {
        localStorage.setItem('ice_shop_cart', JSON.stringify(this.items));
        this.updateCartCount();
    }

    // Ajouter un produit au panier
    addItem(productId, selectedColorIdx = null) {
        const product = getProductById(productId);
        if (!product) return;

        // Déterminer la couleur sélectionnée
        let colorName = null;
        let colorImage = product.image;
        if (selectedColorIdx !== null && product.colors && product.colors[selectedColorIdx]) {
            colorName = product.colors[selectedColorIdx].name;
            colorImage = product.colors[selectedColorIdx].image;
        }

        // Chercher un item existant avec la même couleur
        const existingItem = this.items.find(item => item.id === productId && item.colorName === colorName);

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.items.push({
                id: productId,
                title: product.title,
                price: product.price,
                image: colorImage,
                category: product.category,
                quantity: 1,
                colorName: colorName
            });
        }

        this.saveToStorage();
        this.renderCart();
        this.showNotification(`${product.title}${colorName ? ' (' + colorName + ')' : ''} ajouté au panier`);
    }

    // Mettre à jour la quantité d'un produit
    updateQuantity(productId, newQuantity) {
        const item = this.items.find(item => item.id === productId);
        if (!item) return;

        if (newQuantity <= 0) {
            this.removeItem(productId);
            return;
        }

        item.quantity = newQuantity;
        this.saveToStorage();
        this.renderCart();
    }

    // Supprimer un produit du panier
    removeItem(productId) {
        this.items = this.items.filter(item => item.id !== productId);
        this.saveToStorage();
        this.renderCart();
    }

    // Calculer le total
    getTotal() {
        return this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    }

    // Obtenir le nombre total d'articles
    getTotalItems() {
        return this.items.reduce((total, item) => total + item.quantity, 0);
    }

    // Mettre à jour le compteur du panier
    updateCartCount() {
        const countElement = document.querySelector('.cart-count');
        if (countElement) {
            countElement.textContent = this.getTotalItems();
        }
    }

    // Afficher le panier
    renderCart() {
        const cartItemsContainer = document.getElementById('cart-items');
        const cartTotalElement = document.getElementById('cart-total');
        const emptyCartElement = document.getElementById('empty-cart');

        if (this.items.length === 0) {
            cartItemsContainer.style.display = 'none';
            document.querySelector('.cart-summary').style.display = 'none';
            emptyCartElement.style.display = 'block';
            return;
        }

        cartItemsContainer.style.display = 'block';
        document.querySelector('.cart-summary').style.display = 'block';
        emptyCartElement.style.display = 'none';

        cartItemsContainer.innerHTML = this.items.map(item => `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.title}">
                <div class="cart-item-info">
                    <h4 class="cart-item-title">${item.title}${item.colorName ? ' (' + item.colorName + ')' : ''}</h4>
                    <p class="cart-item-price">${item.price.toFixed(2)} XOF</p>
                    <div class="quantity-controls">
                        <button class="quantity-btn" onclick="cart.updateQuantity(${item.id}, ${item.quantity - 1})">-</button>
                        <span class="quantity">${item.quantity}</span>
                        <button class="quantity-btn" onclick="cart.updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
                        <button class="remove-item" onclick="cart.removeItem(${item.id})">Supprimer</button>
                    </div>
                </div>
            </div>
        `).join('');

        cartTotalElement.textContent = `${this.getTotal().toFixed(2)} XOF`;
    }

    // Générer le message WhatsApp
    generateWhatsAppMessage() {
        let message = "🛒 *Nouvelle commande Ice_shop*\n\n";
        
        this.items.forEach(item => {
            message += `• ${item.title}${item.colorName ? ' (' + item.colorName + ')' : ''}\n`;
            message += `  Quantité: ${item.quantity}\n`;
            message += `  Prix unitaire: ${item.price.toFixed(2)} XOF\n`;
            message += `  Sous-total: ${(item.price * item.quantity).toFixed(2)} XOF\n\n`;
        });

        message += `💰 *Total: ${this.getTotal().toFixed(2)} XOF*\n\n`;
        message += "Merci de me confirmer la disponibilité et les modalités de livraison.";

        return encodeURIComponent(message);
    }

    // Ouvrir WhatsApp avec le message prérempli
    orderViaWhatsApp() {
        if (this.items.length === 0) {
            this.showNotification("Votre panier est vide");
            return;
        }

        const message = this.generateWhatsAppMessage();
        const whatsappUrl = `https://wa.me/${this.whatsappNumber}?text=${message}`;
        window.open(whatsappUrl, '_blank');
    }

    // Vider le panier
    clear() {
        this.items = [];
        this.saveToStorage();
        this.renderCart();
    }

    // Afficher une notification
    showNotification(message) {
        // Créer l'élément de notification
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background-color: var(--accent-color);
            color: var(--primary-color);
            padding: 1rem 1.5rem;
            border-radius: var(--radius);
            box-shadow: var(--shadow-hover);
            z-index: 1000;
            font-weight: 500;
            transform: translateX(300px);
            transition: transform 0.3s ease;
        `;

        document.body.appendChild(notification);

        // Animer l'apparition
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);

        // Supprimer après 3 secondes
        setTimeout(() => {
            notification.style.transform = 'translateX(300px)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }
}

// Créer une instance globale du panier
const cart = new Cart();