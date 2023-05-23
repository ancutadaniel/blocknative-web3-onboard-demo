import { useCallback } from 'react';
import {
  ConnectOptions,
  DisconnectOptions,
  WalletState,
} from '@web3-onboard/core';

const useConnect = (
  wallet: WalletState | null,
  connecting: boolean,
  connect: (options?: ConnectOptions | undefined) => Promise<WalletState[]>,
  disconnect: (wallet: DisconnectOptions) => Promise<WalletState[]>
) => {
  const handleConnect = useCallback(async () => {
    if (!connecting) {
      try {
        await connect();
      } catch (error) {
        console.error('Error while connecting: ', error);
      }
    }
  }, [connect, connecting]);

  const handleDisconnect = useCallback(async () => {
    if (!connecting) {
      try {
        await disconnect({ label: wallet!.label });
      } catch (error) {
        console.error('Error while disconnecting: ', error);
      }
    }
  }, [disconnect, connecting, wallet]);

  return { handleConnect, handleDisconnect };
};

export default useConnect;
