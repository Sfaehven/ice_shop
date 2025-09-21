// Navigation et fonctionnalités principales

let activeCategory = 'all'; // Catégorie active pour la recherche
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    setupNavigation();
    setupMobileMenu();
    setupCategoryCards();
    loadProducts();
    setupFilters();
    setupSearchBar();
    setupContactForm();
    setupWhatsAppButtons();
    cart.updateCartCount();
    cart.renderCart();
// Barre de recherche dans le catalogue

function setupSearchBar() {
    const searchInput = document.getElementById('catalog-search');
    if (!searchInput) return;

    let fuse = null;
    let productData = [];

    function getProductsForActiveCategory() {
        if (activeCategory === 'all' || activeCategory === 'tous') {
            return getDisplayProducts('all');
        } else {
            return getProductsByCategory(activeCategory);
        }
    }

    function updateFuseData() {
        // Utilise les produits de la catégorie active
        const products = getProductsForActiveCategory();
        productData = products.map(product => {
            return {
                product,
                title: product.title || '',
                category: product.category || '',
                qualite: product.qualite || '',
                price: product.price ? product.price.toString() : ''
            };
        });
        fuse = new Fuse(productData, {
            keys: ['title', 'category', 'qualite', 'price'],
            threshold: 0.2,
            minMatchCharLength: 2,
            includeScore: true
        });
    }
    // Initialiser Fuse après chargement des produits
    setTimeout(updateFuseData, 500);

    searchInput.addEventListener('input', function() {
        const query = this.value.trim().toLowerCase();
        if (!fuse) updateFuseData();
        const catalogContainer = document.getElementById('catalog-products');
        if (!query) {
            // Affiche tous les produits de la catégorie active
            const products = getProductsForActiveCategory();
            catalogContainer.innerHTML = products.map(product => createProductCard(product)).join('');
            setupColorCircles();
            return;
        }
        let results = [];
        if (query.length <= 2) {
            results = productData.filter(obj => obj.title.toLowerCase().startsWith(query));
        } else {
            const fuseResults = fuse.search(query);
            results = fuseResults.map(res => res.item);
        }
        // Affiche les résultats filtrés
        catalogContainer.innerHTML = results.map(obj => createProductCard(obj.product)).join('');
        setupColorCircles();
    });

    // Met à jour Fuse quand la catégorie change
    window.addEventListener('categoryChanged', function(e) {
        activeCategory = e.detail.category;
        updateFuseData();
        searchInput.dispatchEvent(new Event('input'));
    });
}
}

// Configuration de la navigation
function setupNavigation() {
    const navLinks = document.querySelectorAll('[data-page]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetPage = this.getAttribute('data-page');
            
            // Si c'est un bouton de catégorie, on va au catalogue et on filtre
            if (this.hasAttribute('data-category')) {
                const category = this.getAttribute('data-category');
                showPage('catalog');
                filterProductsByCategory(category);
                return;
            }
            
            showPage(targetPage);
        });
    });
}

// Afficher une page spécifique
function showPage(pageName) {
    // Masquer toutes les pages
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => {
        page.classList.remove('active');
    });
    
    // Afficher la page demandée
    const targetPage = document.getElementById(pageName);
    if (targetPage) {
        targetPage.classList.add('active');
    }
    
    // Mettre à jour la navigation active
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-page') === pageName) {
            link.classList.add('active');
        }
    });
    
    // Faire défiler vers le haut
    window.scrollTo(0, 0);
}

// Configuration du menu mobile
function setupMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navList = document.querySelector('.nav-list');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            navList.style.display = navList.style.display === 'flex' ? 'none' : 'flex';
        });
    }
}

// Configuration des cartes de catégories
function setupCategoryCards() {
    const categoryCards = document.querySelectorAll('.category-card');
    
    categoryCards.forEach(card => {
        card.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            showPage('catalog');
            setTimeout(() => {
                filterProductsByCategory(category);
            }, 100);
        });
    });
}

// Charger et afficher les produits
function loadProducts() {
    loadFeaturedProducts();
    loadCatalogProducts();
        setupColorCircles();
}

// Charger les produits en vedette
function loadFeaturedProducts() {
    const featuredContainer = document.getElementById('featured-products');
    // Utilise la fonction fusionnée UNIQUEMENT pour nouveautés
    const featuredProducts = getDisplayProducts('featured');
    featuredContainer.innerHTML = featuredProducts.map(product => createProductCard(product)).join('');
}

// Charger tous les produits dans le catalogue
function loadCatalogProducts() {
    const catalogContainer = document.getElementById('catalog-products');
    // Utilise la fonction fusionnée UNIQUEMENT pour "tous"
    const displayProducts = getDisplayProducts('all');
    catalogContainer.innerHTML = displayProducts.map(product => createProductCard(product)).join('');
}

