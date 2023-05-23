import Onboard from '@web3-onboard/core';
import transactionPreviewModule from '@web3-onboard/transaction-preview';

import wallets from './modules';
import chains from './chains/chains';

const appMetadata = {
  name: 'Web3 Onboard',
  icon: '<svg>My App Icon</svg>',
  logo: '<svg>My App Icon</svg>',
  description: 'Connect a blockchain wallet.',
  recommendedInjectedWallets: [
    { name: 'MetaMask', url: 'https://metamask.io' },
    { name: 'Coinbase', url: 'https://wallet.coinbase.com/' },
  ],
};

const transactionPreview = transactionPreviewModule({
  requireTransactionApproval: false,
});

const onboard = Onboard({
  transactionPreview,
  apiKey: process.env.REACT_APP_ONBOARD_API_KEY,
  theme: 'dark',
  wallets,
  chains,
  appMetadata,
  connect: {
    autoConnectLastWallet: true,
  },
});

export default onboard;
