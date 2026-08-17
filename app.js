/* ============================================
   MIDNIGHT SMOKE SHOP — Application Logic
   ============================================ */

// ============================================
// PRODUCT DATABASE
// ============================================
const PRODUCTS_DB = [
  {
    id: 1,
    name: "NightFlow Vape Pro",
    category: "vapes",
    price: 89.99,
    description: "Advanced dual-coil design with precision temperature control. Premium vapor production.",
    image: "pictures/foto4.jpg"
  },
  {
    id: 2,
    name: "SilentDraw Portable",
    category: "vapes",
    price: 129.99,
    description: "Ultra-portable with ceramic chamber. Perfect for on-the-go sessions.",
    image: "pictures/foto5.jpg"
  },
  {
    id: 3,
    name: "Eclipse Desktop Unit",
    category: "vapes",
    price: 249.99,
    description: "Premium desktop experience with hybrid heating. Handcrafted precision.",
    image: "pictures/foto6.jpg"
  },
  {
    id: 4,
    name: "Obsidian Glass Piece",
    category: "accessories",
    price: 65.00,
    description: "Mouth-blown obsidian-tinted glass. Collectible artisan piece.",
    image: "pictures/foto7.jpg"
  },
  {
    id: 5,
    name: "Midnight Cleaning Kit",
    category: "accessories",
    price: 34.99,
    description: "Complete maintenance set with premium brushes and solutions.",
    image: "pictures/foto8.jpg"
  },
  {
    id: 6,
    name: "Neon Purple Case",
    category: "accessories",
    price: 45.00,
    description: "Protective carry case with neon-lined interior. Lifetime warranty.",
    image: "pictures/foto9.jpg"
  },
  {
    id: 7,
    name: "Crystal Extract Live",
    category: "concentrates",
    price: 54.99,
    description: "Fresh frozen concentrate. High terpene profile.",
    image: "pictures/foto10.jpg"
  },
  {
    id: 8,
    name: "Solventless Press",
    category: "concentrates",
    price: 44.99,
    description: "Full-spectrum solventless extract. Clean and potent.",
    image: "pictures/foto11.jpg"
  },
  {
    id: 9,
    name: "Premium Rosin",
    category: "concentrates",
    price: 59.99,
    description: "Fresh rosin press. Golden color, excellent terps.",
    image: "pictures/foto12.png"
  },
  {
    id: 10,
    name: "VIP Signature Collection",
    category: "vip",
    price: 399.99,
    description: "Exclusive limited-edition package. VIP members only.",
    image: "pictures/foto1.jpg"
  },
  {
    id: 11,
    name: "Midnight Reserve Bundle",
    category: "vip",
    price: 599.99,
    description: "Premium curated selection. Includes exclusive accessories.",
    image: "pictures/foto2.jpg"
  },
  {
    id: 12,
    name: "Platinum Experience",
    category: "vip",
    price: 899.99,
    description: "Ultimate collection with concierge service included.",
    image: "pictures/foto3.jpg"
  }
];

// ============================================
// LOCAL STORAGE HELPERS
// ============================================
function getUsers() {
  return JSON.parse(localStorage.getItem('mns_users') || '[]');
}

function saveUsers(users) {
  localStorage.setItem('mns_users', JSON.stringify(users));
}

function setSession(user) {
  localStorage.setItem('mns_session', JSON.stringify(user));
  updateHeader();
  updateVIPMenuVisibility();
  updateVIPTabVisibility();
}

function clearSession() {
  localStorage.removeItem('mns_session');
  updateHeader();
  updateVIPMenuVisibility();
  updateVIPTabVisibility();
}

function currentUser() {
  return JSON.parse(localStorage.getItem('mns_session') || 'null');
}

function getInvites() {
  return JSON.parse(localStorage.getItem('mns_invites') || '[]');
}

function saveInvites(list) {
  localStorage.setItem('mns_invites', JSON.stringify(list));
}

function isInvited(email) {
  return getInvites().includes(email);
}

function inviteEmail(email) {
  const list = getInvites();
  if (!list.includes(email)) {
    list.push(email);
    saveInvites(list);
  }
}

function revokeEmail(email) {
  let list = getInvites();
  list = list.filter(e => e !== email);
  saveInvites(list);
}

// VIP APPROVAL SYSTEM
function getPendingVipRequests() {
  return JSON.parse(localStorage.getItem('mns_pending_vip') || '[]');
}

function savePendingVipRequests(list) {
  localStorage.setItem('mns_pending_vip', JSON.stringify(list));
}

function requestVipAccess(email) {
  const pending = getPendingVipRequests();
  if (!pending.includes(email)) {
    pending.push(email);
    savePendingVipRequests(pending);
    return true;
  }
  return false;
}

function approveVipRequest(email) {
  // Move from pending to approved
  let pending = getPendingVipRequests();
  pending = pending.filter(e => e !== email);
  savePendingVipRequests(pending);
  
  // Add to VIP list
  inviteEmail(email);
  
  renderPendingVipRequests();
  renderInviteList();
  updateVIPTabVisibility();
  updateVIPMenuVisibility();
}

function rejectVipRequest(email) {
  let pending = getPendingVipRequests();
  pending = pending.filter(e => e !== email);
  savePendingVipRequests(pending);
  
  renderPendingVipRequests();
}

function getOwner() {
  return localStorage.getItem('mns_owner') || null;
}

function setOwner(email) {
  localStorage.setItem('mns_owner', email);
  updateHeader();
}

function getProducts() {
  return JSON.parse(localStorage.getItem('mns_products') || JSON.stringify(PRODUCTS_DB));
}

