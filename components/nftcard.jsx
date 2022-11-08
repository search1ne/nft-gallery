import React from 'react'
import { EtherscanIcon } from "./etherscan-icon"

export const NFTCard = ({ nft }) => {
    var img
    const shortAddress = (address) => {
        return `${address.substring(0, 4)}...${address.substring(address.length - 4)}`
      }

    return (
        <div className="w-1/4 flex flex-col ">
        <div className="rounded-md">
            <img className="object-cover h-128 w-full rounded-t-md" src={nft.media[0].gateway} ></img>
        </div>
        <div className="flex flex-col y-gap-2 px-2 py-3 bg-slate-100 rounded-b-md h-110 ">
            <div className="">
                <h2 className="text-xl text-gray-800">{nft.title}</h2>
                <p className="text-gray-600">NFT Token ID: {shortAddress(nft.id.tokenId)}</p>

                <a target='_blank' href={`https://etherscan.io/address/${nft.contract.address}`} className='flex items-center gap-2' rel="noreferrer">NFT Contract Address: <EtherscanIcon /> {shortAddress(nft.contract.address)}</a>

            </div>
            <hr></hr>
            <div className="flex-grow mt-2">
                <p className="text-gray-600">Description: 
                <br />
                {nft.description}</p>
            </div>
        </div>

    </div>
    )
}