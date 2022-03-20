export default function NFTCard ({id,name,dna,rarity,level}) {
  return (
    <div>
      <div className="mt-8 max-w-sm mx-auto">
      <div className="bg-gradient-to-r from-orange-200 to-orange-400  rounded-lg">
        <div className="flex justify-between p-4 border-fuchsia-500 ">
          <p className="font-semibold text-lg">{name.toUpperCase()}</p>
          <div className="flex flex-col items-center">
          <p className="font-medium text-lg">{dna}</p>
          <p className="font-semibold text-md">rarity:{rarity}</p>
          </div>
        </div>
        
        <div className="flex justify-between p-4">
          <p className="font-semibold text-xl">#{id}</p>
          <p className="font-semibold text-md">level-{level}</p>
        </div>
        <p className="font-semibold text-center text-2xl pb-2">Void Nerd</p>
      </div>
    </div>
      </div>
  );
}