function saveProducts(products) {
  localStorage.setItem('mns_products', JSON.stringify(products));
}

// ============================================
// AUTH MODAL MANAGEMENT
// ============================================
const authModal = document.getElementById('authModal');
const loginBtn = document.getElementById('loginBtn');
const registerBtn = document.getElementById('registerBtn');
const modalClose = document.getElementById('modalClose');
const tabLogin = document.getElementById('tabLogin');
const tabRegister = document.getElementById('tabRegister');
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');
const loginMsg = document.getElementById('loginMsg');
const regMsg = document.getElementById('regMsg');

function openModal(mode = 'login') {
  authModal.style.display = 'flex';
  authModal.setAttribute('aria-hidden', 'false');
  if (mode === 'login') showLogin();
  else showRegister();
  setTimeout(() => {
    const input = mode === 'login' ? document.getElementById('loginEmail') : document.getElementById('regName');
    if (input) input.focus();
  }, 100);
}

function closeModal() {
  authModal.style.display = 'none';
  authModal.setAttribute('aria-hidden', 'true');
}

function showLogin() {
  tabLogin.classList.add('active');
  tabRegister.classList.remove('active');
  tabLogin.setAttribute('aria-selected', 'true');
  tabRegister.setAttribute('aria-selected', 'false');
  loginForm.classList.remove('hidden');
  registerForm.classList.add('hidden');
}

function showRegister() {
  tabLogin.classList.remove('active');
  tabRegister.classList.add('active');
  tabLogin.setAttribute('aria-selected', 'false');
  tabRegister.setAttribute('aria-selected', 'true');
  loginForm.classList.add('hidden');
  registerForm.classList.remove('hidden');
}

loginBtn.addEventListener('click', () => openModal('login'));
registerBtn.addEventListener('click', () => openModal('register'));
modalClose.addEventListener('click', closeModal);
tabLogin.addEventListener('click', showLogin);
tabRegister.addEventListener('click', showRegister);

// Register Form
registerForm.addEventListener('submit', e => {
  e.preventDefault();
  regMsg.textContent = '';
  const name = document.getElementById('regName').value.trim();
  const email = document.getElementById('regEmail').value.trim().toLowerCase();
  const pass = document.getElementById('regPassword').value;

  if (!name || !email || pass.length < 6) {
    regMsg.textContent = 'Please complete all fields (min 6 chars password).';
    return;
  }

  const users = getUsers();
  if (users.find(u => u.email === email)) {
    regMsg.textContent = 'An account with that email already exists.';
    return;
  }

  const user = { name, email, password: pass };
  users.push(user);
  saveUsers(users);
  setSession({ name, email });
  regMsg.classList.add('success');
  regMsg.textContent = 'Account created. You are logged in.';
  setTimeout(() => {
    closeModal();
    regMsg.classList.remove('success');
  }, 1200);
});

// Login Form
loginForm.addEventListener('submit', e => {
  e.preventDefault();
  loginMsg.textContent = '';
  const email = document.getElementById('loginEmail').value.trim().toLowerCase();
  const pass = document.getElementById('loginPassword').value;
  const users = getUsers();
  const u = users.find(x => x.email === email && x.password === pass);

  if (!u) {
    loginMsg.textContent = 'Invalid email or password.';
    return;
  }

  setSession({ name: u.name, email: u.email });
  loginMsg.classList.add('success');
  loginMsg.textContent = 'Signed in.';
  setTimeout(() => {
    closeModal();
    loginMsg.classList.remove('success');
  }, 800);
});

// Close modal on outside click
authModal.addEventListener('click', e => {
  if (e.target === authModal) closeModal();
});

// Close on Escape
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && authModal.style.display === 'flex') closeModal();
});

// ============================================
// PRODUCT CATALOG & FILTERING
// ============================================
const productsGrid = document.getElementById('productsGrid');
const tabBtns = document.querySelectorAll('.tab-btn');
let currentCategory = 'all';

function renderProducts(category = 'all') {
  const products = getProducts();
  const user = currentUser();
  const isVIP = user && isInvited(user.email);
  
  let filtered = products;
  
  // Filter by category
  if (category !== 'all') {
    filtered = filtered.filter(p => p.category === category);
  }
  
  // Hide VIP products if user is not VIP
  if (!isVIP) {
    filtered = filtered.filter(p => p.category !== 'vip');
  }

  productsGrid.innerHTML = filtered.map(product => {
    const imageStyle = product.image ? `background-image:url('${product.image}');background-size:cover;background-position:center` : '';
    return `
    <article class="card" data-product-id="${product.id}">
      <div class="card-media" style="${imageStyle}"></div>
      <div class="card-body">
        <span class="category-tag">${product.category}</span>
        <h3>${product.name}</h3>
        <p class="price">$${product.price.toFixed(2)}</p>
        <p class="desc">${product.description}</p>
        <div class="card-actions">
          <button class="btn primary" onclick="addToCart(${product.id})">Add to Cart</button>
          <button class="btn outline" onclick="viewProduct(${product.id})">Details</button>
        </div>
      </div>
    </article>
    `;
  }).join('');
}

tabBtns.forEach(btn => {
  btn.addEventListener('click', e => {
    currentCategory = e.target.dataset.category;
    tabBtns.forEach(b => b.classList.remove('active'));
    e.target.classList.add('active');
    e.target.setAttribute('aria-selected', 'true');
    tabBtns.forEach(b => {
      if (b !== e.target) b.setAttribute('aria-selected', 'false');
    });
    renderProducts(currentCategory);
  });
});

