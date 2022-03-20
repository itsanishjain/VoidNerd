import React, { createContext, useState, useEffect, useRef } from 'react'
import Web3Modal from 'web3modal'
import { toast } from 'react-toastify';

// ethers
import { providers, Contract, utils } from 'ethers'
import { VOIDNERD_CONTRACT_ADDRESS,VOIDNERD_ABI } from '../src/constants';


export const VoidNerdContext = createContext();

export const VoidNerdProvider = ({ children }) => {

  // state variables
  const web3ModalRef = useRef();

  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [account, setAccount] = useState("");
  const [isNetwork, setIsNetwork] = useState(true);
  const [results,setResults] = useState();
  const [getLoading,setGetLoading] = useState(false);


  // helpers

  const checkErrorTypeAndNotify = (error) => {
    console.log("ERRORRRRRRR",error);
    if (error.message.includes("reverted")) {
      toast.error(error.error.message);
    } else if (
      error.message.includes("MetaMask Tx Signature: User denied transaction signature.")
    ) {
      toast.error("Transaction Cancelled");

    } else {
      toast.error(error.message);
    }
  };

  // shorten the address
  const shortenAddress = (address) => {
    return address.substring(0, 6) + "..." + address.substring(address.length - 4);
  };

  const getSigner = async () => {
    const provider = await web3ModalRef.current.connect()

    // Subscribe to accounts change
    provider.on("accountsChanged", (accounts) => {
      if (accounts.length > 0) {
        setAccount(accounts[0])
      }
      else {
        setIsWalletConnected(false);
      }
    });

    // Subscribe to chainId change
    provider.on("chainChanged", (chainId) => {
      if (chainId !== '0x4') {
        toast.error("Please connect to Rinkeby Network")
      }
    });

    const web3Provider = new providers.Web3Provider(provider)
    const { chainId } = await web3Provider.getNetwork()

    if (chainId !== 4) throw new Error('Change network to Rinkeby')

    const signer = web3Provider.getSigner()
    const address = await signer.getAddress()
    setAccount(address);
    return { signer, address }
  }

  const connectWallet = async () => {
    try {
      console.log("Connecting...............")
      const { signer, address } = await getSigner()
      setIsWalletConnected(true);
    } catch (error) {
      checkErrorTypeAndNotify(error)
    }
  }
  
  // get all the NFT of user
  const getOwnerVoidNerd = async () => {
    setGetLoading(true)
    try{
      const { signer,address } = await getSigner();
      const VoidNerdContract = new Contract(VOIDNERD_CONTRACT_ADDRESS,VOIDNERD_ABI,signer);
      const results = await VoidNerdContract.getOwnerVoidNerd(address);
      let parseResults = [];
      for(let i = 0; i<results.length; i++ )
        {
            let obj = {
                id:parseInt(results[i].id),
                name:results[i].name,
                dna:parseInt(results[i].dna),
                rarity:results[i].rarity,
                level:results[i].level
            } 
            parseResults.push(obj);
        }

        setResults(parseResults);
        setGetLoading(false);
      


    }
    catch(error) {
      console.log(error)
      checkErrorTypeAndNotify(error)
    }
  }

  useEffect(() => {
    console.log("Setting up web3 modal")
    web3ModalRef.current = new Web3Modal({
      network: 'rinkeby',
      providerOptions: {}
    })
     connectWallet()
     getOwnerVoidNerd()
  }, [isWalletConnected])

  return (
    <VoidNerdContext.Provider value={{
      isWalletConnected,
      account,
      connectWallet,
      getSigner,
      getOwnerVoidNerd,
      results,
      getLoading,
      shortenAddress,
      checkErrorTypeAndNotify
    }}>
      {children}
    </VoidNerdContext.Provider>
  )
}