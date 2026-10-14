// Rivet reference learned from the Cherry catalogs supplied by the user (K1–K5) plus public listings (RR, EV, SA, BN, TX, MF, NS).
// Cherry data = "catalog" (supplied PDFs). Public-page data = "online". Nothing here is an approval or a documented alternate.
// Retrieved 2026-10-15. Paraphrased, not copied.
window.RIVET_REF = {
 retrieved: "2026-10-15",
 sources: {
  K1:{t:"Cherry CherryLOCK rivets quick card — file Cherry_rivet (All Summary).pdf",u:""},
  K2:{t:"Cherry Nut Plate Rivets CCR244 / 264 / 274 — file Cherry_rivet_2.pdf (CA-1036)",u:""},
  K3:{t:"Cherry 3/32 in SPR self-plugging rivet — file Cherry_rivet_3-32.pdf (CA-1025)",u:""},
  K4:{t:"CherryLOCK ‘A’ rivet, NAS1398 / 1399 — file Cherry_rivet_A_Series.pdf (CA-1023)",u:""},
  K5:{t:"CherryMAX rivet — file Cherry_rivet.pdf (CA-1011)",u:""},
  RR:{t:"Rapid Rivet — solid rivets guide to MS, NAS, BACR and AN families",u:"https://rapidrivet.com/solid-rivets-a-guide-to-ms-and-nas-product-families"},
  EV:{t:"EverySpec — FSC 5320 rivet standards (titles)",u:"https://everyspec.com/FSC-CODE/5320/?page=2"},
  EV2:{t:"EverySpec — FSC 5320 rivet standards, AN123 titles",u:"https://everyspec.com/FSC-CODE/5320/"},
  SA1:{t:"SAE AS9318 — solid rivet, 100° flush head, AMS 7233",u:"https://saemobilus.sae.org/content/as9318/"},
  SA2:{t:"SAE AS9403A — solid rivet, universal head, AMS 5737",u:"https://saemobilus.sae.org/content/AS9403A"},
  BN:{t:"Boeing Distribution — NAS1200-4-11 (100° flush shear head)",u:"https://shop.boeing.com/cpd/bpp_nas1200-4-11"},
  TX:{t:"Textron parts — NAS1200M3-3 (100° countersunk, nickel-copper)",u:"https://ww2.txtav.com/Parts/PartSearch/PartsDetail/NAS1200M3-3"},
  TX2:{t:"Textron parts — NAS1097KE5-8 (100° countersunk, aluminum)",u:"https://ww2.txtav.com/Parts/PartSearch/PartsDetail/NAS1097KE5-8"},
  MF:{t:"Military Fasteners — NAS1199-5-6 (flush head, iron alloy 660)",u:"https://military-fasteners.com/products/nas1199-5-6-solid-rivet"},
  NS:{t:"NSN listing — MS14218AD6-7R (120° flush interference shear head, aluminum 2117)",u:"https://www.nsnsphere.com/nsn/rfq/israel-aerospace-industries-ltd/5320014747398/ms14218ad6-7r/"}
 },
 headNames: {C:"100° countersunk (flush) head",U:"Universal (protruding) head",S:"100° reduced / shear flush head",X:"120° flush head",P:"Pan head",N:"Unisink head"},
 // ---- Cherry catalog tables (K1, K4, K5, K2, K3) ----
 lock: {  // CherryLOCK standard wiredraw (K1). Series 2x62 = countersunk, 2x63 = universal.
  "2162":{h:"C",nas:"NAS1399D",s:"2017 aluminum",t:"7075 aluminum"}, "2163":{h:"U",nas:"NAS1398D",s:"2017 aluminum",t:"7075 aluminum"},
  "2262":{h:"C",nas:"NAS1399B",s:"5056 aluminum",t:"7075 aluminum"}, "2263":{h:"U",nas:"NAS1398B",s:"5056 aluminum",t:"7075 aluminum"},
  "2562":{h:"C",nas:"NAS1399M",s:"Monel",t:"Monel"},            "2563":{h:"U",nas:"NAS1398M",s:"Monel",t:"Monel"},
  "2662":{h:"C",nas:"NAS1399C",s:"A-286 CRES",t:"A-286 soft plug"}, "2663":{h:"U",nas:"NAS1398C",s:"A-286 CRES",t:"A-286 soft plug"}
 },
 bulbed: { // Bulbed CherryLOCK (K1). 2x38 / 2x48 = countersunk, 2x39 / 2x49 = universal.
  "2238":{h:"C",nas:"NAS1739E",s:"5056 aluminum",t:"Inconel 600"}, "2239":{h:"U",nas:"NAS1738E",s:"5056 aluminum",t:"Inconel 600"},
  "2248":{h:"C",nas:"NAS1739B",s:"5056 aluminum",t:"alloy steel"}, "2249":{h:"U",nas:"NAS1738B",s:"5056 aluminum",t:"alloy steel"},
  "2538":{h:"C",nas:"NAS1739M",s:"Monel",t:"Inconel 600"},        "2539":{h:"U",nas:"NAS1738M",s:"Monel",t:"Inconel 600"},
  "2838":{h:"C",nas:"NAS1739C",s:"Inconel 600",t:"A-286 CRES"},   "2839":{h:"U",nas:"NAS1738C",s:"Inconel 600",t:"A-286 CRES"}
 },
 acode: { // CherryLOCK ‘A’ code non-shift (K4). 2x72 = countersunk, 2x73 = universal. Suffix CW / P / S = plating variants.
  "2172":{h:"C",nas:"NAS1399D",s:"2017-T4 aluminum",t:"7075 aluminum",sh:"38,000 psi shear, to 250 °F"},
  "2173":{h:"U",nas:"NAS1398D",s:"2017-T4 aluminum",t:"7075 aluminum",sh:"38,000 psi shear, to 250 °F"},
  "2572":{h:"C",nas:"NAS1399M",s:"Monel",t:"Monel (A-286 also listed)",sh:"55,000 psi shear, to 900 °F"},
  "2573":{h:"U",nas:"NAS1398M",s:"Monel",t:"Monel (A-286 also listed)",sh:"55,000 psi shear, to 900 °F"},
  "2672":{h:"C",nas:"NAS1399C",s:"A-286 CRES",t:"A-286 CRES",sh:"75,000 psi shear, to 1200 °F"},
  "2673":{h:"U",nas:"NAS1398C",s:"A-286 CRES",t:"A-286 CRES",sh:"75,000 psi shear, to 1200 °F"}
 },
 asuffix: {CW:"cadmium plated (NAS …CW)",P:"cadmium plated (NAS …MW)",S:"silver plated (NAS …CS / …MS)"},
 max: { // CherryMAX (K5). CR3 + 3-digit type/material + head digit.
  prefix:{
   "321":{z:"nominal",s:"5056 aluminum",t:"8740 alloy steel"}, "322":{z:"nominal",s:"5056 aluminum",t:"15-7 PH CRES"}, "352":{z:"nominal",s:"Monel",t:"15-7 PH CRES"},
   "324":{z:"oversize",s:"5056 aluminum",t:"8740 alloy steel"}, "325":{z:"oversize",s:"5056 aluminum",t:"15-7 PH CRES"},
   "355":{z:"oversize",s:"Monel",t:"15-7 PH CRES"}, "385":{z:"oversize",s:"Inconel 600",t:"Inconel X-750"}
  },
  head:{"2":["C","100° flush (MS20426 head)"],"3":["U","universal (MS20470 head)"],"4":["S","100° flush shear (NAS1097 head, nominal only)"],"5":["N","unisink (oversize only)"],"6":["X","120° flush (oversize only)"]},
  listed:["3212","3213","3214","3222","3223","3224","3522","3523","3524","3242","3243","3245","3246","3252","3253","3255","3552","3553","3555","3556","3852","3853"],
  sh:{"5056 aluminum":"50,000 psi shear, to 250 °F","Monel":"75,000 psi shear, to 900 °F","Inconel 600":"75,000 psi shear, to 1400 °F"}
 },
 nut: { // Cherry nut plate rivets (K2): CCR + head + material + dia + grip + finish
  heads:{"274":["U","universal (NASM20470 head)"],"264":["C","100° flush (NASM20426 head)"],"244":["S","100° reduced flush (NAS1097 head)"]},
  mat:{CS:{s:"A-286 CRES",t:"305 CRES"},SS:{s:"C1018 steel",t:"carbon steel"}},
  finish:{PR:"passivated",P1:"aluminum coat (NAS4006)",IPR:"cadmium plate, green passivate",RK:"Rivet Kote",T2:"Tiolube 460",XL:"Lubeco 905",ZN:"zinc-nickel plate",C:"cadmium plate",CPR:"cadmium plate, green"}
 },
 holes: {
  lock:{3:"drill #40 · hole .097–.100 in",4:"drill #30 · .129–.132 in",5:"drill #20 · .160–.164 in",6:"drill #10 · .192–.196 in",8:"drill F · .256–.261 in"},
  bulbed:{4:"drill #27 · .143–.146 in",5:"drill #16 · .176–.180 in",6:"drill #5 · .205–.209 in"},
  acode:{3:".097–.101 in",4:".129–.132 in",5:".160–.164 in",6:".192–.196 in",8:".256–.261 in"},
  maxNom:{4:"drill #30 · .129–.132 in",5:"drill #20 · .160–.164 in",6:"drill #10 · .192–.196 in",8:"drill F · .256–.261 in"},
  maxOver:{4:"drill #27 · .143–.146 in",5:"drill #16 · .176–.180 in",6:"drill #5 · .205–.209 in",8:"drill I · .271–.275 in"},
  nut:{3:".097–.101 in",4:".129–.132 in"}, spr:{3:".098–.101 in"}
 },
 tools: {
  lock:"Grip: measure thickness with the 269C3 gage and always read up to the next higher grip number. Hand tools G27 / G29 / G30 (-3), G750A hydraulic; power G746A, G747, G704B with H955 (straight) or H886 (right angle) pulling heads, H9055 side-eject; pneumatic G902 + H902-3NPR / G902-15 + H9015-3C for the -3 size; 1/4 in uses H9044-8.",
  max:"Grip: 269C3 gage, read up. Hole check: T172 go / no-go gage (nominal and oversize). Pulling heads H701B-456 (straight), H753A-456 (right angle), H781-456 / H782 (offset) for 1/8–3/16 in; H744A-8, H84A-8, H827-8, H828-8 for 1/4 in. Tools G27, G800 (hand), G747, G746A, G704B, G83, G84 (power).",
  nut:"Hand G29 (pulling head included; nosepieces 728A9-3 for -3, 728A9-104 for -4); power G902 + H902-3NPR / -4NPR, G902-15 + H9015-3C / -4C, G746A, G702A + H702-3NPR.",
  spr:"Hand G29; G746A / G747 + H747-3NPR; G702A + H702-3NPR; G902 + H902-3NPR; G902-15 + H9015-3C. Removal: knock the stem out with a .062 in pin punch, drill with a #41 (.095 in) bit no deeper than about .030 in, pry the head off with a 3/32 in pin punch, then push the tail out."
 },
 // ---- Solid / other standards (public listings; head and material as stated there) ----
 solid: {
  MS20426:{h:"C",m:"aluminum alloy (AD)",s:["EV","RR"],n:"Superseded by NASM20426."},
  MS20427:{h:"C",m:"Monel (M); the standard title also covers carbon steel, CRES and copper",s:["EV","RR"],n:"Superseded by NASM20427."},
  MS20470:{h:"U",m:"aluminum alloy and titanium-columbium alloy",s:["EV","RR"],n:"Superseded by NASM20470."},
  MS20613:{h:"U",m:"carbon steel and corrosion-resistant steel",s:["EV","RR"],n:"Superseded by NASM20613."},
  MS20615:{h:"U",m:"Monel (M), brass, copper",s:["EV","RR"],n:"Superseded by NASM20615."},
  MS9318:{h:"C",m:"AMS 7233",s:["SA1"],n:"SAE AS9318. The Rapid Rivet text does not say the head style, the SAE title does."},
  MS9403:{h:"U",m:"AMS 5737",s:["SA2"],n:"SAE AS9403A."},
  MS9460:{h:"C",m:"not stated",s:["EV"],n:"Standard title: solid rivet, 100°."},
  MS14218:{h:"X",m:"aluminum 2117 (AD), 7075 (E) or titanium",s:["NS","EV"],n:"120° flush interference shear head with reverse chamfer. A trailing R appears on some P/Ns (not decoded)."},
  MS35743:{h:"P",m:"annealed steel",s:["EV"],n:"Small pan head rivet; MS35744 is the countersunk version, MS35745 the belt rivet."},
  NAS1097:{h:"S",m:"aluminum alloy (AD, KE …)",s:["TX2","RR"],n:"100° reduced / shear flush head."},
  NAS1198:{h:"U",m:"CRES (distributor description)",s:["RR"],n:"Only a distributor description was found."},
  NAS1199:{h:"C",m:"CRES — iron alloy 660 (AMS 5735) on one listing",s:["MF","RR"],n:"Flush (countersunk) head."},
  NAS1200:{h:"S",m:"Monel (M) or CRES / iron alloy (no letter)",s:["BN","TX","RR"],n:"100° flush shear head. A trailing P on one listing is a cadmium-treated variant."},
  BACR15BA:{h:"C",m:"aluminum",s:["RR"],n:"Boeing standard — distributor description."},
  BACR15BB:{h:"U",m:"aluminum",s:["RR"],n:"Boeing standard — distributor description."},
  BACR15CE:{h:"S",m:"aluminum (sometimes Monel)",s:["RR"],n:"Boeing standard, flush shear countersunk head — distributor description."},
  BACR15FT:{h:"U",m:"aluminum",s:["RR"],n:"Boeing standard, modified universal head — distributor description."},
  AN123:{h:"?",m:"see number range",s:["EV2","RR"],n:"AN123151–AN123300 = universal head (AMS 7229); AN123601–AN123750 = 100° flush head (AMS 7232), per the standard titles. Rapid Rivet lists AN123 / AN124 / AN125 as separate families (universal / countersunk / universal, CRES). Check the exact number."}
 },
 // ---- Same head shape, different rivet kind (solid ↔ blind) ----
 headGroups: [
  {h:"C",label:"100° countersunk (flush) head",
   solid:[["MS20426","aluminum"],["MS20427","Monel"],["MS9318 / MS9460","per standard"],["NAS1199","CRES"],["AN123601–750","flush range"]],
   blind:[["CR2162 / 2262 / 2562 / 2662","CherryLOCK, NAS1399"],["CR2172 / 2572 / 2672","CherryLOCK ‘A’, NAS1399"],["CCR264","nut plate, NASM20426 head"],["CherryMAX 100° flush","MS20426 head"],["CR1122-3","3/32 SPR, BACR15GR"]]},
  {h:"U",label:"Universal (protruding) head",
   solid:[["MS20470","aluminum / titanium"],["MS20613","steel / CRES"],["MS20615","Monel / copper / brass"],["MS9403","AMS 5737"],["NAS1198","CRES"],["AN123151–300","universal range"]],
   blind:[["CR2163 / 2263 / 2563 / 2663","CherryLOCK, NAS1398"],["CR2173 / 2573 / 2673","CherryLOCK ‘A’, NAS1398"],["CCR274","nut plate, NASM20470 head"],["CherryMAX universal","MS20470 head"]]},
  {h:"S",label:"100° reduced / shear flush head",
   solid:[["NAS1097","aluminum"],["NAS1200","Monel / CRES"],["BACR15CE","aluminum / Monel"]],
   blind:[["CCR244","nut plate, NAS1097 head"],["CherryMAX NAS1097 (CR3214 / 3224 / 3524)","nominal only"]]},
  {h:"X",label:"120° flush head",
   solid:[["MS14218","aluminum / titanium"]],
   blind:[["CherryMAX 120° (CR3246 / 3556)","oversize only"]]}
 ],
 warn: "Cherry’s catalogs warn that blind rivets are not always a suitable substitute for solid rivets, and quote FAA AC 43.13-1A: do not replace solid rivets with hollow ones in load-carrying members without approval of the application. Cherry also says to consult the aircraft OEM for CherryMAX. Same head shape does not make two rivets interchangeable — the drawing / manual decides."
};