// Update VIP Line tab visibility
function updateVIPTabVisibility() {
  const vipTab = document.querySelector('[data-category="vip"]');
  if (!vipTab) return;
  
  const user = currentUser();
  const isVIP = user && isInvited(user.email);
  
  if (isVIP) {
    // Show VIP Line for VIP members
    vipTab.style.display = 'block';
  } else {
    // Hide VIP Line for non-VIP users
    vipTab.style.display = 'none';
    
    // If VIP category was selected, switch to "All Products"
    if (currentCategory === 'vip') {
      currentCategory = 'all';
      tabBtns.forEach(b => b.classList.remove('active'));
      document.querySelector('[data-category="all"]').classList.add('active');
      renderProducts('all');
    }
  }
  
  // Re-render products to hide/show VIP items
  renderProducts(currentCategory);
}

function addToCart(productId) {
  const product = getProducts().find(p => p.id === productId);
  if (product) {
    alert(`Added "${product.name}" to cart!`);
  }
}

function viewProduct(productId) {
  const product = getProducts().find(p => p.id === productId);
  if (product) {
    alert(`${product.name}\n\n${product.description}\n\nPrice: $${product.price.toFixed(2)}`);
  }
}

// Initial render
renderProducts();

// ============================================
// VIP MODAL & FUNCTIONALITY
// ============================================
const vipBtn = document.getElementById('vipBtn');
const vipCta = document.getElementById('vipCta');
const heroVipBtn = document.getElementById('heroVipBtn');
const vipModal = document.getElementById('vipModal');
const vipClose = vipModal.querySelector('.vip-close');
const vipMsg = document.getElementById('vipMsg');

function openVIP() {
  const user = currentUser();
  if (!user) {
    openModal('login');
    return;
  }

  vipModal.style.display = 'flex';
  vipModal.setAttribute('aria-hidden', 'false');

  const pending = getPendingVipRequests();
  const alreadyRequested = pending.includes(user.email);

  if (isInvited(user.email)) {
    // User is VIP
    vipModal.querySelector('#vipMenu').style.display = 'block';
    vipModal.querySelector('#vipBenefits').style.display = 'none';
    vipMsg.textContent = '';
  } else {
    // User is not VIP
    vipModal.querySelector('#vipMenu').style.display = 'none';
    vipModal.querySelector('#vipBenefits').style.display = 'block';
    
    if (alreadyRequested) {
      vipMsg.textContent = '⏳ Your VIP request is pending approval. We\'ll notify you soon!';
      document.getElementById('requestVipBtn').disabled = true;
      document.getElementById('requestVipBtn').textContent = '⏳ Request Pending...';
    } else {
      vipMsg.textContent = '';
      document.getElementById('requestVipBtn').disabled = false;
      document.getElementById('requestVipBtn').textContent = '📝 Request VIP Approval';
    }
  }
}

function closeVIP() {
  vipModal.style.display = 'none';
  vipModal.setAttribute('aria-hidden', 'true');
}

// Update VIP Exclusive Menu Visibility
function updateVIPMenuVisibility() {
  const vipExclusiveMenu = document.getElementById('vipExclusiveMenu');
  if (!vipExclusiveMenu) return;
  
  const user = currentUser();
  if (user && isInvited(user.email)) {
    // User is VIP - Show exclusive menu
    vipExclusiveMenu.style.display = 'block';
  } else {
    // User is not VIP or not logged in - Hide exclusive menu
    vipExclusiveMenu.style.display = 'none';
  }
}

// ============================================
// AGE VERIFICATION
// ============================================
function checkAgeVerification() {
  const ageVerified = localStorage.getItem('mns_age_verified');
  const ageVerificationModal = document.getElementById('ageVerificationModal');
  
  if (!ageVerified) {
    ageVerificationModal.style.display = 'flex';
  } else {
    ageVerificationModal.style.display = 'none';
  }
}

const ageYesBtn = document.getElementById('ageYesBtn');
const ageNoBtn = document.getElementById('ageNoBtn');
const ageVerificationModal = document.getElementById('ageVerificationModal');

if (ageYesBtn) {
  ageYesBtn.addEventListener('click', () => {
    localStorage.setItem('mns_age_verified', 'true');
    ageVerificationModal.style.display = 'none';
  });
}

if (ageNoBtn) {
  ageNoBtn.addEventListener('click', () => {
    alert('You must be 21 years or older to access this site. Please leave.');
    window.location.href = 'about:blank';
  });
}

// Call updateVIPMenuVisibility on page load
document.addEventListener('DOMContentLoaded', () => {
  updateVIPMenuVisibility();
  checkAgeVerification();
});

vipBtn.addEventListener('click', openVIP);
vipCta.addEventListener('click', openVIP);
heroVipBtn.addEventListener('click', openVIP);
vipClose.addEventListener('click', closeVIP);
vipModal.addEventListener('click', e => {
  if (e.target === vipModal) closeVIP();
});

// Request VIP Button
const requestVipBtn = document.getElementById('requestVipBtn');
if (requestVipBtn) {
  requestVipBtn.addEventListener('click', () => {
    const user = currentUser();
    if (!user) return;
    
    if (requestVipAccess(user.email)) {
      requestVipBtn.textContent = '⏳ Request Pending...';
      requestVipBtn.disabled = true;
      vipMsg.textContent = '✅ VIP request submitted! The admin will review it soon.';
      vipMsg.style.color = 'var(--accent)';
      setTimeout(() => {
        vipMsg.style.color = '';
      }, 3000);
    }
  });
}

