// Mont Sion Boutique - Main JavaScript File
// Author: sossou Kouamé appolinaire développeur web

// Global variables
let products = [];
let currentCategory = 'all';
let productToDelete = null;

// Initialize default products if localStorage is empty
const defaultProducts = [
    {
        id: 1,
        name: 'Veste en Cuir Premium',
        category: 'homme',
        price: 45000,
        image: './resources/product-homme-1.jpg'
    },
    {
        id: 2,
        name: 'Montre de Luxe Dorée',
        category: 'homme',
        price: 75000,
        image: './resources/product-homme-2.jpg'
    },
    {
        id: 3,
        name: 'Chaussures Designer',
        category: 'homme',
        price: 35000,
        image: './resources/product-homme-3.jpg'
    },
    {
        id: 4,
        name: 'Robe Soirée Élégante',
        category: 'femme',
        price: 55000,
        image: './resources/product-femme-1.jpg'
    },
    {
        id: 5,
        name: 'Sac à Main Designer',
        category: 'femme',
        price: 65000,
        image: './resources/product-femme-2.jpg'
    },
    {
        id: 6,
        name: 'Talons Hauts Luxe',
        category: 'femme',
        price: 28000,
        image: './resources/product-femme-3.jpg'
    },
    {
        id: 7,
        name: 'Cartable Enfant Coloré',
        category: 'enfant',
        price: 15000,
        image: './resources/product-enfant-1.jpg'
    },
    {
        id: 8,
        name: 'Chaussures Sport Enfant',
        category: 'enfant',
        price: 18000,
        image: './resources/product-enfant-2.jpg'
    },
    {
        id: 9,
        name: 'Veste Hiver Enfant',
        category: 'enfant',
        price: 25000,
        image: './resources/product-enfant-3.jpg'
    }
];

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

// Initialize application
function initializeApp() {
    // Load products from localStorage
    loadProducts();
    
    // Initialize page-specific functionality
    const currentPage = getCurrentPage();
    
    switch(currentPage) {
        case 'index':
            initializeHomePage();
            break;
        case 'categories':
            initializeCategoriesPage();
            break;
        case 'admin':
            initializeAdminPage();
            break;
    }
    
    // Initialize scroll animations
    initializeScrollAnimations();
}

// Get current page
function getCurrentPage() {
    const path = window.location.pathname;
    if (path.includes('categories.html')) return 'categories';
    if (path.includes('admin.html')) return 'admin';
    return 'index';
}

// Load products from localStorage
function loadProducts() {
    const stored = localStorage.getItem('montSionProducts');
    if (stored) {
        products = JSON.parse(stored);
    } else {
        products = [...defaultProducts];
        saveProducts();
    }
}

// Save products to localStorage
function saveProducts() {
    localStorage.setItem('montSionProducts', JSON.stringify(products));
}

// Initialize home page
function initializeHomePage() {
    const categoriesBtn = document.getElementById('categoriesBtn');
    const adminBtn = document.getElementById('adminBtn');
    const loadingModal = document.getElementById('loadingModal');
    const progressBar = document.getElementById('progressBar');
    const progressText = document.getElementById('progressText');
    const adminModal = document.getElementById('adminModal');
    const adminForm = document.getElementById('adminForm');
    const cancelAdmin = document.getElementById('cancelAdmin');
    const errorMessage = document.getElementById('errorMessage');
    
    // Categories button click
    if (categoriesBtn) {
        categoriesBtn.addEventListener('click', function() {
            showLoadingAnimation('categories.html');
        });
    }
    
    // Admin button click
    if (adminBtn) {
        adminBtn.addEventListener('click', function() {
            adminModal.classList.add('show');
        });
    }
    
    // Cancel admin modal
    if (cancelAdmin) {
        cancelAdmin.addEventListener('click', function() {
            adminModal.classList.remove('show');
            document.getElementById('adminPassword').value = '';
            errorMessage.classList.add('hidden');
        });
    }
    
    // Admin form submit
    if (adminForm) {
        adminForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const password = document.getElementById('adminPassword').value;
            
            if (password === 'kouame') {
                adminModal.classList.remove('show');
                showLoadingAnimation('admin.html');
                document.getElementById('adminPassword').value = '';
                errorMessage.classList.add('hidden');
            } else {
                errorMessage.classList.remove('hidden');
                document.getElementById('adminPassword').focus();
            }
        });
    }
}

