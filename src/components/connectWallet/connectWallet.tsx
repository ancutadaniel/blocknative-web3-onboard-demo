import { useEffect, useState } from 'react';
import { useConnectWallet, useNotifications } from '@web3-onboard/react';
import useConnect from '../hooks/useConnect';
import { Button, Typography, Grid, Avatar } from '@mui/material';
import type { TokenSymbol } from '@web3-onboard/common';

interface Account {
  address: string;
  balance: Record<TokenSymbol, string> | null;
  ens: { name: string | undefined; avatar: string | undefined };
}

export default function ConnectWallet() {
  const [{ wallet, connecting }, connect, disconnect] = useConnectWallet();
  const [
    notifications, // the list of all notifications that update when notifications are added, updated or removed
    customNotification, // a function that takes a customNotification object and allows custom notifications to be shown to the user, returns an update and dismiss callback
    // updateNotify, // a function that takes a Notify object to allow updating of the properties
    // preflightNotifications, // a function that takes a PreflightNotificationsOption to create preflight notifications
  ] = useNotifications();

  const [account, setAccount] = useState<Account | null>(null);

  const { handleConnect, handleDisconnect } = useConnect(
    wallet,
    connecting,
    connect,
    disconnect
  );

  useEffect(() => {
    if (wallet?.provider) {
      const { name, avatar } = wallet?.accounts[0].ens ?? {};
      setAccount({
        address: wallet.accounts[0].address,
        balance: wallet.accounts[0].balance,
        ens: { name, avatar: avatar?.url },
      });
    }
  }, [wallet]);

  const handleNotify = () => {
    customNotification({
      type: 'hint',
      message: 'This is a custom DApp hint notification!',
      autoDismiss: 5000,
    });
  };

  useEffect(() => {
    console.log(notifications);
  }, [notifications]);

  return (
    <Grid container direction='column' className='wallet-container' spacing={2}>
      {wallet?.provider && account ? (
        <>
          {account.ens?.avatar ? (
            <Grid item>
              <Avatar alt='ENS Avatar' src={account.ens?.avatar} />
            </Grid>
          ) : null}
          <Grid item>
            <Typography variant='h6' className='wallet-ens'>
              {account.ens?.name ? account.ens.name : account.address}
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant='body1' className='wallet-label'>
              Connected to {wallet.label}
            </Typography>
          </Grid>
          <Grid item>
            <Button
              variant='outlined'
              color='warning'
              onClick={handleDisconnect.bind(null, wallet)}
            >
              Disconnect
            </Button>
          </Grid>
          <Grid item>
            <Button variant='contained' color='warning' onClick={handleNotify}>
              Custom Notification
            </Button>
          </Grid>
        </>
      ) : (
        <Grid item>
          <Button
            variant='contained'
            color='primary'
            disabled={connecting}
            onClick={handleConnect}
          >
            Connect
          </Button>
        </Grid>
      )}
    </Grid>
  );
}
