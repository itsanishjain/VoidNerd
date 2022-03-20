import { parts } from "../parts/parts";
import _r1 from "../assets/images/rarity/_rarity_1.png";
import _r2 from "../assets/images/rarity/_rarity_2.png";
import _r3 from "../assets/images/rarity/_rarity_3.png";


export default function NFTCard({ id, name, dna, rarity, level }) {

  // Creating images using items'dna

  if (!dna) return null;
  let rare = _r1;


  if (rarity >= 80) rare = _r2;

  if (rarity >= 95) rare = _r3;

  let dnaStr = dna.toString();

  while (dnaStr.length < 16) dnaStr = "0" + dnaStr;

  let voidNerdDeatils = {
    bg: dnaStr.substring(0, 2) % 5,
    mask: dnaStr.substring(2, 4) % 5,
    line: dnaStr.substring(4, 6) % 5,
    addon: dnaStr.substring(6, 8) % 5,
    addonMouth1: dnaStr.substring(8, 10) % 5,
    addonMouth2: dnaStr.substring(10, 12) % 5,
    addonMouth3: dnaStr.substring(12, 14) % 5,
    name: name,
  };


  const voidNerdStyle = {
    width: "100%",
    height: "100%",
    position: "absolute"
  };



  return (
    <div>
      <div className="mt-8 max-w-sm mx-auto shadow-lg shadow-orange-200">
        <div className="bg-gradient-to-r from-orange-200 to-orange-400  rounded-lg">
          <div className="flex justify-between p-4 border-fuchsia-500 ">
            <p className="font-semibold text-lg">{name.toUpperCase()}</p>
            <div className="flex flex-col items-center">
              <p className="font-medium text-lg">{dna}</p>
              <p className="font-semibold text-md">rarity:{rarity}</p>
            </div>
          </div>

          <div className="h-64 w-full relative">
            <img alt={"bg"} src={parts.bg[voidNerdDeatils.bg].src} style={voidNerdStyle} />
            <img alt={"mask"} src={parts.mask[voidNerdDeatils.mask].src} style={voidNerdStyle} />
            <img alt={"line"} src={parts.line[voidNerdDeatils.line].src} style={voidNerdStyle} />
            <img alt={"addon"} src={parts.addon[voidNerdDeatils.addon].src} style={voidNerdStyle} />
            <img
              alt={"addon_mouth"}
              src={parts.addonMouth1[voidNerdDeatils.addonMouth1].src}
              style={voidNerdStyle}
            />
            <img
              alt={"addon_mouth"}
              src={parts.addonMouth2[voidNerdDeatils.addonMouth2].src}
              style={voidNerdStyle}
            />
            <img
              alt={"addon_mouth"}
              src={parts.addonMouth3[voidNerdDeatils.addonMouth3].src}
              style={voidNerdStyle}
            />
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