// Show loading animation
function showLoadingAnimation(targetUrl) {
    const loadingModal = document.getElementById('loadingModal');
    const progressBar = document.getElementById('progressBar');
    const progressText = document.getElementById('progressText');
    
    if (loadingModal) {
        loadingModal.style.display = 'flex';
        
        let progress = 0;
        const interval = setInterval(() => {
            progress += Math.random() * 15;
            if (progress > 100) progress = 100;
            
            progressBar.style.width = progress + '%';
            
            if (progress < 30) {
                progressText.textContent = 'Chargement de la page...';
            } else if (progress < 60) {
                progressText.textContent = 'Préparation des contenus...';
            } else if (progress < 90) {
                progressText.textContent = 'Finalisation...';
            } else {
                progressText.textContent = 'Redirection...';
            }
            
            if (progress >= 100) {
                clearInterval(interval);
                setTimeout(() => {
                    window.location.href = targetUrl;
                }, 500);
            }
        }, 100);
    }
}

// Initialize categories page
function initializeCategoriesPage() {
    // Show loading screen
    showCategoriesLoading();
    
    // Initialize category buttons
    const categoryButtons = {
        all: document.getElementById('allBtn'),
        homme: document.getElementById('hommeBtn'),
        femme: document.getElementById('femmeBtn'),
        enfant: document.getElementById('enfantBtn')
    };
    
    // Add event listeners to category buttons
    Object.keys(categoryButtons).forEach(category => {
        if (categoryButtons[category]) {
            categoryButtons[category].addEventListener('click', () => {
                setActiveCategory(category);
                filterProducts(category);
            });
        }
    });
    
    // Initialize product modal
    initializeProductModal();
    
    // Load products after loading animation
    setTimeout(() => {
        loadProductsToGrid();
        hideCategoriesLoading();
    }, 2500);
}

// Show categories loading animation
function showCategoriesLoading() {
    const loadingScreen = document.getElementById('loadingScreen');
    const progressFill = document.getElementById('progressFill');
    const progressText = document.getElementById('progressText');
    
    if (loadingScreen && progressFill) {
        let progress = 0;
        const messages = [
            'Chargement des collections...',
            'Préparation des articles Homme...',
            'Chargement des articles Femme...',
            'Organisation des articles Enfant...',
            'Finalisation de l\'affichage...'
        ];
        
        const interval = setInterval(() => {
            progress += Math.random() * 12;
            if (progress > 100) progress = 100;
            
            progressFill.style.width = progress + '%';
            
            const messageIndex = Math.floor((progress / 100) * messages.length);
            if (progressText && messages[messageIndex]) {
                progressText.textContent = messages[messageIndex];
            }
            
            if (progress >= 100) {
                clearInterval(interval);
                setTimeout(() => {
                    hideCategoriesLoading();
                }, 500);
            }
        }, 150);
    }
}

// Hide categories loading
function hideCategoriesLoading() {
    const loadingScreen = document.getElementById('loadingScreen');
    if (loadingScreen) {
        loadingScreen.classList.add('hide');
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500);
    }
}

// Set active category
function setActiveCategory(category) {
    currentCategory = category;
    
    // Update button states
    const buttons = document.querySelectorAll('.category-btn');
    buttons.forEach(btn => btn.classList.remove('active'));
    
    const activeBtn = document.getElementById(category + 'Btn');
    if (activeBtn) {
        activeBtn.classList.add('active');
    }
}

// Filter products by category
function filterProducts(category) {
    loadProductsToGrid();
}

