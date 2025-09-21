// Base de données des produits
const products = [
    // ...existing code...
    // Généré automatiquement à partir du dossier photos
    {
        id: 1,
        title: "Air Force",
        price: 4000,
        image: "public/photos/air_force_blache.jpg",
        category: "chaussures",
        featured: true,
        qualite: "Originale",
        colors: [
            { name: "Blanc", color: "#ffffff", image: "public/photos/air_force_blache.jpg" },
            { name: "Noir", color: "#000000", image: "public/photos/air_force_noir.jpg" }
        ]
    },
    {
        id: 2,
        title: "Bonnet simple",
        price: 2500,
        image: "public/photos/bonnet_logo_gris.jpg",
        category: "accessoires",
        featured: false,
        qualite: "Originale",
        colors: [
            { name: "Gris", color: "#808080", image: "public/photos/bonnet_logo_gris.jpg" },
            { name: "Rose", color: "#ff69b4", image: "public/photos/bonnet_logo_rose.jpg" }
        ]
    },
    {
        id: 3,
        title: "Bonnet Under Armour",
        price: 3000,
        image: "public/photos/bonnet_under_armour_noir.jpg",
        category: "accessoires",
        featured: false,
        qualite: "Originale",
        colors: [
            { name: "Noir", color: "#000000", image: "public/photos/bonnet_under_armour_noir.jpg" }
        ]
    },
    {
        id: 4,
        title: "Campus Adidas",
        price: 6000,
        image: "public/photos/campus_adidas_gris.jpg",
        category: "chaussures",
        featured: false,
        qualite: "Originale",
        colors: [
            { name: "Gris", color: "#808080", image: "public/photos/campus_adidas_gris.jpg" },
            { name: "Noir", color: "#000000", image: "public/photos/campus_adidas_noir.jpg" }
        ]
    },
    {
        id: 5,
        title: "Chargeur iPhone",
        price: 1500,
        image: "public/photos/chargeur_iphone_simple.jpg",
        category: "accessoires",
        featured: false,
        qualite: "Originale",
        colors: [
            { name: "Blanc", color: "#ffffff", image: "public/photos/chargeur_iphone_tressé_blanc.jpg" },
            { name: "Bleu", color: "#87bdd8ff", image: "public/photos/chargeur_iphone_tressé_bleu.jpg" }
        ]
    },
    {
        id: 6,
        title: "Chaussette Nike",
        price: 1000,
        image: "public/photos/chaussette_nike_blanc.jpg",
        category: "accessoires",
        featured: true,
        qualite: "Originale",
        colors: [
            { name: "Blanc", color: "#ffffff", image: "public/photos/chaussette_nike_blanc.jpg" },
            { name: "Noir", color: "#000000", image: "public/photos/chaussette_nike_noir.jpg" }
        ]
    },
    {
        id: 7,
        title: "Claquette Adidas",
        price: 3500,
        image: "public/photos/claquette_adidas_noir.jpg",
        category: "chaussures",
        featured: false,
        qualite: "Originale",
        colors: [
            { name: "Noir", color: "#000000", image: "public/photos/claquette_adidas_noir.jpg" },
            { name: "Rose", color: "#ff69b4", image: "public/photos/claquette_adidas_rose.jpg" }
        ]
    },
    {
        id: 8,
        title: "Claquette",
        price: 3000,
        image: "public/photos/claquette_gris.jpg",
        category: "chaussures",
        featured: false,
        qualite: "Originale",
        colors: [
            { name: "Gris", color: "#808080", image: "public/photos/claquette_gris.jpg" },
            { name: "Marron clair", color: "#b5651d", image: "public/photos/claquette_marron_clair.jpg" }
        ]
    },
    {
        id: 9,
        title: "Mule Nike",
        price: 4000,
        image: "public/photos/mule_nike_noir.jpg",
        category: "chaussures",
        featured: false,
        qualite: "Originale",
        colors: [
            { name: "Noir", color: "#000000", image: "public/photos/mule_nike_noir.jpg" }
        ]
    },
    {
        id: 10,
        title: "Puma Suede",
        price: 5000,
        image: "public/photos/puma_suede_noir.jpg",
        category: "chaussures",
        featured: false,
        qualite: "Originale",
        colors: [
            { name: "Noir", color: "#000000", image: "public/photos/puma_suede_noir.jpg" },
            { name: "Rose", color: "#ff69b4", image: "public/photos/puma_suede_rose.jpg" },
            { name: "Rouge", color: "#ff0000", image: "public/photos/puma_suede_rouge.jpg" }
        ]
    },
    {
        id: 11,
        title: "Sabot",
        price: 2500,
        image: "public/photos/sabot_gris.jpg",
        category: "chaussures",
        featured: false,
        qualite: "Originale",
        colors: [
            { name: "Gris", color: "#808080", image: "public/photos/sabot_gris.jpg" },
            { name: "Noir", color: "#000000", image: "public/photos/sabot_noir.jpg" }
        ]
    },
    {
        id: 12,
        title: "Samba Adidas",
        price: 6000,
        image: "public/photos/samba_adidas_blanc.jpg",
        category: "chaussures",
        featured: false,
        qualite: "Originale",
        colors: [
            { name: "Blanc", color: "#ffffff", image: "public/photos/samba_adidas_blanc.jpg" }
        ]
    },
    {
        id: 13,
        title: "Sandale Arizona",
        price: 3500,
        image: "public/photos/sandale_arizona.jpg",
        category: "chaussures",
        featured: false,
        qualite: "Originale",
        colors: [
            { name: "Noir", color: "#000000", image: "public/photos/sandale_noir.jpg" }
        ]
    },
    {
        id: 14,
        title: "Vans",
        price: 4500,
        image: "public/photos/vans_noir.jpg",
        category: "chaussures",
        featured: false,
        qualite: "Originale",
        colors: [
            { name: "Noir", color: "#000000", image: "public/photos/vans_noir.jpg" }
        ]
    },
    {
        id: 15,
        title: "Yeezy Slide",
        price: 7000,
        image: "public/photos/yeezy_Slide_beige.jpg",
        category: "chaussures",
        featured: true,
        qualite: "Originale",
        colors: [
            { name: "Beige", color: "#f5f5dc", image: "public/photos/yeezy_Slide_beige.jpg" },
            { name: "Beige2", color: "#f5f5dc", image: "public/photos/yeezy_slide_beige2.jpg" },
            { name: "Noir", color: "#000000", image: "public/photos/yeezy_slide_noir.jpg" }
        ]
    },
    {
        id: 16,
        title: "Pullover(You must born Again)",
        price: 7000,
        image: "public/photos/must_born_again_bleu.jpg",
        category: "vetements-Homme",
        featured: true,
        qualite: "Originale",
        colors: [
            { name: "Orange", color: "#c45d29c0", image: "public/photos/must_born_again_orange.jpg" },
            { name: "Rouge", color: "#d00d0dcb", image: "public/photos/must_born_again_rouge.jpg" },
            { name: "Violet", color: "#5b0b6fd5", image: "public/photos/must_born_again_violet.jpg" },
            { name: "Bleu", color: "#1524a4b7", image: "public/photos/must_born_again_bleu.jpg" },
            { name: "Noir", color: "#504a4aff", image: "public/photos/must_born_again_gris.jpg" }

        ]
    },
    {
        id: 17,
        title: "Pullover(You must born Again)",
        price: 7000,
        image: "public/photos/must_born_again_bleu.jpg",
        category: "vetements-Femme",
        featured: true,
        qualite: "Originale",
        colors: [
            { name: "Orange", color: "#c45d29c0", image: "public/photos/must_born_again_orange.jpg" },
            { name: "Rouge", color: "#d00d0dcb", image: "public/photos/must_born_again_rouge.jpg" },
            { name: "Violet", color: "#5b0b6fd5", image: "public/photos/must_born_again_violet.jpg" },
            { name: "Bleu", color: "#1524a4b7", image: "public/photos/must_born_again_bleu.jpg" },
            { name: "Noir", color: "#504a4aff", image: "public/photos/must_born_again_gris.jpg" }

        ]
    }
];