// ============================================
// CREATOR MODAL
// ============================================
const creatorBtn = document.getElementById('creatorBtn');
const creatorModal = document.getElementById('creatorModal');
const creatorClose = creatorModal.querySelector('.creator-close');

function openCreatorModal() {
  creatorModal.style.display = 'flex';
  creatorModal.setAttribute('aria-hidden', 'false');
  if (creatorClose) creatorClose.focus();
}

function closeCreatorModal() {
  creatorModal.style.display = 'none';
  creatorModal.setAttribute('aria-hidden', 'true');
  if (creatorBtn) creatorBtn.focus();
}

creatorBtn.addEventListener('click', openCreatorModal);
creatorClose.addEventListener('click', closeCreatorModal);
creatorModal.addEventListener('click', e => {
  if (e.target === creatorModal) closeCreatorModal();
});

document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && creatorModal.style.display === 'flex') closeCreatorModal();
});

// ============================================
// ADMIN DASHBOARD
// ============================================
const adminAccessBtn = document.getElementById('adminAccessBtn');
const adminModal = document.getElementById('adminModal');
const adminClose = adminModal.querySelector('.admin-close');
const adminLoginForm = document.getElementById('adminLoginForm');
const adminMsg = document.getElementById('adminMsg');
const adminTabBtns = document.querySelectorAll('.admin-tab-btn');
const adminPanels = document.querySelectorAll('.admin-panel');
const productForm = document.getElementById('productForm');
const cancelProductBtn = document.getElementById('cancelProductBtn');
const productsList = document.getElementById('productsList');
const inviteEmailInput = document.getElementById('inviteEmailInput');
const inviteBtn = document.getElementById('inviteBtn');
const inviteList = document.getElementById('inviteList');
const inventoryContainer = document.getElementById('inventoryContainer');
const saveInventoryBtn = document.getElementById('saveInventoryBtn');

let adminLoggedIn = false;

function openAdmin() {
  adminModal.style.display = 'flex';
  adminModal.setAttribute('aria-hidden', 'false');
}

function closeAdmin() {
  adminModal.style.display = 'none';
  adminModal.setAttribute('aria-hidden', 'true');
}

adminAccessBtn.addEventListener('click', openAdmin);
adminClose.addEventListener('click', closeAdmin);
adminModal.addEventListener('click', e => {
  if (e.target === adminModal) closeAdmin();
});

// Admin Login
adminLoginForm.addEventListener('submit', e => {
  e.preventDefault();
  const email = document.getElementById('adminEmail').value.trim().toLowerCase();
  const pass = document.getElementById('adminPassword').value;

  // Mock: any admin@midnight.shop password works (for demo)
  if (email === 'admin@midnight.shop' && pass.length >= 6) {
    adminLoggedIn = true;
    adminMsg.classList.add('success');
    adminMsg.textContent = 'Admin login successful!';
    setTimeout(() => {
      showAdminPanel('products');
      adminMsg.classList.remove('success');
    }, 800);
  } else {
    adminMsg.textContent = 'Invalid admin credentials.';
  }
});

function showAdminPanel(panelName) {
  console.log('Showing panel:', panelName);
  
  if (!adminLoggedIn && panelName !== 'login') {
    adminMsg.textContent = 'Please log in first.';
    return;
  }

  // Update tab buttons - make clicked one active
  document.querySelectorAll('.admin-tab-btn').forEach(btn => {
    btn.classList.remove('active');
    if (btn.dataset.panel === panelName) {
      btn.classList.add('active');
    }
  });

  // Hide ALL panels first
  document.getElementById('adminLoginPanel').classList.add('hidden');
  document.getElementById('adminProductsPanel').classList.add('hidden');
  document.getElementById('adminInventoryPanel').classList.add('hidden');
  document.getElementById('adminInventoryVipPanel').classList.add('hidden');
  document.getElementById('adminUsersPanel').classList.add('hidden');
  document.getElementById('adminVipUsersPanel').classList.add('hidden');

  // Show the selected panel
  if (panelName === 'login') {
    document.getElementById('adminLoginPanel').classList.remove('hidden');
  } else if (panelName === 'products') {
    document.getElementById('adminProductsPanel').classList.remove('hidden');
    renderProductsList();
  } else if (panelName === 'inventory') {
    document.getElementById('adminInventoryPanel').classList.remove('hidden');
    renderInventory();
  } else if (panelName === 'inventoryVip') {
    document.getElementById('adminInventoryVipPanel').classList.remove('hidden');
    renderInventoryVip();
  } else if (panelName === 'users') {
    document.getElementById('adminUsersPanel').classList.remove('hidden');
    renderRegularUsers();
  } else if (panelName === 'vipUsers') {
    document.getElementById('adminVipUsersPanel').classList.remove('hidden');
    renderPendingVipRequests();
    renderInviteList();
  }
}

// Tab button click handlers
document.querySelectorAll('.admin-tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    console.log('Tab clicked:', btn.dataset.panel);
    showAdminPanel(btn.dataset.panel);
  });
});

// Image Upload Handler
const prodImageInput = document.getElementById('prodImage');
const imagePreviewContainer = document.getElementById('imagePreviewContainer');
const imagePreview = document.getElementById('imagePreview');
let currentProductImage = null;

