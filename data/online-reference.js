// Internet-researched reference for rivet / plate nut P/N naming. NOT from the uploaded workbooks and NOT approvals.
// Collected 2026-10-12 from distributor / standards listings (links below). Used only for hints in the
// Material & Alternate Finder; every statement here is a paraphrase of what the linked page shows.
window.ONLINE_REF = {
 retrieved: "2026-10-12",
 sources: {
  S1:{t:"Military Fasteners — CR2663-4-4 (lists NAS1398C4-4 and CR2663-4-04 as alternate P/Ns)",u:"https://www.military-fasteners.com/rivets/blind+rivets/CR2663-4-4"},
  S2:{t:"SkyGeek — CR2663-4-08 (universal head, 1/8 in, grip .438–.500 in, NAS1400)",u:"https://www.skygeek.com/cherry-aerospace-cr2663-4-8-blind-rivet.html"},
  S3:{t:"Boeing Distribution — CR2662-3-3 (countersunk, 3/32 in, grip .126–.187 in; NAS1400, NAS1398/1399 pages)",u:"https://shop.boeing.com/aviation-supply/p/CR2662-3-3=29"},
  S4:{t:"NSN Sourcing — NSN 5320-00-435-5347: CR2663-8-4 and NAS1398C8-4 (head style universal)",u:"https://www.nsn-sourcing.com/nato/nato-parts/5320004355347/"},
  S5:{t:"Boeing Distribution — CCR264CS3-04 (pull-through nut plate rivet, flush, grip .188–.25 in; MS20604/MS20605, NASM25027)",u:"https://shop.boeing.com/aviation-supply/p/CCR264CS3-04=29"},
  S6:{t:"SkyGeek — CCR264-CS-3-04 (CRES, 100° flush head nut-plate rivet)",u:"https://skygeek.com/cherry-aerospace-ccr264cs3-04-rivet-blind-flush-hd-cres.html"},
  S7:{t:"SkyGeek — CCR264-SS-3-03 (steel, 3/32 in, grip .126–.187 in)",u:"https://skygeek.com/cherry-aerospace-ccr264ss3-03-rivet-blind-flush-hd-st-100pk.html"},
  S8:{t:"Boeing Distribution — CCR264CS3-2PR (its “Potential Alternates” field lists ABS0112-24-02T)",u:"https://shop.boeing.com/cpd/bdsis4_ccr264cs3-2pr"},
  S9:{t:"Bombardier PPS 2.63 — nut plate blind rivets (CCR264 superseded by BACR15DR, then MS20605; not interchangeable when a drawing specifies one)",u:"https://supplier.aero.bombardier.com/DHC_isupply/dh/PPS/0263PPS.pdf"},
  S10:{t:"Univair — MS20427M3-3 (100° countersunk, Monel, 3/16 in long, 3/32 in dia)",u:"https://univair.com/hardware/rivets/view-all-rivets/ms20427m3-3-100-degree-countersunk-rivet"},
  S11:{t:"Univair — MS20427M3-3-5 (7/32 in long: “-3-5” is a half step)",u:"https://univair.com/hardware/rivets/view-all-rivets/ms20427m3-3-5-100-degree-countersunk-rivet"},
  S12:{t:"Boeing Distribution — MS20426AD3-6 (3/32 in dia, 3/8 in long, aluminum, countersunk 100°)",u:"https://shop.boeing.com/cpd/bdi_ms20426ad3-6%3D28"},
  S13:{t:"Military Fasteners — MS20427M3-6 page (also shows MS20615-4M5: 1/8 in, 5/16 in long, universal head, Monel)",u:"https://www.military-fasteners.com/rivets/solid+rivets/MS20427M3-6"},
  S14:{t:"EverySpec — FSC 5320 standards list (MS20426 / MS20427 countersunk, MS20470 / MS20615 universal head; later NASM versions)",u:"https://everyspec.com/FSC-CODE/5320/?page=2"},
  S15:{t:"Military Fasteners — BACN10JR3CF nutplate (10-32, nut length 15/16 in)",u:"https://www.military-fasteners.com/nuts/self_locking+nutplates/BACN10JR3CF"},
  S16:{t:"Military Fasteners — BACN10JR3R (mounting hole dia .098–.103 in, hole C-C .686–.690 in)",u:"https://military-fasteners.com/nuts/clip_on nuts/bacn10jr3r"},
  S17:{t:"Boeing Distribution — MS21076-3N self-locking plate nut (32 tpi, floating)",u:"https://shop.boeing.com/cpd/bdsis4_ms21076-3n"}
 },
 families: {
  CR2663:{name:"Cherry wiredraw blind rivet — universal head",kind:"Blind",head:"Universal head",std:"NAS1398 standard page; NAS1400 procurement spec",src:["S1","S2","S4"],
          note:"Last two numbers: diameter in 1/32 in, then grip code in 1/16 in (−4 = 1/8 in dia). Series digits 21/22/25/26 (material / strength variant) are not decoded."},
  CR2662:{name:"Cherry wiredraw blind rivet — countersunk (flush) head",kind:"Blind",head:"Flush (countersunk) head",std:"NAS1399 standard page; NAS1400 procurement spec",src:["S3"],
          note:"Same size / grip coding as CR2663 (−3 = 3/32 in dia; grip code −3 = .126–.187 in). Series digits are not decoded."},
  NAS1398:{name:"NAS1398 blind rivet — universal head",kind:"Blind",head:"Universal head",std:"NAS1398",src:["S1","S4"],
          note:"Letter after the number (e.g. C) is a material / type code and is not decoded here. NAS1398C4-4 is listed online as an alternate P/N of CR2663-4-4."},
  NAS1399:{name:"NAS1399 blind rivet — flush head",kind:"Blind",head:"Flush (countersunk) head",std:"NAS1399",src:["S3"],
          note:"Letters / dimension codes are not decoded here."},
  CCR264:{name:"Cherry pull-through (hollow) nut plate rivet — 100° flush head",kind:"Blind",head:"Flush (100° countersunk) head",std:"NASM25027 nut plates; MS20604 / MS20605",src:["S5","S6","S7","S9"],
          note:"CS / SS letters: listings call CS corrosion-resistant steel and SS steel; one distributor page lists a carbon-steel body with stainless sleeve, so verify the material. Superseded by BACR15DR, then MS20605 — Bombardier PPS 2.63 says they are not interchangeable when the drawing names one."},
  ABS0112:{name:"ABS0112 rivet (meaning not identified online)",kind:"Blind (per source grouping)",head:"Flush (per source grouping)",std:"—",src:["S8"],
          note:"No public description of the ABS0112-24 naming was found. Boeing's “Potential Alternates” field for CCR264CS3-02PR lists ABS0112-24-02T. The suffix letters (T / C) are not decoded."},
  MS20427:{name:"MS20427 solid rivet — 100° countersunk head, Monel",kind:"Solid",head:"Flush (100° countersunk) head",std:"MS20427 (later NASM20427)",src:["S10","S11","S13","S14"],
          note:"MS20427M<dia>-<length>: dia in 1/32 in, length in 1/16 in. A trailing “-5” is a half step (−3-5 = 3.5/16 = 7/32 in). M = Monel (nickel-copper); the Repair Note workbook calls it “Nickel”."},
  MS20426:{name:"MS20426 solid rivet — 100° countersunk head, aluminum",kind:"Solid",head:"Flush (100° countersunk) head",std:"MS20426 (later NASM20426)",src:["S12","S14"],
          note:"MS20426AD<dia>-<length>: dia in 1/32 in, length in 1/16 in; a trailing “-5” is a half step. AD = aluminum alloy."},
  MS20615:{name:"MS20615 solid rivet — universal head, Monel",kind:"Solid",head:"Universal head",std:"MS20615 (later NASM20615)",src:["S13","S14"],
          note:"MS20615-<dia>M<length>: dia in 1/32 in, length in 1/16 in (−5M5 = 5/32 in dia, 5/16 in long). M = Monel (nickel-copper)."}
 },
 // P/Ns seen listed on the distributor pages above while researching (normalised, leading zeros dropped). Not a catalogue.
 seen: ["CR2663-3-4","CR2663-4-4","CR2663-4-8","CR2663-5-3","CR2663-8-4","CR2662-3-3","CR2662-6-10",
        "CCR264CS3-1","CCR264CS3-2","CCR264CS3-3","CCR264CS3-4","CCR264CS3-5","CCR264CS3-6","CCR264CS3-7","CCR264CS4-3","CCR264CS4-5","CCR264CS4-7",
        "CCR264SS3-1","CCR264SS3-2","CCR264SS3-3","CCR264SS3-4","CCR264SS3-8",
        "MS20427M3-2","MS20427M3-3","MS20427M3-3-5","MS20427M3-4","MS20427M3-5","MS20427M3-6","MS20427M3-7","MS20427M3-10","MS20427M4-5","MS20427M5-3","MS20427M6-5",
        "MS20426AD3-3","MS20426AD3-3-5","MS20426AD3-4","MS20426AD3-5","MS20426AD3-6","MS20426AD3-10","MS20615-4M5","MS20615-4M6"],
 xref: [
  {a:"CR2663-4-4",b:"NAS1398C4-4",note:"Listed together as alternate part numbers on a distributor page (CR2663-4-04 is the zero-padded form of the same P/N).",s:"S1"},
  {a:"CR2663-8-4",b:"NAS1398C8-4",note:"Listed under the same NSN (5320-00-435-5347) with universal head style.",s:"S4"},
  {a:"CCR264CS3-02PR",b:"ABS0112-24-02T",note:"Boeing's “Potential Alternates” field for CCR264CS3-02PR (it also lists CR264CS-3-02PR and NTA12350-3A2).",s:"S8"},
  {a:"CCR264",b:"BACR15DR → MS20605",note:"CCR264 was superseded by BACR15DR, which was in turn replaced by MS20605. Not interchangeable when the drawing specifies a particular one.",s:"S9"}
 ],
 funcs: [
  {id:"blind-flush-nutplate",label:"Blind · flush head · nut plate (pull-through) rivets",fams:["CCR264","ABS0112"],
   members:[
    {n:"CCR264 (CS / SS)",note:"Cherry pull-through nut plate rivet, 100° flush.",s:"S5"},
    {n:"ABS0112-24",note:"Listed by Boeing as a potential alternate of CCR264CS3-02PR; also listed with CCR264CS3-04 in the Repair Note workbook.",s:"S8"},
    {n:"MS20605",note:"Replacement for BACR15DR and CCR264 per Bombardier PPS 2.63 — verify which one the drawing calls for.",s:"S9"}]},
  {id:"blind-universal",label:"Blind · universal head · locked-spindle rivets",fams:["CR2663","NAS1398"],
   members:[
    {n:"CR2663",note:"Cherry wiredraw, universal head.",s:"S2"},
    {n:"NAS1398",note:"Standard page; NAS1398C4-4 listed as an alternate of CR2663-4-4.",s:"S1"}]},
  {id:"blind-flush",label:"Blind · flush head · locked-spindle rivets",fams:["CR2662","NAS1399"],
   members:[
    {n:"CR2662",note:"Cherry wiredraw, countersunk.",s:"S3"},
    {n:"NAS1399",note:"Standard page for countersunk blind rivets.",s:"S3"}]},
  {id:"solid-flush",label:"Solid · 100° countersunk (flush) rivets",fams:["MS20427","MS20426"],
   members:[
    {n:"MS20427M… (Monel)",note:"Monel — the material in the Repair Note workbook.",s:"S10"},
    {n:"MS20426AD… (aluminum)",note:"Same geometry coding but aluminum — a different material, not a like-for-like substitute.",s:"S12"}]},
  {id:"solid-universal",label:"Solid · universal head rivets",fams:["MS20615"],
   members:[
    {n:"MS20615-…M… (Monel)",note:"Monel universal head.",s:"S13"},
    {n:"MS20470AD… (aluminum)",note:"Aluminum universal head standard — different material.",s:"S14"}]}
 ],
 platenut: {
  BACN10JR:{note:"Two-lug floating self-locking nut plate (BAC standard). Listings for BACN10JR3x show 10-32 thread (0.190 in, 32 tpi); the Repair Note workbook hole spacing 0.686–0.690 in for BACN10JR3CF matches a listing for BACN10JR3R.",src:["S15","S16"]},
  MS21076:{note:"Self-locking floating plate nut, 32 tpi listing for MS21076-3N.",src:["S17"]}
 }
};