// Fonction pour obtenir les catégories
function getCategories() {
    return {
        'vetements-femme': 'Vêtements Femme',
        'vetements-homme': 'Vêtements Homme',
        'vetements-enfant': 'Vêtements Enfant',
        'accessoires': 'Accessoires',
        'chaussures': 'Chaussures'
    };
}

// Fonction pour filtrer les produits par catégorie
function filterProducts(category) {
    if (category === 'all') {
        return products;
    }
    return products.filter(product => product.category === category);
}

// Fonction pour obtenir les produits en vedette
function getFeaturedProducts() {
    return products.filter(product => product.featured);
}

// Fonction pour obtenir un produit par ID
function getProductById(id) {
    return products.find(product => product.id === parseInt(id));
}

// Fonction pour fusionner les produits du même nom mais catégories homme/femme UNIQUEMENT pour "tous" et "nouveautés"
function getUniqueProductsForDisplay(productList) {
    const map = new Map();
    productList.forEach(prod => {
        // On fusionne uniquement vetements-homme et vetements-femme (insensible à la casse)
        const cat = prod.category.toLowerCase();
        if (cat === 'vetements-homme' || cat === 'vetements-femme') {
            const key = prod.title.trim().toLowerCase();
            if (!map.has(key)) {
                map.set(key, {
                    ...prod,
                    category: 'vetements-homme/femme',
                    categories: [cat],
                    originalProducts: [prod]
                });
            } else {
                const item = map.get(key);
                if (!item.categories.includes(cat)) {
                    item.categories.push(cat);
                    item.originalProducts.push(prod);
                }
            }
        } else {
            map.set(prod.id, prod);
        }
    });
    return Array.from(map.values());
}

// Pour "tous" et "nouveautés" : utiliser la fonction fusionnée
function getDisplayProducts(type = 'all') {
    let list = (type === 'featured') ? getFeaturedProducts() : products;
    return getUniqueProductsForDisplay(list);
}

// Fonction pour obtenir les produits d'une catégorie spécifique (AUCUNE fusion)
function getProductsByCategory(category) {
    return products.filter(product => product.category.toLowerCase() === category.toLowerCase());
}