prodImageInput.addEventListener('change', e => {
  const file = e.target.files[0];
  if (!file) {
    console.log('❌ No file selected');
    return;
  }

  console.log('📁 File selected:', file.name, '|', (file.size / 1024 / 1024).toFixed(2), 'MB');

  // Check file size (max 2MB)
  if (file.size > 2 * 1024 * 1024) {
    adminMsg.textContent = '❌ Image too large. Max 2MB.';
    adminMsg.style.display = 'block';
    prodImageInput.value = '';
    setTimeout(() => adminMsg.style.display = 'none', 3000);
    return;
  }

  const reader = new FileReader();
  reader.onload = (event) => {
    try {
      currentProductImage = event.target.result;
      console.log('✅ File converted to Base64, length:', currentProductImage.length);
      
      // Get elements
      const previewContainer = document.getElementById('imagePreviewContainer');
      const previewImg = document.getElementById('imagePreview');
      
      console.log('🔍 Container found?', !!previewContainer);
      console.log('🔍 Image element found?', !!previewImg);
      
      if (!previewContainer || !previewImg) {
        console.error('❌ Preview elements not found in DOM!');
        return;
      }
      
      // Set image source and show container
      previewImg.src = currentProductImage;
      previewContainer.style.display = 'block';
      previewContainer.style.visibility = 'visible';
      previewContainer.style.opacity = '1';
      
      console.log('📸 Preview container displayed');
      console.log('📸 Container display:', window.getComputedStyle(previewContainer).display);
      console.log('📸 Container visibility:', window.getComputedStyle(previewContainer).visibility);
    } catch (err) {
      console.error('❌ Error in reader.onload:', err);
    }
  };
  
  reader.onerror = (err) => {
    console.error('❌ FileReader error:', err);
    adminMsg.textContent = '❌ Error loading image.';
    adminMsg.style.display = 'block';
    setTimeout(() => adminMsg.style.display = 'none', 3000);
  };
  
  console.log('📖 Reading file as Data URL...');
  reader.readAsDataURL(file);
});

// Inventory Save Handler
saveInventoryBtn.addEventListener('click', () => {
  const products = getProducts();
  const inputs = document.querySelectorAll('.inventory-input');
  
  inputs.forEach(input => {
    const productId = parseInt(input.dataset.productId);
    const newStock = parseInt(input.value) || 0;
    const product = products.find(p => p.id === productId);
    if (product) {
      product.stock = newStock;
    }
  });
  
  saveProducts(products);
  
  saveInventoryBtn.textContent = '✅ All Changes Saved!';
  saveInventoryBtn.style.borderColor = 'var(--accent)';
  
  setTimeout(() => {
    saveInventoryBtn.textContent = '💾 Save All Changes';
    saveInventoryBtn.style.borderColor = '';
  }, 2000);
});

// VIP Inventory Save Handler
const saveInventoryVipBtn = document.getElementById('saveInventoryVipBtn');
if (saveInventoryVipBtn) {
  saveInventoryVipBtn.addEventListener('click', () => {
    const products = getProducts();
    const inputs = document.querySelectorAll('.inventory-vip-input');
    
    inputs.forEach(input => {
      const productId = parseInt(input.dataset.productId);
      const newStock = parseInt(input.value) || 0;
      const product = products.find(p => p.id === productId);
      if (product) {
        product.stock = newStock;
      }
    });
    
    saveProducts(products);
    
    saveInventoryVipBtn.textContent = '✅ VIP Changes Saved!';
    saveInventoryVipBtn.style.borderColor = 'var(--accent)';
    
    setTimeout(() => {
      saveInventoryVipBtn.textContent = '💾 Save VIP Changes';
      saveInventoryVipBtn.style.borderColor = '';
    }, 2000);
  });
}

function printLabel(productId) {
  const products = getProducts();
  const product = products.find(p => p.id === productId);
  if (product) {
    alert(`📋 Label for: ${product.name}\nStock: ${product.stock || 0} units\nPrice: $${product.price}\n\n(Print functionality can be connected to label printer)`);
  }
}

function restockProduct(productId) {
  const products = getProducts();
  const product = products.find(p => p.id === productId);
  if (product) {
    const currentStock = product.stock || 0;
    const addAmount = prompt(`Add to stock for "${product.name}"\n(Current: ${currentStock} units)\n\nHow many units to add?`, '10');
    if (addAmount && !isNaN(addAmount)) {
      product.stock = currentStock + parseInt(addAmount);
      saveProducts(products);
      renderInventory();
      alert(`✅ Added ${addAmount} units. New stock: ${product.stock}`);
    }
  }
}

// Add Product
cancelProductBtn.addEventListener('click', () => {
  productForm.reset();
  currentProductImage = null;
  imagePreviewContainer.style.display = 'none';
  prodImageInput.value = '';
  document.getElementById('formTitle').textContent = 'Add New Product';
  document.getElementById('productForm').dataset.mode = 'create';
  delete document.getElementById('productForm').dataset.productId;
});

productForm.addEventListener('submit', e => {
  e.preventDefault();
  const products = getProducts();
  const formMode = document.getElementById('productForm').dataset.mode || 'create';
  const productId = parseInt(document.getElementById('productForm').dataset.productId || '0');

  const newProduct = {
    id: formMode === 'edit' ? productId : Math.max(...products.map(p => p.id), 0) + 1,
    name: document.getElementById('prodName').value,
    category: document.getElementById('prodCategory').value,
    price: parseFloat(document.getElementById('prodPrice').value),
    description: document.getElementById('prodDesc').value,
    image: currentProductImage || ''
  };

  if (formMode === 'edit') {
    const index = products.findIndex(p => p.id === productId);
    if (index !== -1) {
      products[index] = newProduct;
    }
  } else {
    products.push(newProduct);
  }

  saveProducts(products);
  adminMsg.classList.add('success');
  adminMsg.textContent = formMode === 'edit' ? 'Product updated successfully!' : 'Product added successfully!';
  
  // Reset form after successful save
  productForm.reset();
  productForm.dataset.mode = 'create';
  delete productForm.dataset.productId;
  document.getElementById('formTitle').textContent = 'Add New Product';
  currentProductImage = null;
  imagePreviewContainer.style.display = 'none';
  
  renderProductsList();
  renderProducts(currentCategory);

  setTimeout(() => adminMsg.classList.remove('success'), 1500);
});

