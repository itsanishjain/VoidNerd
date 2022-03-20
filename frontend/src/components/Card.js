import {useState,useEffect,useContext} from "react";
import { Contract, utils } from 'ethers'

import {VoidNerdContext} from '../../context/VoidNerd'
import {VOIDNERD_CONTRACT_ADDRESS,VOIDNERD_ABI} from '../src/constants';




export default function Card({ name, designation, imageUrl }) {

  const {getSigner} = useContext(VoidNerd);
  
  const [getLoading,setGetLoading] = useState(false);
  const [mintLoading,setMintLoading] = useState(false);




  // Create the Void Nerd NFT
  const createRandomVoidNerd = async (_name) => {
    mintLoading(true);
    const { signer } = await getSigner();
    const voidNerdContract = new Contract(VOIDNERD_CONTRACT_ADDRESS,VOIDNERD_ABI,signer)
    const tx = await voidNerdContract.createRandomVoidNerd(_name);
    await tx.wait();
    setMintLoading(false);
  }

  // get all the NFT of user

  const getOwnerVoidNerd = async (owner) => {
    try{
      const {signer} = await getSigner();
      const VoidNerdContract = new Contract(VOIDNERD_CONTRACT_ADDRESS,VOIDNERD_ABI,signer);
      const tx = await VoidNerdContract.getOwnerVoidNerd(owner);
      await tx.wait();
    }
    catch(error) {

    }
  }





  useEffect(()=>{

    console.log("Getting Your NFTs")
  },[])

  return (
    <>
      <div className="max-w-lg mx-auto mt-8 space-y-2 p-8 bg-gradient-to-tr from-indigo-500 to-indigo-900 rounded-lg shadow-md shadow-slate-300 sm:flex items-center sm:py-4 sm:space-x-6">
        <img
          src={imageUrl}
          className=" mx-auto w-24 h-48 rounded-full sm:mx-0 sm:shrink-0"
          alt="logo"
        />

        <div className="text-center">
          <div className="space-y-0.5">
            <p className="text-xl font-semibold text-blue-200  ">{name}</p>
            <p className="text-slate-100 font-medium text-md">{designation}</p>
          </div>
        </div>
      </div>
    </>
  );
}
