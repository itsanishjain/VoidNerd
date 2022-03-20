
import { parts } from "../parts/parts";
import _r1 from "../assets/images/rarity/_rarity_1.png";
import _r2 from "../assets/images/rarity/_rarity_2.png";
import _r3 from "../assets/images/rarity/_rarity_3.png";

const VoidNerd = ({ voidNerd = null, size = 200, style }) => {

  console.log(voidNerd);

  if (!voidNerd) {
    return null;
  }
  let rarity = _r1;

  if (voidNerd.rarity >= 80) {
    rarity = _r2;
  }
  if (voidNerd.rarity >= 95) {
    rarity = _r3;
  }

  let dnaStr = String(voidNerd.dna);

  

  while (dnaStr.length < 16) 
  dnaStr = "0" + dnaStr;
  let voidNerdDeatils = {
    bg: dnaStr.substring(0, 2) % 5,
    mask: dnaStr.substring(2, 4) % 5,
    line: dnaStr.substring(4, 6) % 5,
    addon: dnaStr.substring(6, 8) % 5,
    addonMouth1: dnaStr.substring(8, 10) % 5,
    addonMouth2: dnaStr.substring(10, 12) % 5,
    addonMouth3: dnaStr.substring(12, 14) % 5,
    name: voidNerd.name,
  };

  const voidNerdStyle = {
    width: "50%",
    height: "50%",
    position: "absolute",
  };

  return (
    <div
      style={{
        minWidth: size,
        minHeight: size,
        background: "blue",
        position: "relative",
        ...style,
      }}
    >

    
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
      <img alt={"rarity"} src={rarity.src} style={voidNerdStyle} />
    </div>
  );
};

export default VoidNerd;