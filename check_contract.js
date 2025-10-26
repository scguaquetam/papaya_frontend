const { ethers } = require('ethers');

// The pay function signature from the contract
const iface = new ethers.Interface([
  'function pay(address paymentToken, uint256 amount, address payee) payable'
]);

console.log('Function selector:', iface.getFunction('pay').selector);