function renderProductsList() {
  const products = getProducts();
  if (!products || products.length === 0) {
    productsList.innerHTML = '<p style="color:var(--muted);text-align:center;padding:20px">No products yet. Fill the form above to create one!</p>';
    return;
  }

  productsList.innerHTML = products.map(p => {
    const imageThumb = p.image && p.image.startsWith('data:') ? p.image : null;
    return `
    <div class="product-item">
      ${imageThumb ? `<img src="${imageThumb}" alt="${p.name}" style="width:100px;height:100px;object-fit:cover;border-radius:6px;border:1px solid rgba(155,60,255,0.15)" />` : '<div style="width:100px;height:100px;background:linear-gradient(135deg,#20123a,#5713a7);border-radius:6px;display:flex;align-items:center;justify-content:center;color:var(--muted);font-size:11px">No Image</div>'}
      <div class="product-item-info">
        <strong style="font-size:16px">${p.name}</strong>
        <p style="color:var(--accent-light);font-weight:700;margin:4px 0">$${p.price.toFixed(2)}</p>
        <p style="color:var(--muted);font-size:12px;margin:4px 0">${p.category.toUpperCase()}</p>
        <p style="color:var(--muted);font-size:12px;margin:4px 0">${p.description.substring(0, 60)}${p.description.length > 60 ? '...' : ''}</p>
      </div>
      <div class="product-item-actions">
        <button class="btn primary" onclick="editProduct(${p.id})" style="padding:8px 12px;font-size:12px">Edit</button>
        <button class="btn outline" onclick="deleteProduct(${p.id})" style="padding:8px 12px;font-size:12px">Delete</button>
      </div>
    </div>
    `;
  }).join('');
}

function editProduct(id) {
  const product = getProducts().find(p => p.id === id);
  if (product) {
    document.getElementById('prodName').value = product.name;
    document.getElementById('prodCategory').value = product.category;
    document.getElementById('prodPrice').value = product.price;
    document.getElementById('prodDesc').value = product.description;
    currentProductImage = product.image;
    
    // Update form title
    document.getElementById('formTitle').textContent = `Edit Product: ${product.name}`;
    
    // Show image preview if exists
    if (product.image && product.image.startsWith('data:')) {
      imagePreview.src = product.image;
      imagePreviewContainer.style.display = 'block';
    } else {
      imagePreviewContainer.style.display = 'none';
    }
    
    // Set form to edit mode
    document.getElementById('productForm').dataset.mode = 'edit';
    document.getElementById('productForm').dataset.productId = id;
    
    // Scroll to form
    document.getElementById('formTitle').scrollIntoView({ behavior: 'smooth', block: 'center' });
    document.getElementById('prodName').focus();
  }
}

function deleteProduct(id) {
  if (confirm('Are you sure you want to delete this product?')) {
    let products = getProducts();
    products = products.filter(p => p.id !== id);
    saveProducts(products);
    renderProductsList();
    renderProducts(currentCategory);
  }
}

function renderInventory() {
  const products = getProducts();
  const noMsg = document.getElementById('noInventoryMsg');
  
  if (!products || products.length === 0) {
    noMsg.style.display = 'block';
    inventoryContainer.innerHTML = '';
    saveInventoryBtn.style.display = 'none';
    return;
  }
  
  noMsg.style.display = 'none';
  saveInventoryBtn.style.display = 'block';
  
  inventoryContainer.innerHTML = products.map(p => {
    const stock = p.stock || 0;
    const isLowStock = stock < 10;
    return `
      <div class="inventory-item" style="display:grid;grid-template-columns:80px 1fr auto;gap:16px;align-items:center;padding:16px;background:rgba(155,60,255,0.05);border:1px solid rgba(155,60,255,0.15);border-radius:8px;${isLowStock ? 'border-left:4px solid #ff6b6b' : ''}">
        <div style="width:80px;height:80px;background:rgba(155,60,255,0.1);border-radius:6px;overflow:hidden;display:flex;align-items:center;justify-content:center;font-size:24px;color:var(--muted)">
          ${p.image && p.image.startsWith('data:') ? `<img src="${p.image}" style="width:100%;height:100%;object-fit:cover">` : '📦'}
        </div>
        
        <div>
          <h4 style="margin:0 0 4px 0;color:white;font-size:16px">${p.name}</h4>
          <p style="margin:0 0 8px 0;color:var(--muted);font-size:12px">Category: ${p.category} | SKU: ${p.id}</p>
          <div style="display:flex;align-items:center;gap:8px">
            <label style="color:var(--muted);font-size:12px">Current Stock:</label>
            <input type="number" min="0" data-product-id="${p.id}" value="${stock}" 
              class="inventory-input"
              style="width:70px;padding:8px;border-radius:4px;border:1px solid rgba(155,60,255,0.3);background:rgba(0,0,0,0.3);color:${isLowStock ? '#ff6b6b' : 'var(--accent)'};text-align:center;font-weight:600;font-size:14px" />
            <span style="color:var(--muted);font-size:12px">units</span>
            ${isLowStock ? `<span style="color:#ff6b6b;font-size:11px;font-weight:600">⚠️ LOW STOCK</span>` : ''}
          </div>
        </div>
        
        <div style="display:flex;flex-direction:column;gap:8px">
          <button class="btn outline" onclick="printLabel(${p.id})" style="padding:6px 12px;font-size:11px;white-space:nowrap">🏷️ Print Label</button>
          <button class="btn ghost" onclick="restockProduct(${p.id})" style="padding:6px 12px;font-size:11px;white-space:nowrap">📮 Request Restock</button>
        </div>
      </div>
    `;
  }).join('');
  
  // Add event listeners to all stock inputs
  document.querySelectorAll('.inventory-input').forEach(input => {
    input.addEventListener('change', markInventoryDirty);
  });
}

