"use client"
export async function connectMetaMask() {
    if (typeof window.ethereum !== 'undefined') {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      return accounts[0]; 
    } else {
      throw new Error('MetaMask is not installed!');
    }
  }
  
  