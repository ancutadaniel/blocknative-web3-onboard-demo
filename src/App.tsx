import { Container, Typography, Box } from '@mui/material';
import { Web3OnboardProvider } from '@web3-onboard/react';
import onboard from './web3Onboard/web3Onboard';
import ConnectWallet from './components/connectWallet/connectWallet';

const App = () => {
  return (
    <Container maxWidth='md'>
      <Web3OnboardProvider web3Onboard={onboard}>
        <Box sx={{ my: 4 }}>
          <Typography variant='h2' component='h1' gutterBottom>
            Blocknative Web3 Onboard Demo
          </Typography>
          <Typography variant='body1' gutterBottom>
            Blocknative is a service that provides real-time notifications of
            Ethereum transactions.
          </Typography>
          <ConnectWallet />
        </Box>
      </Web3OnboardProvider>
    </Container>
  );
};

export default App;
