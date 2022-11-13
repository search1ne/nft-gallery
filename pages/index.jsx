import { NFTCard } from '/components/nftcard';
import { Button } from '/components/button'
import { useState } from 'react';

const apiKey = process.env.NEXT_PUBLIC_ALCHEMY_API;
const baseURL = `https://eth-mainnet.g.alchemy.com/nft/v2/${apiKey}`;

const Home = () => {
  const [wallet, setWalletAddress] = useState("stringstory.eth");
  const [collection, setCollectionAddress] = useState("");
  const [NFTs, setNFTs] = useState([]);
  const [fetchForCollection, setFetchForCollection] = useState(false);
  const [nextPage, setNextPage] = useState(null);

  // Function to fetch NFTs by owner using Alchemy's NFT endpoint
  const fetchNFTs = async () => {
    let nfts;
    var requestOptions = {
      method: 'GET'
    };
    
    if(!collection.length) {
      const fetchURL = `${baseURL}/getNFTs?owner=${wallet}`
      nfts = await fetch(fetchURL, requestOptions).then(data => data.json());
    } else {
      console.log("fetching nfts owned by address by collection");
      const fetchURL = `${baseURL}/getNFTs?owner=${wallet}&contractAddresses%5B%5D=${collection}`;
      nfts = await fetch(fetchURL, requestOptions).then(data => data.json());
    }

    if (nfts) {
      console.log("NFTs:", nfts);
      setNFTs(nfts.ownedNfts);
    }
  }

  // Function to fetch NFTs by Collection using Alchemy's NFT endpoint
  const fetchNFTsForCollection = async () => {
    if (collection.length) {
      var requestOptions = {
        method: 'GET'
      };

      const fetchURL = `${baseURL}/getNFTsForCollection?contractAddress=${collection}&withMetadata=${"true"}`; 
      const nfts = await fetch(fetchURL, requestOptions).then(data => data.json())
      if (nfts) {
        console.log("NFTs in collection:", nfts)
        setNFTs(nfts.nfts)
      }
    }
  }

  // Function for Next pages with collections over 100 NFTs
    const handleChangePage = async () => {
      const fetchURL = `${baseURL}/getNFTs?owner=${wallet}&pageKey=${nextPage}`; // make sure it points to the correct URL endpoint
      const { ownedNfts, pageKey } = await fetch(fetchURL).then(data => data.json());
      setNextPage(pageKey);
      setNFTs(ownedNfts);
    }

    return (
      <div>

        <div className="flex flex-col w-full justify-center items-center gap-y-5">
          <h1>My NFT Gallery</h1>
        </div>

        <div className="flex flex-col w-full justify-center items-center gap-y-2">
        <input 
            onChange={ (e) => {setWalletAddress(e.target.value)} }
            value={wallet}
            type="text" 
            id="wallet" 
            disabled={fetchForCollection}
            className="border-b py-1 focus:outline-none focus:border-purple-600 focus:border-b-2 transition-colors peer"> 
        </input>
            <label 
                for="wallet"
                className="top-1 text-gray-600 cursor-text peer-focus:text-xs peer-focus:-top-4 peer-focus:text-purple-600 transition-all">Wallet Address / ENS
            </label>

        <input 
            onChange={ (e) => {setCollectionAddress(e.target.value)} } 
            value={collection} 
            type={"text"} 
            id="collection" 
            className="border-b py-1 focus:outline-none focus:border-purple-600 focus:border-b-2 transition-colors peer"> 
        </input>
        <label 
            for="collection"
            className="left-0 text-gray-600 cursor-text peer-focus:text-xs peer-focus:-top-4 peer-focus:text-purple-600 transition-all">NFT Collection (optional)
        </label>
        <label 
          for ="checkbox">
        <input 
            onChange={ (e) => {setFetchForCollection(e.target.checked)} } 
            type={"checkbox"} 
            id="checkbox"
            className="mr-2">
        </input>
        Fetch for collection
        </label>
        
        <button 
          className={"disabled:bg-slate-50 text-white bg-purple-400 px-4 mt-3 rounded-md w-1/6"} 
          onClick={ () => {
                  if (fetchForCollection) {
                  fetchNFTsForCollection()
              } else fetchNFTs()
            }
          }>LFL!</button>

      </div>

      <div className='flex justify-center mb-4'>
      <svg onClick={handleChangePage} className='w-1/6' width="30" height="30" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" /></svg>
      </div>

      <div className='flex flex-wrap gap-y-12 mt-4 w-5/6 gap-x-2 justify-center'>
        {
          NFTs.length > 0 && NFTs.map(nft => {
            return (
              <NFTCard nft={nft}></NFTCard>
            )
          })
        }
      </div>

    </div>
    )
}

export default Home
