/* Repair Engineering Starter Hub — UI logic.
   All technical content comes from the generated files in data/. This file contains
   no technical data of its own, so a new document revision only requires regenerating data/. */
(function () {
"use strict";

var BUILD = { version: "1.0.0", date: "2026-09-21", sources: [
  { file: "Repair Handbook 101.docx", note: "TVE-5 — T-Codes, finding definitions, GD&T, plate nut identification, fastener references, important links" },
  { file: "Rectification History Database.xlsx", note: "sheet Main (historical rectification records) and sheet List Engine (shop visit list)" },
  { file: "Repair Note Dema.xlsx", note: "sheets Module 22x, Module 23x, Plate Nut- Insert, Exhaust Sleeve, Spinner Cone, Flowpath Repair, CMM or retail" }
]};

var RECT = window.RECTIFICATION || [], ENGINES = window.ENGINE_LIST || [],
    RN = window.REPAIR_NOTE || {}, HB = window.HANDBOOK || {}, IMGS = window.HANDBOOK_IMAGES || [];

/* ---------- helpers ---------- */
function esc(s){return String(s==null?"":s).replace(/[&<>"]/g,function(c){
  return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c];});}
function norm(s){return String(s==null?"":s).toUpperCase().replace(/\s+/g,"");}
function tokens(q){return q.trim().toUpperCase().split(/\s+/).filter(Boolean);}
function $(id){return document.getElementById(id);}

/* Highlight every search token inside an escaped string. */
function hl(s,q){
  var out=esc(s), ts=tokens(q);
  if(!ts.length) return out;
  ts.sort(function(a,b){return b.length-a.length;});
  var rx=new RegExp("("+ts.map(function(t){return t.replace(/[.*+?^${}()|[\]\\-]/g,"\\$&");}).join("|")+")","gi");
  return out.replace(rx,"<mark>$1</mark>");
}

/* Generic multi-token ranking. fields = [{v:value, w:weight}] */
function rank(fields,q){
  var ts=tokens(q); if(!ts.length) return 1;
  var total=0;
  for(var i=0;i<ts.length;i++){
    var t=ts[i], tn=norm(t), best=0;
    for(var j=0;j<fields.length;j++){
      var f=fields[j], v=f.n, s=0;
      if(!v) continue;
      if(v===tn) s=100; else if(v.indexOf(tn)===0) s=60;
      else if(v.indexOf(tn)>-1) s=30;
      if(s*f.w>best) best=s*f.w;
    }
    if(!best) return 0;           /* every token must match somewhere */
    total+=best;
  }
  return total;
}
function F(v,w){return {n:norm(v),w:w||1};}

/* ---------- rivet / P-N dimensional parsing (handbook-derived, always labelled) ---------- */
/* Repair Handbook 101 identifies rivet shank diameter in 1/32 inch increments and grip in
   1/16 inch increments. Applied only to P/Ns of the form FAMILY-d-g. Result is labelled
   "calculated", never presented as documented data. */
function parsePN(p){
  var m=/^([A-Z][A-Z0-9]*?)(\d+)-(\d+)-(\d+)$/.exec(String(p||"").trim().toUpperCase());
  if(!m) return null;
  return { family:m[1]+m[2], dia:parseInt(m[3],10), grip:parseInt(m[4],10),
           diaIn:(parseInt(m[3],10)/32), gripIn:(parseInt(m[4],10)/16) };
}
function frac(n,den){return n+"/"+den+' in ('+(n/den).toFixed(4).replace(/0+$/,"").replace(/\.$/,"")+" in)";}

/* ---------- tabs ---------- */
var TABS = {
  home:{ph:"Search everything — P/N, finding, T-Code…",hint:"Type to search across all sections."},
  rect:{ph:"e.g. fan blade, corrosion, 658753, 806064252",hint:RECT.length+" historical records — results update as you type."},
  alt:{ph:"e.g. CR2662-3-4, MS21076, 0.498",hint:"P/N, partial P/N, or a documented dimension."},
  notes:{ph:"e.g. abradable, exhaust, spinner, Metco",hint:"Searches every Repair Note worksheet."},
  tcode:{ph:"e.g. IW31, task list, equipment",hint:(HB.tcodes||[]).length+" T-Codes from Repair Handbook 101."},
  find:{ph:"e.g. crack, korosi, fretting",hint:(HB.findings||[]).length+" defect definitions."},
  fast:{ph:"",hint:"Handbook illustrations — no search."},
  src:{ph:"",hint:""}
};
var cur="home";
function setTab(t){
  cur=t;
  var tl=$("tabs").querySelectorAll(".tab");
  for(var i=0;i<tl.length;i++) tl[i].setAttribute("aria-selected", tl[i].dataset.t===t?"true":"false");
  var ss=document.querySelectorAll("section");
  for(var j=0;j<ss.length;j++) ss[j].classList.toggle("on", ss[j].id===t);
  var cfg=TABS[t]||{};
  $("q").placeholder=cfg.ph||"Search…";
  $("q").parentNode.style.display = cfg.ph ? "" : "none";
  $("hint").textContent=cfg.hint||"";
  render();
  window.scrollTo(0,0);
}
$("tabs").addEventListener("click",function(e){
  var b=e.target.closest(".tab"); if(b) setTab(b.dataset.t);
});
$("themeBtn").addEventListener("click",function(){
  var d=document.documentElement, dark=getComputedStyle(d).getPropertyValue("--bg").trim()==="#0e1217";
  d.setAttribute("data-theme", dark?"light":"dark");
});

/* ---------- HOME ---------- */
function renderHome(q){
  var fCount=(RN.fasteners||[]).length,
      nCount=(RN.notes||[]).length,
      altCount=(RN.fasteners||[]).reduce(function(a,x){return a+((x.alt&&x.alt.length)||0);},0);
  var h='<div class="grid three" style="margin-top:12px">'
   +stat(RECT.length,"Rectification records")
   +stat(fCount,"Fastener P/N entries")
   +stat(altCount,"Documented alternate P/N")
   +stat((HB.tcodes||[]).length,"T-Codes")
   +stat((HB.findings||[]).length,"Finding definitions")
   +stat(nCount+(RN.spinner||[]).length,"Repair note cards")
   +'</div>';

  if(tokens(q).length){
    h+='<h2>Quick search across the hub</h2>'+globalSearch(q);
  }

  h+='<h2>Jump to a tool</h2><div class="grid two">'
   +sc("rect","Rectification Search","Historical findings and their recorded solutions")
   +sc("alt","Alternate Finder","Rivet, plate nut and insert P/N with documented dimensions")
   +sc("notes","Repair Notes","Module, abradable, exhaust, flowpath, spinner, CMM")
   +sc("tcode","T-Code Finder","SAP transaction codes by group and function")
   +sc("find","Finding Dictionary","Defect terminology and definitions")
   +sc("fast","Fastener Reference","Handbook identification illustrations")
   +'</div>';

  h+='<div class="card"><h3>Start here</h3>'
   +'<p class="muted">Important Pre-Read: <b class="mono">'+esc(HB.preRead||"")+'</b></p>'
   +'<h2>Why this handbook exists</h2><ul class="lst" style="font-family:inherit">'
   +(HB.context||[]).map(function(c){return "<li>"+esc(c)+"</li>";}).join("")
   +'</ul><div class="src">Source: Repair Handbook 101.docx — Konteks / Important Pre-Read</div></div>';

  h+='<div class="card"><h3>Link penting</h3><ul class="lst" style="font-family:inherit">'
   +(HB.links||[]).map(function(l){
      var m=/(https?:\/\/\S+)/.exec(l);
      return "<li>"+(m? esc(l.replace(m[1],""))+'<a href="'+esc(m[1])+'" target="_blank" rel="noopener">'+esc(m[1])+"</a>" : esc(l))+"</li>";
    }).join("")
   +'</ul><div class="src">Source: Repair Handbook 101.docx — Link Penting</div></div>';

  if(ENGINES.length){
    h+='<div class="card"><h3>Engine shop visit list</h3><p class="muted">'+ENGINES.length
     +' records as listed in the database. Shown as recorded.</p><div class="tw"><table><thead><tr>'
     +"<th>No</th><th>Type</th><th>SN</th><th>Workscope</th><th>TSN</th><th>CSN</th><th>Induction</th><th>Serviceable</th><th>TAT</th><th>Status</th>"
     +'</tr></thead><tbody>'+ENGINES.map(function(e){
        return "<tr><td>"+esc(e.no)+"</td><td>"+esc(e.type)+"</td><td class=mono>"+esc(e.sn)+"</td><td>"+esc(e.ws)
          +"</td><td>"+esc(e.tsn)+"</td><td>"+esc(e.csn)+"</td><td>"+esc(e.ind)+"</td><td>"+esc(e.svc)
          +"</td><td>"+esc(e.tat)+"</td><td>"+esc(e.st)+"</td></tr>";}).join("")
     +'</tbody></table></div><div class="src">Source: Rectification History Database.xlsx — sheet “List Engine”</div></div>';
  }
  return h;
}
function stat(n,l){return '<div class="stat"><b>'+n+"</b><span>"+l+"</span></div>";}
function sc(t,a,b){return '<button class="shortcut" data-go="'+t+'"><b>'+a+"</b><span>"+b+"</span></button>";}

function globalSearch(q){
  var hits=[];
  var r=RECT.map(function(x){return {s:rank([F(x.task,1),F(x.sol,.8),F(x.esn,1),F(x.order,1),F(x.engine,.9)],q),x:x};})
            .filter(function(o){return o.s>0;}).length;
  var f=(RN.fasteners||[]).filter(function(x){return scoreFast(x,q)>0;}).length;
  var t=(HB.tcodes||[]).filter(function(x){return rank([F(x.code,1.4),F(x.fn,1),F(x.use,.9),F(x.group,.8)],q)>0;}).length;
  var d=(HB.findings||[]).filter(function(x){return rank([F(x.term,1.4),F(x.def,1),F(x.ex,.8)],q)>0;}).length;
  var n=(RN.notes||[]).filter(function(x){return rank([F(x.t,1.3),F(x.m,1),F(x.pn,1),F(JSON.stringify(x.rows),.7)],q)>0;}).length;
  [["rect","Rectification records",r],["alt","Fastener / alternate P/N",f],["notes","Repair notes",n],
   ["tcode","T-Codes",t],["find","Finding definitions",d]].forEach(function(p){
    if(p[2]) hits.push('<button class="shortcut" data-go="'+p[0]+'"><b>'+p[2]+" match"+(p[2]>1?"es":"")
      +" in "+p[1]+"</b><span>Open this tool with the same search</span></button>");
  });
  return hits.length? '<div class="grid two">'+hits.join("")+"</div>"
    : '<div class="card empty">No match anywhere in the loaded documents.</div>';
}

/* ---------- RECTIFICATION ---------- */
var rectEngine="ALL", rectShown=25;
function renderRect(q){
  var engs={}, i;
  for(i=0;i<RECT.length;i++){ var e=RECT[i].engine||"(not stated)"; engs[e]=(engs[e]||0)+1; }
  var keys=Object.keys(engs).sort();
  var chips='<div class="chips"><button class="chip" data-eng="ALL" aria-pressed="'+(rectEngine==="ALL")
    +'">All engines ('+RECT.length+')</button>'
    +keys.map(function(k){return '<button class="chip" data-eng="'+esc(k)+'" aria-pressed="'+(rectEngine===k)+'">'
      +esc(k)+" ("+engs[k]+")</button>";}).join("")+"</div>";

  var list=RECT.filter(function(x){return rectEngine==="ALL"||(x.engine||"(not stated)")===rectEngine;})
    .map(function(x){return {x:x,s:rank([F(x.task,1.2),F(x.sol,.9),F(x.esn,1.4),F(x.order,1.4),F(x.engine,.8)],q)};})
    .filter(function(o){return o.s>0;})
    .sort(function(a,b){return b.s-a.s||a.x.row-b.x.row;});

  var body=list.slice(0,rectShown).map(function(o){
    var x=o.x, sol=esc(x.sol), long=sol.length>420;
    return '<div class="card"><span class="tag t-hist">historical record</span>'
     +'<span class="tag t-n">'+esc(x.engine||"engine not stated")+"</span>"
     +'<h3 style="margin-top:6px">'+hl(x.task||"(no operational task recorded)",q)+"</h3>"
     +'<dl class="kv"><dt>ESN</dt><dd>'+hl(x.esn||"—",q)+"</dt><dt>Order</dt><dd>"+hl(x.order||"—",q)+"</dd></dl>"
     +"<h2>Recorded solution</h2>"
     +(long? '<p class="pre">'+hl(x.sol.slice(0,420),q)+"…</p><details><summary>Show full recorded solution</summary><div><p class=\"pre\">"
         +hl(x.sol,q)+"</p></div></details>"
       : '<p class="pre">'+hl(x.sol||"(no solution recorded)",q)+"</p>")
     +'<div class="src">Source: Rectification History Database.xlsx — sheet “Main”, row '+x.row+"</div></div>";
  }).join("");

  return chips
   +'<div class="note">Historical rectification records are references only. They are <b>not</b> automatically an approved engineering disposition for another engine or component. Verify against the applicable manual and current revision before use.</div>'
   +'<div class="count">'+list.length+" of "+RECT.length+" records"+(tokens(q).length?" matching your search":"")+"</div>"
   +(list.length? body : '<div class="card empty"><b>No record matches.</b><p>Nothing in the database matches this search. No solution is generated when the source has none.</p></div>')
   +(list.length>rectShown? '<button class="more" id="moreRect">Show more ('+(list.length-rectShown)+" remaining)</button>" : "");
}

/* ---------- ALTERNATE FINDER ---------- */
var altKind="all";
function scoreFast(it,q){
  var f=[F(it.id,1.5)];
  (it.alt||[]).forEach(function(a){f.push(F(a,1.3));});
  if(it.d) Object.keys(it.d).forEach(function(k){f.push(F(it.d[k],.9));f.push(F(k,.5));});
  ["solid","uni","flush"].forEach(function(k){ (it[k]||[]).forEach(function(v){f.push(F(v,.8));}); });
  if(it.desc) f.push(F(it.desc,.7)); if(it.use) f.push(F(it.use,.6)); f.push(F(it.src,.4));
  return rank(f,q);
}
function relTags(it,q){
  var out=[], one=tokens(q).length===1?tokens(q)[0]:null;
  if(!one) return out;
  if(norm(it.id)===norm(one)) out.push(["t-doc","exact P/N"]);
  else if((it.alt||[]).some(function(a){return norm(a)===norm(one);}))
    out.push(["t-doc","source-listed alternate of "+it.id]);
  var p=parsePN(one), o=parsePN(it.id);
  if(p&&o&&p.family===o.family&&norm(it.id)!==norm(one)){
    out.push(["t-calc","same family "+o.family]);
    if(p.dia===o.dia) out.push(["t-dim","same shank diameter −"+o.dia]);
    else out.push(["t-calc","different diameter −"+p.dia+" vs −"+o.dia]);
    if(p.grip!==o.grip) out.push(["t-calc","different grip −"+p.grip+" vs −"+o.grip]);
  }
  return out;
}
function fastCard(it,q){
  var kind={platenut:"Plate Nut",insert:"Key-Locked Insert",rivet:"Rivet"}[it.kind]||"Part";
  var tg=relTags(it,q).map(function(t){return '<span class="tag '+t[0]+'">'+esc(t[1])+"</span>";}).join("");
  var o=parsePN(it.id), b='<div class="card"><div class="pn">'+hl(it.id,q)+"</div>"
    +'<div style="margin:5px 0"><span class="tag t-n">'+kind+"</span>"+tg+"</div>";
  if(it.warn) b+='<div class="note">'+esc(it.warn)+"</div>";
  if(it.alt&&it.alt.length) b+="<h2>Documented alternate P/N</h2><ul class=\"lst\">"
    +it.alt.map(function(a){return "<li>"+hl(a,q)+' <span class="tag t-doc">documented</span></li>';}).join("")+"</ul>";
  if(it.d) b+='<h2>Documented dimensions</h2><dl class="kv">'
    +Object.keys(it.d).map(function(k){return "<dt>"+esc(k)+"</dt><dd>"+hl(it.d[k],q)+"</dd>";}).join("")+"</dl>";
  if(it.desc) b+='<dl class="kv"><dt>Type</dt><dd>'+hl(it.desc,q)+"</dd><dt>Listed for</dt><dd>"+hl(it.use,q)+"</dd></dl>";
  if(o) b+='<h2>Calculated from the P/N <span class="tag t-calc">calculated</span></h2><dl class="kv">'
    +"<dt>Family</dt><dd>"+esc(o.family)+"</dt><dt>Shank dia code</dt><dd>−"+o.dia+" = "+frac(o.dia,32)
    +"</dd><dt>Grip code</dt><dd>−"+o.grip+" = "+frac(o.grip,16)
    +'</dd></dl><p class="muted">Derived from the 1/32 in diameter and 1/16 in grip increments described in Repair Handbook 101. Not a documented dimension from the Repair Note workbook.</p>';
  if(it.solid) b+='<h2>Solid head rivet P/N</h2><ul class="lst">'+it.solid.map(function(x){return "<li>"+hl(x,q)+"</li>";}).join("")+"</ul>";
  if(it.uni) b+='<h2>Blind rivet — universal head</h2><ul class="lst">'+it.uni.map(function(x){return "<li>"+hl(x,q)+"</li>";}).join("")+"</ul>";
  if(it.flush) b+='<h2>Blind rivet — flush head</h2><ul class="lst">'+it.flush.map(function(x){return "<li>"+hl(x,q)+"</li>";}).join("")+"</ul>";
  return b+'<div class="src">Source: Repair Note Dema.xlsx — '+esc(it.src)+"</div></div>";
}
function renderAlt(q){
  var all=RN.fasteners||[];
  var counts={platenut:0,insert:0,rivet:0};
  all.forEach(function(x){counts[x.kind]=(counts[x.kind]||0)+1;});
  var chips='<div class="chips">'
   +[["all","All ("+all.length+")"],["platenut","Plate Nut ("+counts.platenut+")"],
     ["insert","Insert ("+counts.insert+")"],["rivet","Rivet ("+counts.rivet+")"]]
     .map(function(c){return '<button class="chip" data-kind="'+c[0]+'" aria-pressed="'+(altKind===c[0])+'">'+c[1]+"</button>";}).join("")
   +"</div>";
  var list=all.filter(function(x){return altKind==="all"||x.kind===altKind;})
    .map(function(x){return {x:x,s:scoreFast(x,q)};}).filter(function(o){return o.s>0;})
    .sort(function(a,b){return b.s-a.s||a.x.id.localeCompare(b.x.id);}).map(function(o){return o.x;});

  return chips
   +'<div class="note">A similar P/N is <b>not</b> an approved alternate. Only <span class="tag t-doc">documented</span> means the source workbook explicitly lists it. <span class="tag t-dim">dimensional</span> and <span class="tag t-calc">calculated</span> results are informational only — a thicker stack may require a different grip length.</div>'
   +'<div class="count">'+list.length+" of "+all.length+" entries"+(tokens(q).length?" matching your search":"")+"</div>"
   +(list.length? list.map(function(x){return fastCard(x,q);}).join("")
     : '<div class="card empty"><b>No match in source.</b><p>Nothing in Repair Note Dema.xlsx matches this input. No alternate P/N is generated when the source does not state one.</p></div>');
}

/* ---------- REPAIR NOTES ---------- */
function renderNotes(q){
  var notes=(RN.notes||[]).filter(function(n){
    return rank([F(n.t,1.3),F(n.m,1),F(n.pn,1.2),F(JSON.stringify(n.rows),.8)],q)>0;});
  var spin=(RN.spinner||[]).filter(function(r){return rank([F(r[0],1.3),F(r[1],.9),F(r[2],.9)],q)>0;});
  var flowHit=rank([F(JSON.stringify(RN.flowAsm||[]),1),F(JSON.stringify(RN.flowRep||[]),1),F("flowpath HPC case stage MJC Metco",1.2)],q)>0;

  var h='<div class="count">'+(notes.length+spin.length+(flowHit?1:0))+" section"
    +((notes.length+spin.length+(flowHit?1:0))===1?"":"s")+(tokens(q).length?" matching your search":"")+"</div>";

  h+=notes.map(function(n){
    return '<div class="card"><h3>'+hl(n.t,q)+'</h3><div class="muted">'+hl(n.m,q)+"</div>"
      +(n.pn? '<h2>Part numbers</h2><div class="mono" style="font-size:12.5px;word-break:break-word">'+hl(n.pn,q)+"</div>":"")
      +'<div class="tw"><table><tbody>'+n.rows.map(function(r){
        return '<tr><th style="width:32%">'+hl(r[0],q)+"</th><td>"+hl(r[1],q)+"</td></tr>";}).join("")
      +'</tbody></table></div><div class="src">Source: Repair Note Dema.xlsx — sheet “'+esc(n.s)+"”</div></div>";
  }).join("");

  if(flowHit) h+=flowTables(q);

  h+=spin.map(function(r){
    return '<div class="card"><h3>'+hl(r[0],q)+"</h3><h2>Reference / operation</h2>"
      +'<div style="font-size:13.5px">'+hl(r[1],q)+"</div><h2>Material</h2>"
      +'<div class="mono" style="font-size:13px;word-break:break-word">'+hl(r[2],q)+"</div>"
      +'<div class="src">Source: Repair Note Dema.xlsx — sheet “Spinner Cone”</div></div>';
  }).join("");

  if(!notes.length&&!spin.length&&!flowHit)
    h+='<div class="card empty"><b>No repair note matches.</b><p>Try a broader keyword such as abradable, exhaust, spinner or flowpath.</p></div>';
  return h;
}
function flowTables(q){
  var head=["","CFM56-3 Front Case Config.1 (Ti)","CFM56-3 Front Case Config.2 (Steel)","CFM56-3 Rear Case",
            "CFM56-7B Front Case","CFM56-7B Rear Case"];
  function tbl(rows){
    return '<div class="tw"><table><thead><tr>'+head.map(function(h){return "<th>"+esc(h)+"</th>";}).join("")
      +"</tr></thead><tbody>"+rows.map(function(r){
        return "<tr><th>"+hl(r[0],q)+"</th>"+r.slice(1).map(function(c){return "<td>"+hl(c||"",q)+"</td>";}).join("")+"</tr>";
      }).join("")+"</tbody></table></div>";
  }
  return '<div class="card"><h3>Flowpath — assembly limits</h3>'
    +'<p class="muted">As recorded. Columns are engine/configuration specific and are not interchangeable.</p>'
    +tbl(RN.flowAsm||[])+'<div class="src">Source: Repair Note Dema.xlsx — sheet “Flowpath Repair”, assembly block</div></div>'
    +'<div class="card"><h3>Flowpath — repair limits</h3>'+tbl(RN.flowRep||[])
    +'<div class="note">Material on HPC Front Case: Metco 443NS. Material on HPC Rear Case: Metco 450NS or 480NS powder, or Metco 8400 wire.</div>'
    +'<div class="src">Source: Repair Note Dema.xlsx — sheet “Flowpath Repair”, repair block</div></div>';
}

/* ---------- T-CODE ---------- */
function renderTcode(q){
  var l=(HB.tcodes||[]).map(function(x){return {x:x,s:rank([F(x.code,1.6),F(x.fn,1),F(x.use,.9),F(x.group,.8)],q)};})
    .filter(function(o){return o.s>0;}).sort(function(a,b){return b.s-a.s;}).map(function(o){return o.x;});
  if(!l.length) return '<div class="card empty"><b>No T-Code matches.</b></div>';
  return '<div class="count">'+l.length+" of "+(HB.tcodes||[]).length+" T-Codes</div>"
   +'<div class="card tight"><div class="tw"><table><thead><tr><th>T-Code</th><th>Function</th><th>Kegunaan</th><th>Group / Area</th></tr></thead><tbody>'
   +l.map(function(x){return '<tr><td class="mono"><b>'+hl(x.code,q)+"</b></td><td>"+hl(x.fn,q)+"</td><td>"
     +hl(x.use,q)+"</td><td>"+hl(x.group,q)+"</td></tr>";}).join("")
   +'</tbody></table></div><div class="src">Source: Repair Handbook 101.docx — “T-Code yang biasanya digunakan”</div></div>';
}

/* ---------- FINDING DICTIONARY ---------- */
function renderFind(q){
  var l=(HB.findings||[]).map(function(x){return {x:x,s:rank([F(x.term,1.6),F(x.def,1),F(x.ex,.8)],q)};})
    .filter(function(o){return o.s>0;}).sort(function(a,b){return b.s-a.s;}).map(function(o){return o.x;});
  return '<div class="note">Each term keeps the definition given in the handbook. One defect type is never reinterpreted as another — for example Wear and Erosion remain separate definitions.</div>'
   +'<div class="count">'+l.length+" of "+(HB.findings||[]).length+" definitions</div>"
   +(l.length? '<div class="grid two">'+l.map(function(x){
      return '<div class="card"><h3>'+hl(x.term,q)+'</h3><p style="font-size:13.5px">'+hl(x.def,q)+"</p>"
       +'<h2>Penjelasan / contoh</h2><p class="muted">'+hl(x.ex,q)+"</p>"
       +'<div class="src">Source: Repair Handbook 101.docx — “Jenis Finding yang terdapat pada repair”</div></div>';
     }).join("")+"</div>"
    : '<div class="card empty"><b>No definition matches.</b></div>');
}

/* ---------- FASTENER REFERENCE ---------- */
function renderFast(){
  var groups={gdt:"GD&T",platenut:"How to identify plate nut",fastener:"Informasi dengan Fastener"};
  var h='<div class="note">Illustrations are reproduced from Repair Handbook 101.docx in document order, under the heading they appear beneath. No caption or interpretation has been added.</div>';
  Object.keys(groups).forEach(function(g){
    var l=IMGS.filter(function(i){return i.section===g;});
    if(!l.length) return;
    h+='<div class="card"><h3>'+esc(groups[g])+'</h3><p class="muted">'+l.length+" illustration"+(l.length>1?"s":"")+" from the handbook.</p>"
     +l.map(function(i){return '<figure><img loading="lazy" src="assets/handbook-images/'+esc(i.file)
        +'" alt="'+esc(groups[g])+' illustration '+i.n+'"><figcaption>Repair Handbook 101.docx — “'
        +esc(groups[g])+'”, image '+i.n+" of "+IMGS.length+"</figcaption></figure>";}).join("")
     +'<div class="src">Source: Repair Handbook 101.docx</div></div>';
  });
  return h;
}

/* ---------- SOURCES ---------- */
function renderSrc(){
  var map=[
    ["Home dashboard","Counts computed from all loaded data files; engine shop visit list from Rectification History Database.xlsx (sheet List Engine); pre-read, context and links from Repair Handbook 101.docx"],
    ["Rectification Search","Rectification History Database.xlsx — sheet Main. Each result shows its Excel row."],
    ["Alternate Finder","Repair Note Dema.xlsx — sheet Plate Nut- Insert and Exhaust Sleeve. Diameter/grip interpretation rules: Repair Handbook 101.docx (fastener identification)."],
    ["Repair Notes","Repair Note Dema.xlsx — sheets Module 22x, Module 23x, Exhaust Sleeve, Spinner Cone, Flowpath Repair, CMM or retail."],
    ["T-Code Finder","Repair Handbook 101.docx — T-Code table."],
    ["Finding Dictionary","Repair Handbook 101.docx — finding/defect table."],
    ["Fastener Reference","Repair Handbook 101.docx — GD&T, plate nut identification and fastener illustrations."]
  ];
  return '<div class="card"><h3>Which feature comes from which document</h3><div class="tw"><table><thead><tr><th>Feature</th><th>Source</th></tr></thead><tbody>'
   +map.map(function(m){return "<tr><th>"+esc(m[0])+"</th><td>"+esc(m[1])+"</td></tr>";}).join("")+"</tbody></table></div></div>"
   +'<div class="card"><h3>Loaded document versions</h3><div class="tw"><table><thead><tr><th>File</th><th>Content loaded</th></tr></thead><tbody>'
   +BUILD.sources.map(function(s){return '<tr><th class="mono">'+esc(s.file)+"</th><td>"+esc(s.note)+"</td></tr>";}).join("")
   +'</tbody></table></div><dl class="kv"><dt>Website build</dt><dd>v'+BUILD.version+" — "+BUILD.date+"</dd></dl></div>"
   +'<div class="card"><h3>Evidence classification used on this site</h3>'
   +'<p><span class="tag t-doc">documented</span> stated explicitly in a source document.</p>'
   +'<p><span class="tag t-hist">historical record</span> a past rectification as recorded — not an approved disposition.</p>'
   +'<p><span class="tag t-calc">calculated</span> derived from the P/N using the identification rules in the handbook.</p>'
   +'<p><span class="tag t-dim">dimensional</span> a dimensional similarity only — never interchangeability.</p></div>'
   +'<div class="card"><h3>Known source limitations</h3><ul class="lst" style="font-family:inherit">'
   +'<li>Sheet <b>Plate Nut- Insert</b> row 7 carries dimensions and rivet P/Ns but no plate nut P/N. It is shown as an entry of its own with a warning rather than being attached to a neighbouring row.</li>'
   +'<li>Sheet <b>CMM or retail</b> contains empty tables for CFM56-3 and CFM56-7. They are shown as empty, not filled in.</li>'
   +'<li>Sheet <b>Exhaust Sleeve</b> contains drawing illustrations in the workbook that cannot be carried into the data file; the textual fastener callouts are fully included.</li>'
   +'<li>The handbook GD&amp;T and fastener sections are images only, so they are shown as images and are not searchable text.</li>'
   +"</ul></div>"
   +'<div class="card"><h3>Principle</h3><p><b>Document evidence &gt; model assumption.</b> This site helps you find documented information. It does not replace Engineering judgement, and it does not generate technical data that the source documents do not contain.</p></div>';
}

/* ---------- render / events ---------- */
function render(){
  var q=$("q").value;
  if(cur==="home") $("home").innerHTML=renderHome(q);
  else if(cur==="rect") $("rect").innerHTML=renderRect(q);
  else if(cur==="alt") $("alt").innerHTML=renderAlt(q);
  else if(cur==="notes") $("notes").innerHTML=renderNotes(q);
  else if(cur==="tcode") $("tcode").innerHTML=renderTcode(q);
  else if(cur==="find") $("find").innerHTML=renderFind(q);
  else if(cur==="fast") $("fast").innerHTML=renderFast();
  else if(cur==="src") $("src").innerHTML=renderSrc();
}
$("q").addEventListener("input",function(){ rectShown=25; render(); });
document.addEventListener("click",function(e){
  var go=e.target.closest("[data-go]"); if(go){ setTab(go.dataset.go); return; }
  var en=e.target.closest("[data-eng]"); if(en){ rectEngine=en.dataset.eng; rectShown=25; render(); return; }
  var kd=e.target.closest("[data-kind]"); if(kd){ altKind=kd.dataset.kind; render(); return; }
  if(e.target.id==="moreRect"){ rectShown+=25; render(); }
});
$("subline").textContent="Document-based reference — TVE-5 · build v"+BUILD.version;
setTab("home");
})();