// Load products to grid
function loadProductsToGrid() {
    const grid = document.getElementById('productsGrid');
    const emptyState = document.getElementById('emptyState');
    
    if (!grid) return;
    
    // Filter products
    let filteredProducts = products;
    if (currentCategory !== 'all') {
        filteredProducts = products.filter(p => p.category === currentCategory);
    }
    
    // Show empty state if no products
    if (filteredProducts.length === 0) {
        grid.innerHTML = '';
        if (emptyState) emptyState.classList.remove('hidden');
        return;
    }
    
    if (emptyState) emptyState.classList.add('hidden');
    
    // Generate product cards
    grid.innerHTML = filteredProducts.map(product => `
        <div class="product-card bg-white rounded-2xl shadow-lg overflow-hidden show">
            <div class="relative group">
                <img src="${product.image}" alt="${product.name}" class="w-full h-64 object-cover">
                <div class="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <button onclick="openProductModal(${product.id})" class="bg-white text-gray-900 px-6 py-2 rounded-full font-semibold hover:bg-gray-100 transition-colors">
                        <i class="fas fa-eye mr-2"></i>Voir
                    </button>
                </div>
            </div>
            <div class="p-6">
                <div class="flex items-center justify-between mb-2">
                    <span class="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-semibold capitalize">
                        ${product.category}
                    </span>
                    <div class="flex space-x-2">
                        <button onclick="editProduct(${product.id})" class="text-blue-600 hover:text-blue-800 transition-colors">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button onclick="confirmDeleteProduct(${product.id})" class="text-red-600 hover:text-red-800 transition-colors">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
                <h3 class="text-lg font-['Montserrat'] font-semibold text-gray-900 mb-2">${product.name}</h3>
                <p class="text-2xl font-bold gradient-text mb-4">${product.price.toLocaleString()} FCFA</p>
                <button onclick="orderProduct(${product.id})" class="whatsapp-btn text-white w-full py-3 rounded-lg font-['Montserrat'] font-semibold">
                    <i class="fab fa-whatsapp mr-2"></i>Commander
                </button>
            </div>
        </div>
    `).join('');
    
    // Animate cards
    setTimeout(() => {
        const cards = document.querySelectorAll('.product-card');
        cards.forEach((card, index) => {
            setTimeout(() => {
                card.classList.add('show');
            }, index * 100);
        });
    }, 100);
}

// Initialize product modal
function initializeProductModal() {
    const modal = document.getElementById('productModal');
    const closeBtn = document.getElementById('closeModal');
    
    if (closeBtn) {
        closeBtn.addEventListener('click', closeProductModal);
    }
    
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeProductModal();
            }
        });
    }
}