function markInventoryDirty() {
  saveInventoryBtn.textContent = '💾 Save Changes (Unsaved!)';
  saveInventoryBtn.style.borderColor = '#ff6b6b';
}

function renderInventoryVip() {
  const products = getProducts().filter(p => p.category === 'vip');
  const noMsg = document.getElementById('noInventoryVipMsg');
  const container = document.getElementById('inventoryVipContainer');
  const saveBtn = document.getElementById('saveInventoryVipBtn');
  
  if (!products || products.length === 0) {
    noMsg.style.display = 'block';
    container.innerHTML = '';
    saveBtn.style.display = 'none';
    return;
  }
  
  noMsg.style.display = 'none';
  saveBtn.style.display = 'block';
  
  container.innerHTML = products.map(p => {
    const stock = p.stock || 0;
    const isLowStock = stock < 10;
    return `
      <div class="inventory-item" style="display:grid;grid-template-columns:80px 1fr auto;gap:16px;align-items:center;padding:16px;background:rgba(155,60,255,0.1);border:2px solid rgba(155,60,255,0.3);border-radius:8px;${isLowStock ? 'border-left:4px solid #ff6b6b' : ''}">
        <div style="width:80px;height:80px;background:rgba(155,60,255,0.15);border-radius:6px;overflow:hidden;display:flex;align-items:center;justify-content:center;font-size:24px;color:var(--accent)">
          ${p.image && p.image.startsWith('data:') ? `<img src="${p.image}" style="width:100%;height:100%;object-fit:cover">` : '👑'}
        </div>
        
        <div>
          <h4 style="margin:0 0 4px 0;color:var(--accent);font-size:16px">👑 ${p.name}</h4>
          <p style="margin:0 0 8px 0;color:var(--muted);font-size:12px">VIP Line | SKU: ${p.id}</p>
          <div style="display:flex;align-items:center;gap:8px">
            <label style="color:var(--muted);font-size:12px">Current Stock:</label>
            <input type="number" min="0" data-product-id="${p.id}" value="${stock}" 
              class="inventory-vip-input"
              style="width:70px;padding:8px;border-radius:4px;border:1px solid rgba(155,60,255,0.5);background:rgba(155,60,255,0.1);color:${isLowStock ? '#ff6b6b' : 'var(--accent)'};text-align:center;font-weight:600;font-size:14px" />
            <span style="color:var(--muted);font-size:12px">units</span>
            ${isLowStock ? `<span style="color:#ff6b6b;font-size:11px;font-weight:600">⚠️ LOW STOCK</span>` : ''}
          </div>
        </div>
        
        <div style="display:flex;flex-direction:column;gap:8px">
          <button class="btn outline" onclick="printLabel(${p.id})" style="padding:6px 12px;font-size:11px;white-space:nowrap">🏷️ Print Label</button>
          <button class="btn ghost" onclick="restockProduct(${p.id})" style="padding:6px 12px;font-size:11px;white-space:nowrap">📮 Request Restock</button>
        </div>
      </div>
    `;
  }).join('');
  
  // Add event listeners to all VIP stock inputs
  document.querySelectorAll('.inventory-vip-input').forEach(input => {
    input.addEventListener('change', () => {
      saveBtn.textContent = '💾 Save VIP Changes (Unsaved!)';
      saveBtn.style.borderColor = '#ff6b6b';
    });
  });
}

function renderRegularUsers() {
  const users = getUsers();
  const invites = getInvites();
  const regularUsers = users.filter(u => !invites.includes(u.email));
  const container = document.getElementById('regularUsersList');
  const noMsg = document.getElementById('noRegularUsersMsg');
  
  if (!regularUsers || regularUsers.length === 0) {
    container.innerHTML = '';
    noMsg.style.display = 'block';
    return;
  }
  
  noMsg.style.display = 'none';
  container.innerHTML = regularUsers.map(user => `
    <li style="display:flex;justify-content:space-between;align-items:center;padding:12px;background:rgba(155,60,255,0.05);border:1px solid rgba(155,60,255,0.1);border-radius:6px">
      <div>
        <strong style="color:white">${user.name}</strong>
        <br>
        <small style="color:var(--muted);font-size:11px">${user.email}</small>
      </div>
      <button class="btn outline" onclick="promoteToVip('${user.email}')" style="padding:6px 12px;font-size:11px">👑 Make VIP</button>
    </li>
  `).join('');
}

function promoteToVip(email) {
  if (confirm(`Promote ${email} to VIP?`)) {
    inviteEmail(email);
    renderRegularUsers();
    renderInviteList();
    updateVIPTabVisibility();
    updateVIPMenuVisibility();
  }
}

