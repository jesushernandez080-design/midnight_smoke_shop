// DIAGNOSTIC SCRIPT - Paste in browser console (F12) to check if Admin Dashboard works

console.log('=== MIDNIGHT SMOKE SHOP - ADMIN DIAGNOSTIC ===\n');

// Check if HTML elements exist
const checks = {
  'Admin Button': document.getElementById('adminAccessBtn'),
  'Admin Modal': document.getElementById('adminModal'),
  'Admin Login Form': document.getElementById('adminLoginForm'),
  'Admin Tabs': document.querySelectorAll('.admin-tab-btn').length,
  'Admin Panels': document.querySelectorAll('.admin-panel').length,
  'Inventory Container': document.getElementById('inventoryContainer'),
  'Inventory Save Button': document.getElementById('saveInventoryBtn'),
  'Products List': document.getElementById('productsList'),
  'VIP Invite List': document.getElementById('inviteList'),
};

console.log('🔍 ELEMENT CHECKS:');
Object.entries(checks).forEach(([name, element]) => {
  const status = element ? '✅' : '❌';
  const value = typeof element === 'number' ? element : (element ? 'Found' : 'MISSING');
  console.log(`${status} ${name}: ${value}`);
});

// Check if JavaScript functions exist
console.log('\n🔧 FUNCTION CHECKS:');
const functions = {
  'openAdmin': typeof openAdmin,
  'closeAdmin': typeof closeAdmin,
  'showAdminPanel': typeof showAdminPanel,
  'renderInventory': typeof renderInventory,
  'renderProductsList': typeof renderProductsList,
  'renderInviteList': typeof renderInviteList,
};

Object.entries(functions).forEach(([name, type]) => {
  const status = type === 'function' ? '✅' : '❌';
  console.log(`${status} ${name}: ${type === 'function' ? 'Defined' : 'MISSING'}`);
});

// Check localStorage
console.log('\n💾 STORAGE CHECKS:');
console.log('✅ Products in localStorage:', localStorage.getItem('mns_products') ? 'Yes' : 'No');
console.log('✅ Users in localStorage:', localStorage.getItem('mns_users') ? 'Yes' : 'No');
console.log('✅ Current session:', localStorage.getItem('mns_session') ? 'Yes' : 'No');

// Test Admin Button Click
console.log('\n🧪 TESTING...');
console.log('Try clicking the Admin button. The modal should open.');
console.log('Then login with: admin@midnight.shop + any password (6+ chars)');
console.log('\nIf nothing happens after clicking Admin:');
console.log('1. Right-click > Inspect Element on the Admin button');
console.log('2. Check if there are JavaScript errors in the console');
console.log('3. Try manually running: openAdmin()');

// Manual test function
window.testAdmin = function() {
  console.log('🧪 Manual Admin Test...');
  if (typeof openAdmin === 'function') {
    openAdmin();
    console.log('✅ Admin modal should be opening now!');
  } else {
    console.log('❌ openAdmin function not found!');
  }
};

console.log('\n💡 TIP: Run window.testAdmin() to open Admin modal manually');
console.log('\n=== END DIAGNOSTIC ===');
