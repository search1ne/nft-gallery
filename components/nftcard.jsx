export const NFTCard = ({ nft }) => {

    return (
        <div className="w-1/4 flex flex-col">
        <div className="rounded-md">
            <img className="object-cover h-200 w-full rounded-t-md" src={nft.media[0].gateway} ></img>
        </div>
        <div className="flex flex-col y-gap-2 px-2 py-3 bg-slate-100 rounded-b-md h-110  backdrop-blur-xl">
            <div className="">
                <h2 className="text-xl text-gray-800">{nft.title}</h2>
                <p className="text-gray-600">
                    <svg onClick={() => {navigator.clipboard.writeText(nft.contract.address)}}
                    className="h-8 w-8 text-teal-500"  width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <rect x="8" y="8" width="12" height="12" rx="2" />  <path d="M16 8v-2a2 2 0 0 0 -2 -2h-8a2 2 0 0 0 -2 2v8a2 2 0 0 0 2 2h2" /></svg>
                Copy NFT contract Address</p>
            </div>

        </div>

    </div>
    )
}