function renderPendingVipRequests() {
  const pending = getPendingVipRequests();
  const container = document.getElementById('pendingVipList');
  const noMsg = document.getElementById('noPendingMsg');
  
  if (!pending || pending.length === 0) {
    container.innerHTML = '';
    noMsg.style.display = 'block';
    return;
  }
  
  noMsg.style.display = 'none';
  container.innerHTML = pending.map(email => `
    <li style="display:flex;justify-content:space-between;align-items:center;padding:12px;background:rgba(255,180,0,0.1);border:1px solid rgba(255,180,0,0.2);border-radius:6px">
      <div>
        <strong style="color:#ffb400">${email}</strong>
        <br>
        <small style="color:var(--muted);font-size:11px">Pending Approval</small>
      </div>
      <div style="display:flex;gap:6px">
        <button class="btn primary" onclick="approveVipRequest('${email}')" style="padding:6px 12px;font-size:11px;background:var(--accent)">✅ Approve</button>
        <button class="btn outline" onclick="rejectVipRequest('${email}')" style="padding:6px 12px;font-size:11px">❌ Reject</button>
      </div>
    </li>
  `).join('');
}

function renderInviteList() {
  const list = getInvites();
  const noInvitesMsg = document.getElementById('noInvitesMsg');
  
  if (!list || list.length === 0) {
    inviteList.innerHTML = '';
    noInvitesMsg.style.display = 'block';
    return;
  }
  
  noInvitesMsg.style.display = 'none';
  inviteList.innerHTML = list.map(email => `
    <li style="display:flex;justify-content:space-between;align-items:center;padding:12px;background:rgba(155,60,255,0.05);border:1px solid rgba(155,60,255,0.1);border-radius:6px">
      <div>
        <strong style="color:white">${email}</strong>
        <br>
        <small style="color:var(--muted);font-size:11px">VIP Member</small>
      </div>
      <button class="btn outline" onclick="revokeVIP('${email}')" style="padding:6px 12px;font-size:11px">Revoke Access</button>
    </li>
  `).join('');
}

function revokeVIP(email) {
  if (confirm(`Revoke VIP access for ${email}?`)) {
    revokeEmail(email);
    renderInviteList();
    updateVIPMenuVisibility();
    updateVIPTabVisibility();
  }
}

inviteBtn.addEventListener('click', () => {
  const email = inviteEmailInput.value.trim().toLowerCase();
  if (email) {
    inviteEmail(email);
    inviteEmailInput.value = '';
    renderInviteList();
    updateVIPMenuVisibility();
    updateVIPTabVisibility();
  }
});

// ============================================
// HEADER UPDATE & USER MANAGEMENT
// ============================================
const actions = document.querySelector('.actions');

function updateHeader() {
  const user = currentUser();
  actions.innerHTML = '';

  if (user) {
    const badge = document.createElement('span');
    badge.className = 'user-badge';
    badge.textContent = user.name;

    const vip = document.createElement('button');
    vip.className = 'btn vip';
    vip.textContent = 'VIP Access';
    vip.addEventListener('click', openVIP);

    const logout = document.createElement('button');
    logout.className = 'btn outline';
    logout.textContent = 'Log out';
    logout.addEventListener('click', () => {
      clearSession();
    });

    actions.appendChild(badge);
    actions.appendChild(vip);
    actions.appendChild(logout);
  } else {
    const login = document.createElement('button');
    login.className = 'btn ghost';
    login.textContent = 'Log in';
    login.addEventListener('click', () => openModal('login'));

    const register = document.createElement('button');
    register.className = 'btn outline';
    register.textContent = 'Register';
    register.addEventListener('click', () => openModal('register'));

    const vip = document.createElement('button');
    vip.className = 'btn vip';
    vip.textContent = 'VIP Access';
    vip.addEventListener('click', openVIP);

    actions.appendChild(login);
    actions.appendChild(register);
    actions.appendChild(vip);
  }
}

// ============================================
// DEMO USERS (for testing VIP vs Regular)
// ============================================
function createDemoRegularUser() {
  const demoMsg = document.getElementById('demoRegularMsg');
  const email = 'user@demo.com';
  const password = 'demo123';
  const name = 'Demo User';
  
  // Create user
  const users = getUsers();
  if (!users.find(u => u.email === email)) {
    users.push({ name, email, password });
    saveUsers(users);
  }
  
  // Log them in
  setSession({ name, email });
  
  renderRegularUsers();
  
  demoMsg.textContent = `✅ Regular user created: ${email} / ${password}`;
  demoMsg.classList.add('success');
  demoMsg.style.display = 'block';
  setTimeout(() => {
    demoMsg.classList.remove('success');
    demoMsg.style.display = 'none';
  }, 3000);
}

function createDemoVIPUser() {
  const demoMsg = document.getElementById('demoVipMsg');
  const email = 'vip@demo.com';
  const password = 'demo123';
  const name = 'VIP Demo User';
  
  // Create user
  const users = getUsers();
  if (!users.find(u => u.email === email)) {
    users.push({ name, email, password });
    saveUsers(users);
  }
  
  // Add to VIP list
  inviteEmail(email);
  
  // Log them in
  setSession({ name, email });
  
  renderInviteList();
  
  demoMsg.textContent = `✅ VIP user created: ${email} / ${password} - VIP Status: Active 👑`;
  demoMsg.classList.add('success');
  demoMsg.style.display = 'block';
  setTimeout(() => {
    demoMsg.classList.remove('success');
    demoMsg.style.display = 'none';
  }, 3000);
}

// ============================================
// INITIALIZATION
// ============================================
document.getElementById('year').textContent = new Date().getFullYear();
updateHeader();
updateVIPTabVisibility();
updateVIPMenuVisibility();

// Smooth scroll for nav links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href !== '#' && document.querySelector(href)) {
      e.preventDefault();
    }
  });
});