// Créer une carte de produit
function createProductCard(product) {
    const categories = getCategories();
    const categoryName = categories[product.category] || product.category;
    // Générer les boutons couleur si le produit a des variantes
    let colorButtons = '';
    if (product.colors && Array.isArray(product.colors)) {
        const scrollClass = product.colors.length >= 5 ? 'scrollable' : '';
        colorButtons = `<div class="color-buttons ${scrollClass}" style="display:inline-flex; gap:8px; vertical-align:middle; margin-left:8px;">
            ${product.colors.map((color, idx) => `
                <button class="color-circle" style="background:${color.color}; border:none; cursor:pointer; width:calc(66%); aspect-ratio:1/1; border-radius:50%; display:inline-block;" data-product-id="${product.id}" data-color-idx="${idx}" title="${color.name}"></button>
            `).join('')}
        </div>`;
    }
    return `
        <div class="product-card" data-category="${product.category}" data-product-id="${product.id}">
            <img src="${product.image}" alt="${product.title}" class="product-img">
            <div class="product-info">
                <h4 class="product-title">${product.title}</h4>
                <p class="product-category">${categoryName}</p>
                <p class="product-qualite"><span class="qualite-badge">${product.qualite || ''}</span></p>
                <p class="product-price">${product.price.toFixed(2)} XOF</p>
                <div style="display:flex; align-items:center; gap:8px;">
                    <button class="btn btn-accent add-to-cart-btn" data-product-id="${product.id}">
                        Ajouter au panier
                    </button>
                    ${colorButtons}
                </div>
            </div>
        </div>
    `;
}
function setupColorCircles() {
    // Sélectionner tous les boutons couleur
    setTimeout(() => {
        const colorCircles = document.querySelectorAll('.color-circle');
        colorCircles.forEach(btn => {
            btn.onclick = function(e) {
                const productId = btn.getAttribute('data-product-id');
                const colorIdx = btn.getAttribute('data-color-idx');
                const product = getProductById(productId);
                if (product && product.colors && product.colors[colorIdx]) {
                    // Trouver la carte produit et l'image à changer
                    const card = btn.closest('.product-card');
                    const img = card.querySelector('.product-img');
                    img.src = product.colors[colorIdx].image;
                    // Mémoriser la couleur sélectionnée sur la carte
                    card.setAttribute('data-selected-color-idx', colorIdx);
                }
            };
        });

        // Gestion du bouton "Ajouter au panier" pour prendre en compte la couleur sélectionnée
        const addToCartBtns = document.querySelectorAll('.add-to-cart-btn');
        addToCartBtns.forEach(btn => {
            btn.onclick = function(e) {
                const productId = btn.getAttribute('data-product-id');
                const card = btn.closest('.product-card');
                const selectedColorIdx = card.getAttribute('data-selected-color-idx');
                if (selectedColorIdx !== null) {
                    cart.addItem(parseInt(productId), parseInt(selectedColorIdx));
                } else {
                    cart.addItem(parseInt(productId));
                }
            };
        });
    }, 100);
}

// Configuration des filtres
function setupFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Mettre à jour l'apparence des boutons
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Filtrer les produits
            filterProductsByCategory(filter);
        });
    });
}

// Filtrer les produits par catégorie

function filterProductsByCategory(category) {
    activeCategory = category;
    const catalogContainer = document.getElementById('catalog-products');
    let filtered;
    if (category === 'all' || category === 'tous') {
        filtered = getDisplayProducts('all');
    } else {
        filtered = getProductsByCategory(category);
    }
    catalogContainer.innerHTML = filtered.map(product => createProductCard(product)).join('');
    setupColorCircles();
    // Déclenche un événement pour informer la barre de recherche
    window.dispatchEvent(new CustomEvent('categoryChanged', { detail: { category } }));
}

// Configuration du formulaire de contact
function setupContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
           // const name = formData.get('name');
            //const email = formData.get('email');
           // const message = formData.get('message');
            
            // Générer le message WhatsApp
            const whatsappMessage = encodeURIComponent(
                //`*Nouveau message de contact - Ice_shop*\n\n` +
                //`👤 *Nom:* ${name}\n` +
               // `📧 *Email:* ${email}\n\n` +
                `💬 *Message:*\n${message}`
            );
            
            // Ouvrir WhatsApp
            const whatsappUrl = `https://wa.me/${cart.whatsappNumber}?text=${whatsappMessage}`;
            window.open(whatsappUrl, '_blank');
            
            // Réinitialiser le formulaire
            this.reset();
            
            // Afficher une notification
            cart.showNotification('Message envoyé vers WhatsApp');
        });
    }
}

// Configuration des boutons WhatsApp
function setupWhatsAppButtons() {
    // Bouton de commande dans le panier
    const orderWhatsAppBtn = document.getElementById('order-whatsapp');
    if (orderWhatsAppBtn) {
        orderWhatsAppBtn.addEventListener('click', function() {
            cart.orderViaWhatsApp();
        });
    }
    
    // Bouton de contact WhatsApp
    const contactWhatsAppBtn = document.getElementById('contact-whatsapp');
    if (contactWhatsAppBtn) {
        contactWhatsAppBtn.addEventListener('click', function() {
            const message = encodeURIComponent(
                "Bonjour Ice_shop ! 👋\n\n" +
                "J'aimerais avoir plus d'informations sur vos produits."
            );
            const whatsappUrl = `https://wa.me/${cart.whatsappNumber}?text=${message}`;
            window.open(whatsappUrl, '_blank');
        });
    }
}

// Fonction utilitaire pour formater les prix
function formatPrice(price) {
    return new Intl.NumberFormat('fr-FR', {
        style: 'currency',
        currency: 'EUR'
    }).format(price);
}

// Fonction pour gérer le responsive
function handleResize() {
    const width = window.innerWidth;
    const navList = document.querySelector('.nav-list');
    
    if (width > 768) {
        navList.style.display = 'flex';
    } else {
        navList.style.display = 'none';
    }
}

// Écouter les changements de taille d'écran
window.addEventListener('resize', handleResize);

// Animation smooth scroll pour les ancres
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Amélioration de l'expérience utilisateur avec les touches du clavier
document.addEventListener('keydown', function(e) {
    // Fermer les modals avec Escape
    if (e.key === 'Escape') {
        // Logique pour fermer les éléments modals si nécessaire
    }
});

// Gestion du chargement des images avec lazy loading
function setupLazyLoading() {
    const images = document.querySelectorAll('img');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => {
        imageObserver.observe(img);
    });
}

// Performance: Débounce pour les fonctions coûteuses
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Initialiser le lazy loading après le chargement
window.addEventListener('load', setupLazyLoading);