// Open product modal
function openProductModal(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    const modal = document.getElementById('productModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalImage = document.getElementById('modalImage');
    const modalCategory = document.getElementById('modalCategory');
    const modalPrice = document.getElementById('modalPrice');
    const orderBtn = document.getElementById('orderBtn');
    
    if (modal && modalTitle && modalImage && modalCategory && modalPrice) {
        modalTitle.textContent = product.name;
        modalImage.src = product.image;
        modalImage.alt = product.name;
        modalCategory.textContent = product.category.charAt(0).toUpperCase() + product.category.slice(1);
        modalCategory.className = `inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold mb-2`;
        modalPrice.textContent = `${product.price.toLocaleString()} FCFA`;
        
        if (orderBtn) {
            orderBtn.onclick = () => orderProduct(productId);
        }
        
        modal.classList.remove('hidden');
        modal.classList.add('flex');
    }
}

// Close product modal
function closeProductModal() {
    const modal = document.getElementById('productModal');
    if (modal) {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
    }
}

// Order product via WhatsApp
function orderProduct(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    const message = `Bonjour, je suis intéressé(e) par l'article suivant:\n\n` +
                    `*${product.name}*\n` +
                    `Catégorie: ${product.category.charAt(0).toUpperCase() + product.category.slice(1)}\n` +
                    `Prix: ${product.price.toLocaleString()} FCFA\n\n` +
                    `Merci de me contacter pour plus d'informations.`;
    
    const whatsappUrl = `https://wa.me/22967924076?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
}

// Edit product (redirect to admin)
function editProduct(productId) {
    // First check admin access
    const password = prompt('Entrez le mot de passe administrateur pour modifier cet article:');
    if (password === 'kouame') {
        localStorage.setItem('editProductId', productId);
        window.location.href = 'admin.html';
    } else if (password !== null) {
        alert('Mot de passe incorrect!');
    }
}

// Confirm delete product
function confirmDeleteProduct(productId) {
    productToDelete = productId;
    const modal = document.getElementById('deleteModal');
    if (modal) {
        modal.classList.remove('hidden');
        modal.classList.add('flex');
    }
}

// Initialize admin page
function initializeAdminPage() {
    // Check if user came from edit
    const editProductId = localStorage.getItem('editProductId');
    if (editProductId) {
        localStorage.removeItem('editProductId');
    }
    
    // Initialize form
    initializeAdminForm();
    
    // Load products list
    loadAdminProductsList();
    
    // Initialize delete modal
    initializeDeleteModal();
}

// Initialize admin form
function initializeAdminForm() {
    const form = document.getElementById('addProductForm');
    const imageInput = document.getElementById('productImage');
    const imagePreview = document.getElementById('imagePreview');
    
    // Image preview
    if (imageInput && imagePreview) {
        imageInput.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    imagePreview.src = e.target.result;
                };
                reader.readAsDataURL(file);
            }
        });
    }
    
    // Form submit
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            addProduct();
        });
    }
    
    // Check if editing a product
    const editProductId = localStorage.getItem('editProductId');
    if (editProductId) {
        loadProductForEdit(parseInt(editProductId));
    }
}

// Load product for edit
function loadProductForEdit(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    const nameInput = document.getElementById('productName');
    const categorySelect = document.getElementById('productCategory');
    const priceInput = document.getElementById('productPrice');
    const imagePreview = document.getElementById('imagePreview');
    
    if (nameInput) nameInput.value = product.name;
    if (categorySelect) categorySelect.value = product.category;
    if (priceInput) priceInput.value = product.price;
    if (imagePreview) imagePreview.src = product.image;
    
    // Change form to edit mode
    const form = document.getElementById('addProductForm');
    const submitBtn = form.querySelector('button[type="submit"]');
    if (submitBtn) {
        submitBtn.innerHTML = '<i class="fas fa-save mr-2"></i>Modifier l\'Article';
        submitBtn.onclick = () => updateProduct(productId);
    }
}

// Add new product
function addProduct() {
    const name = document.getElementById('productName').value;
    const category = document.getElementById('productCategory').value;
    const price = parseInt(document.getElementById('productPrice').value);
    const imagePreview = document.getElementById('imagePreview');
    
    if (!name || !category || !price) {
        alert('Veuillez remplir tous les champs');
        return;
    }
    
    const newProduct = {
        id: Date.now(),
        name: name,
        category: category,
        price: price,
        image: imagePreview.src
    };
    
    products.push(newProduct);
    saveProducts();
    
    // Show success message
    showSuccessMessage();
    
    // Reset form
    document.getElementById('addProductForm').reset();
    imagePreview.src = './resources/default-product.jpg';
    
    // Reload products list
    loadAdminProductsList();
}

// Update product
function updateProduct(productId) {
    const productIndex = products.findIndex(p => p.id === productId);
    if (productIndex === -1) return;
    
    const name = document.getElementById('productName').value;
    const category = document.getElementById('productCategory').value;
    const price = parseInt(document.getElementById('productPrice').value);
    const imagePreview = document.getElementById('imagePreview');
    
    if (!name || !category || !price) {
        alert('Veuillez remplir tous les champs');
        return;
    }
    
    products[productIndex] = {
        ...products[productIndex],
        name: name,
        category: category,
        price: price,
        image: imagePreview.src
    };
    
    saveProducts();
    
    // Show success message
    showSuccessMessage('Article modifié avec succès !');
    
    // Reset form to add mode
    document.getElementById('addProductForm').reset();
    imagePreview.src = './resources/default-product.jpg';
    
    const form = document.getElementById('addProductForm');
    const submitBtn = form.querySelector('button[type="submit"]');
    if (submitBtn) {
        submitBtn.innerHTML = '<i class="fas fa-plus mr-2"></i>Ajouter l\'Article';
        submitBtn.onclick = null;
        form.onsubmit = (e) => {
            e.preventDefault();
            addProduct();
        };
    }
    
    // Reload products list
    loadAdminProductsList();
}

// Show success message
function showSuccessMessage(message = 'Article ajouté avec succès !') {
    const successMessage = document.getElementById('successMessage');
    if (successMessage) {
        successMessage.innerHTML = `<i class="fas fa-check-circle mr-2"></i>${message}`;
        successMessage.style.display = 'block';
        
        setTimeout(() => {
            successMessage.style.display = 'none';
        }, 3000);
    }
}

// Load admin products list
function loadAdminProductsList() {
    const productsList = document.getElementById('productsList');
    const productCount = document.getElementById('productCount');
    const emptyState = document.getElementById('emptyState');
    
    if (!productsList) return;
    
    // Update count
    if (productCount) {
        productCount.textContent = `${products.length} article${products.length !== 1 ? 's' : ''}`;
    }
    
    // Show empty state if no products
    if (products.length === 0) {
        productsList.innerHTML = '';
        if (emptyState) emptyState.classList.remove('hidden');
        return;
    }
    
    if (emptyState) emptyState.classList.add('hidden');
    
    // Generate products list
    productsList.innerHTML = products.map(product => `
        <div class="product-item flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
            <div class="flex items-center space-x-4">
                <img src="${product.image}" alt="${product.name}" class="w-16 h-16 object-cover rounded-lg">
                <div>
                    <h4 class="font-['Montserrat'] font-semibold text-gray-900">${product.name}</h4>
                    <p class="text-sm text-gray-600 capitalize">${product.category} • ${product.price.toLocaleString()} FCFA</p>
                </div>
            </div>
            <div class="flex items-center space-x-2">
                <button onclick="editProductFromAdmin(${product.id})" class="bg-blue-100 text-blue-600 p-2 rounded-lg hover:bg-blue-200 transition-colors">
                    <i class="fas fa-edit"></i>
                </button>
                <button onclick="confirmDeleteProduct(${product.id})" class="bg-red-100 text-red-600 p-2 rounded-lg hover:bg-red-200 transition-colors">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        </div>
    `).join('');
}

// Edit product from admin
function editProductFromAdmin(productId) {
    localStorage.setItem('editProductId', productId);
    location.reload();
}

// Initialize delete modal
function initializeDeleteModal() {
    const modal = document.getElementById('deleteModal');
    const cancelBtn = document.getElementById('cancelDelete');
    const confirmBtn = document.getElementById('confirmDelete');
    
    if (cancelBtn) {
        cancelBtn.addEventListener('click', function() {
            closeDeleteModal();
        });
    }
    
    if (confirmBtn) {
        confirmBtn.addEventListener('click', function() {
            if (productToDelete) {
                deleteProduct(productToDelete);
                productToDelete = null;
            }
            closeDeleteModal();
        });
    }
    
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeDeleteModal();
            }
        });
    }
}

// Delete product
function deleteProduct(productId) {
    products = products.filter(p => p.id !== productId);
    saveProducts();
    loadAdminProductsList();
    showSuccessMessage('Article supprimé avec succès !');
}

// Close delete modal
function closeDeleteModal() {
    const modal = document.getElementById('deleteModal');
    if (modal) {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
    }
    productToDelete = null;
}

// Initialize scroll animations
function initializeScrollAnimations() {
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    revealElements.forEach(element => {
        revealObserver.observe(element);
    });
}

// Utility functions
function formatPrice(price) {
    return price.toLocaleString() + ' FCFA';
}

function getCategoryColor(category) {
    const colors = {
        homme: 'blue',
        femme: 'pink',
        enfant: 'green'
    };
    return colors[category] || 'gray';
}

// Export functions for global access
window.openProductModal = openProductModal;
window.closeProductModal = closeProductModal;
window.orderProduct = orderProduct;
window.editProduct = editProduct;
window.confirmDeleteProduct = confirmDeleteProduct;
window.editProductFromAdmin = editProductFromAdmin;
window.setActiveCategory = setActiveCategory;
window.filterProducts = filterProducts;