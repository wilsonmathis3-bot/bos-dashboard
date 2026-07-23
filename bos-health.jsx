import { useState } from "react";

// ── MASTER PROMPT (displayed in app) ──
const MASTER_PROMPT = `You are the BOS Health Cooperative System AI — a comprehensive healthcare system architect and administrator for a community-owned, insurance-free, Direct Primary Care cooperative network.

SYSTEM IDENTITY:
BOS Health is a nonprofit community health cooperative operating outside the traditional insurance model. It combines Direct Primary Care (DPC), a community health sharing pool, transparent drug pricing, and a negotiated cash-pay specialist network. Members pay a flat monthly fee. Doctors are paid directly. No insurance company sits between patient and provider.

YOUR ROLES:
1. MEMBER INTAKE AGENT — Assess new member health needs, assign care tier, calculate monthly contribution, explain benefits clearly
2. DOCTOR RECRUITMENT ADVISOR — Present the DPC opportunity to physicians burned out by insurance, calculate their income improvement, explain the practice freedom model
3. FACILITY PARTNERSHIP COORDINATOR — Pitch imaging centers, surgery centers, and specialist clinics on joining the BOS cash-pay network
4. HEALTH COOPERATIVE ADMINISTRATOR — Manage member health fund pool, flag high-risk members for preventive outreach, track collective health outcomes
5. REGULATORY NAVIGATION GUIDE — Help founders understand FQHC status, 340B drug access, health sharing cooperative law, and DPC legality by state

CORE PRICING MODEL:
- Individual membership: $89/month (DPC access + health share pool contribution)
- Family membership: $199/month (covers 2 adults + all children under 18)
- Senior membership: $109/month (65+ with enhanced preventive care)
- Drug access: Cost + 15% transparent markup via cooperative pharmacy network
- Specialist visits: Pre-negotiated cash-pay rates (60-80% below hospital rates)
- Health share pool: Covers bills over $500 up to $250,000 per incident
- No deductibles. No copays at primary care. No prior authorizations.

DOCTOR VALUE PROPOSITION:
- DPC doctors see 600-800 patients (vs 2,500+ in insurance model)
- Income: $120,000-$280,000 depending on panel size and membership fee
- No billing staff needed — direct payment, no claims, no denials
- Same-day appointments standard — doctors have time to think and care
- BOS handles membership admin, scheduling infrastructure, and marketing

FACILITY VALUE PROPOSITION:
- Guaranteed cash payment within 10 days of service (vs 90-180 days from insurance)
- No billing department overhead — BOS submits single monthly reconciliation
- Volume guarantees based on cooperative membership size
- Listing in BOS Transparent Price Directory — drives additional cash-pay patients
- No insurance audits, no claim denials, no prior auth bureaucracy

LEGAL FRAMEWORK:
- DPC is legal in all 50 states under state DPC protection acts
- Health sharing cooperatives exempt from ACA insurance mandates
- FQHC Look-Alike status grants 340B drug pricing access
- Nonprofit cooperative structure protects against insurance regulatory capture
- CCPA/HIPAA compliant data handling required for all member health data

DEPLOYMENT PHILOSOPHY:
Start silent. Register as a wellness cooperative. Serve one underserved zip code first. Document every outcome — cost per member, ER visit reduction, chronic disease improvement. Let the data become the argument. Partner with universities for validation. Target rural senators and self-insured employers. Scale through open-source replication, not acquisition.

TONE: Warm, clear, and empowering. Never condescending. Speak to members like a trusted doctor who has time for them. Speak to doctors like a colleague who respects their expertise and wants to free them. Speak to facilities like a business partner who pays on time and brings volume.

Always answer with specificity. Give real numbers, real steps, real legal citations when relevant. Never vague reassurance — concrete actionable information only.`;

// ── STYLES ──
const css = `
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400&family=DM+Sans:wght@300;400;500&family=DM+Mono:wght@400;500&display=swap');

*{box-sizing:border-box;margin:0;padding:0;}
html{width:100%;overflow-x:hidden;}
body{font-family:'DM Sans',sans-serif;background:#f7f4ee;color:#1a1a1a;min-height:100vh;width:100%;overflow-x:hidden;}
::-webkit-scrollbar{width:4px}::-webkit-scrollbar-thumb{background:#8db89a;border-radius:4px}

.app{min-height:100vh;background:#f7f4ee;width:100%;overflow-x:hidden;}

/* NAV */
.nav{background:#1c2b1e;padding:0 40px;display:flex;justify-content:space-between;align-items:center;height:64px;position:sticky;top:0;z-index:100;width:100%;left:0;right:0;}
.nav-logo{font-family:'Playfair Display',serif;font-size:22px;font-weight:900;color:#f7f4ee;letter-spacing:-0.5px;}
.nav-logo span{color:#8db89a;}
.nav-links{display:flex;gap:4px;}
.nav-btn{background:none;border:1px solid transparent;color:#8db89a;padding:7px 16px;border-radius:6px;cursor:pointer;font-family:'DM Sans',sans-serif;font-size:13px;font-weight:500;transition:all .2s;letter-spacing:.3px;}
.nav-btn:hover,.nav-btn.active{background:#8db89a;color:#1c2b1e;border-color:#8db89a;}
.nav-btn.cta{background:#8db89a;color:#1c2b1e;}

/* HERO */
.hero{background:#1c2b1e;padding:80px 48px 100px;position:relative;overflow:hidden;width:100%;}
.hero::before{content:'';position:absolute;top:-60px;right:-60px;width:400px;height:400px;border-radius:50%;background:rgba(141,184,154,.06);pointer-events:none;}
.hero::after{content:'';position:absolute;bottom:-80px;left:20%;width:300px;height:300px;border-radius:50%;background:rgba(141,184,154,.04);pointer-events:none;}
.hero-inner{max-width:760px;margin:0 auto;position:relative;z-index:1;}
.hero-eyebrow{font-family:'DM Mono',monospace;font-size:11px;letter-spacing:3px;text-transform:uppercase;color:#8db89a;margin-bottom:20px;}
.hero h1{font-family:'Playfair Display',serif;font-size:clamp(44px,6vw,76px);font-weight:900;line-height:1.0;letter-spacing:-2px;color:#f7f4ee;margin-bottom:20px;}
.hero h1 em{color:#8db89a;font-style:italic;}
.hero-sub{font-size:16px;color:rgba(247,244,238,.5);max-width:480px;line-height:1.8;margin-bottom:40px;font-weight:300;}
.hero-pills{display:flex;gap:10px;flex-wrap:wrap;}
.pill{background:rgba(141,184,154,.12);border:1px solid rgba(141,184,154,.25);color:#8db89a;padding:6px 14px;border-radius:40px;font-size:12px;font-family:'DM Mono',monospace;}

/* STATS */
.stats{display:grid;grid-template-columns:repeat(4,1fr);border-bottom:1px solid #e8e3da;width:100%;}
.stat{padding:28px 32px;border-right:1px solid #e8e3da;background:#fff;}
.stat:last-child{border-right:none;}
.stat-n{font-family:'Playfair Display',serif;font-size:38px;font-weight:900;color:#1c2b1e;letter-spacing:-1px;}
.stat-l{font-size:12px;color:#888;margin-top:4px;font-weight:300;}

/* SECTIONS */
.section{padding:64px 48px;max-width:1100px;margin:0 auto;width:100%;}
.full-bleed{width:100%;margin-left:calc(-50vw + 50%);}
.sec-label{font-family:'DM Mono',monospace;font-size:10px;letter-spacing:3px;text-transform:uppercase;color:#8db89a;margin-bottom:14px;}
.sec-h2{font-family:'Playfair Display',serif;font-size:36px;font-weight:900;letter-spacing:-1px;margin-bottom:40px;color:#1c2b1e;}

/* CARDS */
.card-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:20px;}
.card{background:#fff;border:1px solid #e8e3da;border-radius:16px;padding:28px;transition:all .25s;}
.card:hover{border-color:#8db89a;transform:translateY(-2px);box-shadow:0 8px 32px rgba(28,43,30,.08);}
.card-icon{font-size:28px;margin-bottom:14px;}
.card-title{font-family:'Playfair Display',serif;font-size:18px;font-weight:700;margin-bottom:8px;color:#1c2b1e;}
.card-body{font-size:13px;color:#666;line-height:1.7;font-weight:300;}
.card-price{font-family:'DM Mono',monospace;font-size:22px;color:#1c2b1e;font-weight:500;margin-top:14px;}
.card-price span{font-size:12px;color:#888;font-weight:400;}

/* PRICING */
.pricing-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:16px;}
.price-card{background:#fff;border:2px solid #e8e3da;border-radius:16px;padding:28px;transition:all .25s;cursor:pointer;}
.price-card:hover,.price-card.featured{border-color:#1c2b1e;background:#1c2b1e;}
.price-card:hover .pc-title,.price-card.featured .pc-title{color:#f7f4ee;}
.price-card:hover .pc-price,.price-card.featured .pc-price{color:#8db89a;}
.price-card:hover .pc-feat,.price-card.featured .pc-feat{color:rgba(247,244,238,.6);}
.price-card:hover .pc-sub,.price-card.featured .pc-sub{color:rgba(247,244,238,.4);}
.pc-tag{font-family:'DM Mono',monospace;font-size:10px;letter-spacing:2px;text-transform:uppercase;color:#8db89a;margin-bottom:10px;}
.pc-title{font-family:'Playfair Display',serif;font-size:20px;font-weight:700;color:#1c2b1e;margin-bottom:6px;transition:color .25s;}
.pc-price{font-family:'DM Mono',monospace;font-size:32px;font-weight:500;color:#1c2b1e;margin:14px 0 4px;transition:color .25s;}
.pc-sub{font-size:12px;color:#888;margin-bottom:18px;transition:color .25s;}
.pc-feat{font-size:12px;color:#555;line-height:2;transition:color .25s;}

/* FORMS */
.form-wrap{max-width:680px;margin:0 auto;}
.form-section{background:#fff;border:1px solid #e8e3da;border-radius:20px;padding:36px;margin-bottom:20px;}
.form-section-title{font-family:'Playfair Display',serif;font-size:20px;font-weight:700;color:#1c2b1e;margin-bottom:6px;}
.form-section-sub{font-size:13px;color:#888;margin-bottom:24px;font-weight:300;}
.form-row{display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-bottom:14px;}
.form-field{display:flex;flex-direction:column;gap:6px;margin-bottom:14px;}
.form-field label{font-family:'DM Mono',monospace;font-size:10px;letter-spacing:1.5px;text-transform:uppercase;color:#888;}
.form-field input,.form-field select,.form-field textarea{background:#f7f4ee;border:1px solid #e8e3da;border-radius:10px;padding:12px 14px;color:#1a1a1a;font-family:'DM Sans',sans-serif;font-size:14px;transition:border-color .2s;resize:none;outline:none;}
.form-field input:focus,.form-field select:focus,.form-field textarea:focus{border-color:#8db89a;background:#fff;}
.form-field textarea{min-height:80px;}
.form-field select{appearance:none;cursor:pointer;}
.submit-btn{width:100%;background:#1c2b1e;color:#f7f4ee;border:none;padding:16px;border-radius:12px;font-family:'Playfair Display',serif;font-size:17px;font-weight:700;cursor:pointer;transition:all .2s;margin-top:8px;letter-spacing:-.3px;}
.submit-btn:hover{background:#2d4a30;}
.submit-btn:disabled{opacity:.4;cursor:not-allowed;}
.hint{font-size:11px;color:#aaa;margin-top:3px;font-style:italic;}

/* AI CHAT */
.chat-wrap{max-width:800px;margin:0 auto;}
.chat-box{background:#fff;border:1px solid #e8e3da;border-radius:20px;overflow:hidden;}
.chat-header{background:#1c2b1e;padding:18px 24px;display:flex;align-items:center;gap:12px;}
.chat-avatar{width:36px;height:36px;border-radius:50%;background:#8db89a;display:flex;align-items:center;justify-content:center;font-size:16px;}
.chat-name{font-family:'Playfair Display',serif;font-size:16px;font-weight:700;color:#f7f4ee;}
.chat-status{font-size:11px;color:rgba(141,184,154,.7);font-family:'DM Mono',monospace;}
.messages{height:420px;overflow-y:auto;padding:24px;display:flex;flex-direction:column;gap:16px;}
.msg{max-width:80%;padding:14px 18px;border-radius:16px;font-size:14px;line-height:1.7;font-weight:300;}
.msg.user{background:#1c2b1e;color:#f7f4ee;align-self:flex-end;border-radius:16px 16px 4px 16px;}
.msg.ai{background:#f7f4ee;color:#1a1a1a;align-self:flex-start;border:1px solid #e8e3da;border-radius:16px 16px 16px 4px;}
.msg.loading{color:#888;}
.chat-input-row{display:flex;gap:10px;padding:16px 20px;border-top:1px solid #e8e3da;background:#fafaf8;}
.chat-input{flex:1;background:#f7f4ee;border:1px solid #e8e3da;border-radius:10px;padding:12px 16px;font-family:'DM Sans',sans-serif;font-size:14px;outline:none;color:#1a1a1a;transition:border-color .2s;}
.chat-input:focus{border-color:#8db89a;}
.send-btn{background:#1c2b1e;color:#f7f4ee;border:none;padding:12px 20px;border-radius:10px;cursor:pointer;font-family:'DM Sans',sans-serif;font-size:13px;font-weight:500;transition:background .2s;white-space:nowrap;}
.send-btn:hover{background:#2d4a30;}
.send-btn:disabled{opacity:.4;cursor:not-allowed;}
.quick-btns{display:flex;gap:8px;flex-wrap:wrap;padding:0 20px 14px;background:#fafaf8;}
.quick-btn{background:none;border:1px solid #e8e3da;color:#555;padding:6px 12px;border-radius:40px;cursor:pointer;font-size:12px;transition:all .2s;font-family:'DM Sans',sans-serif;}
.quick-btn:hover{border-color:#8db89a;color:#1c2b1e;}

/* PROMPT BOX */
.prompt-box{background:#1c2b1e;border-radius:20px;padding:32px;margin-bottom:24px;}
.prompt-label{font-family:'DM Mono',monospace;font-size:10px;letter-spacing:3px;color:#8db89a;margin-bottom:14px;text-transform:uppercase;}
.prompt-text{font-family:'DM Mono',monospace;font-size:11px;color:rgba(247,244,238,.6);line-height:1.8;white-space:pre-wrap;max-height:220px;overflow-y:auto;padding-right:8px;}
.copy-btn{background:#8db89a;color:#1c2b1e;border:none;padding:8px 18px;border-radius:8px;cursor:pointer;font-size:12px;font-weight:500;margin-top:14px;font-family:'DM Sans',sans-serif;transition:background .2s;}
.copy-btn:hover{background:#a0c9ac;}

/* RESULT */
.result-box{background:#f0f7f2;border:1px solid #c5dfc9;border-radius:16px;padding:24px;margin-top:20px;}
.result-title{font-family:'Playfair Display',serif;font-size:18px;font-weight:700;color:#1c2b1e;margin-bottom:16px;}
.result-row{display:flex;justify-content:space-between;align-items:center;padding:10px 0;border-bottom:1px solid #d8eddb;}
.result-row:last-child{border-bottom:none;}
.result-label{font-size:13px;color:#555;font-weight:300;}
.result-val{font-family:'DM Mono',monospace;font-size:14px;color:#1c2b1e;font-weight:500;}
.result-val.green{color:#2d7a3c;}

/* SUCCESS */
.success-box{background:#fff;border:2px solid #8db89a;border-radius:20px;padding:40px;text-align:center;}
.success-icon{font-size:48px;margin-bottom:16px;}
.success-title{font-family:'Playfair Display',serif;font-size:28px;font-weight:900;color:#1c2b1e;margin-bottom:8px;}
.success-sub{font-size:15px;color:#666;font-weight:300;line-height:1.7;}
.success-id{font-family:'DM Mono',monospace;font-size:13px;color:#8db89a;margin-top:16px;background:#f0f7f2;padding:8px 16px;border-radius:8px;display:inline-block;}

/* TABS */
.tabs{display:flex;gap:4px;margin-bottom:32px;background:#fff;border:1px solid #e8e3da;border-radius:12px;padding:4px;width:fit-content;}
.tab{background:none;border:none;padding:9px 20px;border-radius:9px;cursor:pointer;font-family:'DM Sans',sans-serif;font-size:13px;color:#888;transition:all .2s;font-weight:500;}
.tab.active{background:#1c2b1e;color:#f7f4ee;}

/* COMPARISON */
.compare-grid{display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:32px;}
.compare-col{border-radius:16px;padding:28px;}
.compare-col.old{background:#fff5f5;border:1px solid #f0cccc;}
.compare-col.new{background:#f0f7f2;border:1px solid #c5dfc9;}
.compare-title{font-family:'Playfair Display',serif;font-size:16px;font-weight:700;margin-bottom:16px;}
.compare-col.old .compare-title{color:#8b2222;}
.compare-col.new .compare-title{color:#1c5c2e;}
.compare-item{display:flex;align-items:flex-start;gap:8px;padding:7px 0;border-bottom:1px solid rgba(0,0,0,.05);font-size:13px;font-weight:300;}
.compare-item:last-child{border-bottom:none;}
.ci-icon{flex-shrink:0;font-size:14px;margin-top:1px;}

/* NOTICE */
.notice{background:#fffbe6;border:1px solid #f0d060;border-radius:12px;padding:16px 20px;font-size:13px;color:#7a6200;margin-bottom:20px;line-height:1.6;font-weight:300;}
.notice strong{font-weight:500;}

/* FOOTER */
.footer{background:#1c2b1e;padding:32px 48px;text-align:center;width:100%;}
.footer p{font-size:12px;color:rgba(247,244,238,.3);font-family:'DM Mono',monospace;}
.footer span{color:#8db89a;}
`;

// ── DATA ──
const CONDITIONS = ["None / Preventive only","Hypertension","Diabetes (Type 2)","Asthma / COPD","Anxiety / Depression","Heart Disease","Arthritis","Other chronic condition"];
const SPECIALTIES = ["Family Medicine / Internal Medicine","Pediatrics","OB/GYN","Mental Health / Psychiatry","Physical Therapy","Cardiology","Orthopedics","Dermatology","Other"];
const FACILITY_TYPES = ["Independent Imaging Center (MRI/X-Ray/CT)","Outpatient Surgery Center","Specialty Clinic","Physical Therapy Practice","Mental Health Group Practice","Urgent Care (Independent)","Laboratory / Diagnostics","Other"];
const QUICK_PROMPTS_MEMBER = ["What does my $89/month cover?","How does the health share pool work?","Can I keep my current doctor?","How do I get prescriptions?","What if I need surgery?"];
const QUICK_PROMPTS_DOCTOR = ["Walk me through the DPC income model","How many patients would I see?","What admin burden is eliminated?","How does BOS handle billing?","What's my first year look like?"];
const QUICK_PROMPTS_FACILITY = ["How does cash-pay pricing work?","When do you pay invoices?","What volume can you guarantee?","How does the price directory work?","What contract terms are standard?"];

export default function BOSHealth() {
  const [view, setView] = useState("home");
  const [tab, setTab] = useState("member");
  const [chatMode, setChatMode] = useState("member");

  // member form
  const [mForm, setMForm] = useState({name:"",email:"",phone:"",age:"",zip:"",tier:"individual",conditions:[],income:""});
  const [mResult, setMResult] = useState(null);
  const [mSubmitted, setMSubmitted] = useState(false);

  // doctor form
  const [dForm, setDForm] = useState({name:"",email:"",phone:"",specialty:"",state:"",currentPatients:"",currentIncome:"",burnout:"",why:""});
  const [dSubmitted, setDSubmitted] = useState(false);
  const [dResult, setDResult] = useState(null);

  // facility form
  const [fForm, setFForm] = useState({name:"",facility:"",type:"",city:"",state:"",services:"",annualCashPay:"",interest:""});
  const [fSubmitted, setFSubmitted] = useState(false);

  // chat
  const [messages, setMessages] = useState([{role:"ai",content:"Hello — I'm the BOS Health cooperative AI. I can help you understand our membership, answer questions about Direct Primary Care, or walk a physician or facility through partnering with us. What brings you here today?"}]);
  const [chatInput, setChatInput] = useState("");
  const [chatLoading, setChatLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const notify = (msg) => { /* simple no-op for mobile simplicity */ };

  const mf = (k,v) => setMForm(f=>({...f,[k]:v}));
  const df = (k,v) => setDForm(f=>({...f,[k]:v}));
  const ff = (k,v) => setFForm(f=>({...f,[k]:v}));

  const tierPrice = {individual:89,family:199,senior:109};

  const calcMemberResult = () => {
    const price = tierPrice[mForm.tier];
    const trad = mForm.tier==="individual" ? 520 : (mForm.tier==="family" ? 1380 : 420);
    const savings = trad - price;
    const id = "BOS-M-" + Math.random().toString(36).substr(2,8).toUpperCase();
    setMResult({price,trad,savings,id,tier:mForm.tier});
    setMSubmitted(true);
  };

  const calcDoctorResult = () => {
    const panel = 650;
    const fee = 89;
    const grossMonthly = Math.round(panel * fee * 0.72);
    const grossAnnual = grossMonthly * 12;
    const id = "BOS-DR-" + Math.random().toString(36).substr(2,8).toUpperCase();
    setDResult({panel,grossMonthly,grossAnnual,id});
    setDSubmitted(true);
  };

  const sendChat = async (text) => {
    const userMsg = text || chatInput.trim();
    if (!userMsg || chatLoading) return;
    setChatInput("");
    setMessages(m => [...m, {role:"user",content:userMsg}]);
    setChatLoading(true);

    const modeContext = chatMode === "doctor"
      ? "The user is a physician considering joining BOS Health as a Direct Primary Care partner doctor. Speak to them as a respected colleague. Focus on income, practice freedom, patient load, and administrative relief."
      : chatMode === "facility"
      ? "The user represents a healthcare facility (imaging center, surgery center, or specialist clinic) considering joining the BOS cash-pay network. Focus on payment speed, volume, no prior auth, and transparent pricing."
      : "The user is a prospective or current BOS Health cooperative member. Speak to them warmly and clearly. Focus on what their membership covers, how the health share pool works, drug pricing, and specialist access.";

    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify({
          model:"claude-sonnet-4-20250514",
          max_tokens:1000,
          system: MASTER_PROMPT + "\n\nCURRENT CONTEXT: " + modeContext + "\n\nKeep responses conversational, warm, and under 200 words unless the question genuinely requires more detail. Use line breaks for readability. Never use markdown headers or bullet symbols — write in natural flowing sentences.",
          messages: [
            ...messages.filter(m=>m.role!=="ai"||messages.indexOf(m)>0).map(m=>({role:m.role==="ai"?"assistant":"user",content:m.content})),
            {role:"user",content:userMsg}
          ]
        })
      });
      const data = await res.json();
      const reply = data.content?.find(b=>b.type==="text")?.text || "I apologize — let me try that again.";
      setMessages(m => [...m, {role:"ai",content:reply}]);
    } catch(e) {
      setMessages(m => [...m, {role:"ai",content:"I'm having trouble connecting right now. Please try again in a moment."}]);
    }
    setChatLoading(false);
  };

  const copyPrompt = () => {
    navigator.clipboard.writeText(MASTER_PROMPT).then(()=>{setCopied(true);setTimeout(()=>setCopied(false),2000);});
  };

  const genId = (prefix) => prefix + Math.random().toString(36).substr(2,8).toUpperCase();

  return (
    <>
      <style>{css}</style>
      <div className="app">

        {/* NAV */}
        <nav className="nav">
          <div className="nav-logo" onClick={()=>setView("home")} style={{cursor:"pointer"}}>BOS <span>Health</span></div>
          <div className="nav-links">
            <button className={`nav-btn ${view==="home"?"active":""}`} onClick={()=>setView("home")}>Home</button>
            <button className={`nav-btn ${view==="join"?"active":""}`} onClick={()=>setView("join")}>Join</button>
            <button className={`nav-btn ${view==="doctors"?"active":""}`} onClick={()=>setView("doctors")}>For Doctors</button>
            <button className={`nav-btn ${view==="facilities"?"active":""}`} onClick={()=>setView("facilities")}>Facilities</button>
            <button className={`nav-btn ${view==="ai"?"active":""}`} onClick={()=>setView("ai")}>AI Advisor</button>
            <button className={`nav-btn ${view==="prompt"?"active":""}`} onClick={()=>setView("prompt")}>System Prompt</button>
          </div>
        </nav>

        {/* HOME */}
        {view==="home" && <>
          <div className="hero">
            <div className="hero-inner">
              <div className="hero-eyebrow">Community Health Cooperative — Rancho Mirage, CA</div>
              <h1>Healthcare that doesn't cost<em> an arm and a leg.</em></h1>
              <p className="hero-sub">A direct-pay cooperative where you know your doctor, know your price, and never deal with an insurance company again.</p>
              <div className="hero-pills">
                <span className="pill">No Insurance Needed</span>
                <span className="pill">$89/month Individual</span>
                <span className="pill">Same-Day Appointments</span>
                <span className="pill">Transparent Drug Pricing</span>
                <span className="pill">Community-Owned</span>
              </div>
            </div>
          </div>

          <div className="stats">
            {[["$89","Individual monthly membership"],["600","Max patients per BOS doctor"],["10 days","Facility payment guarantee"],["0","Insurance pre-authorizations"]].map(([n,l])=>(
              <div className="stat" key={l}><div className="stat-n">{n}</div><div className="stat-l">{l}</div></div>
            ))}
          </div>

          <div className="section">
            <div className="sec-label">The BOS Difference</div>
            <div className="sec-h2">Built for humans. Not shareholders.</div>
            <div className="compare-grid">
              <div className="compare-col old">
                <div className="compare-title">❌ Traditional Insurance</div>
                {[["$800–1,500/month","premium + deductible"],["30+ days","wait for specialist"],["2,500 patients","per overworked doctor"],["Pre-authorization","required for most care"],["90–180 days","to pay facilities"],["Claim denials","standard practice"]].map(([a,b])=>(
                  <div className="compare-item" key={a}><span className="ci-icon">✗</span><span><strong>{a}</strong> {b}</span></div>
                ))}
              </div>
              <div className="compare-col new">
                <div className="compare-title">✓ BOS Health Cooperative</div>
                {[["$89–199/month","flat — no surprises"],["Same or next day","direct to your doctor"],["600 patients","doctor has time for you"],["No authorization","ever needed for primary care"],["10 days","guaranteed facility payment"],["Community vote","on coverage decisions"]].map(([a,b])=>(
                  <div className="compare-item" key={a}><span className="ci-icon">✓</span><span><strong>{a}</strong> {b}</span></div>
                ))}
              </div>
            </div>

            <div className="card-grid">
              {[
                {icon:"🏥",title:"Direct Primary Care",body:"Your monthly fee covers unlimited primary care visits, basic labs, and direct phone/text access to your doctor. No copays. No waiting rooms. Your doctor has time because they see 600 patients, not 2,500."},
                {icon:"🤝",title:"Health Share Pool",body:"Members contribute to a shared fund that covers large medical bills over $500 — up to $250,000 per incident. Community-governed. Transparent. No CEO extracting profit from your emergency."},
                {icon:"💊",title:"Transparent Drugs",body:"Prescriptions at manufacturing cost plus 15%. A medication your pharmacy charges $180 for might cost $4.80 through the BOS cooperative pharmacy network. Every price is posted publicly."},
                {icon:"🔬",title:"Specialist Network",body:"Pre-negotiated cash-pay rates with independent imaging centers, surgery centers, and specialists. An MRI that costs $3,200 at a hospital: $350 through the BOS network. Paid directly. No billing circus."},
              ].map(c=>(
                <div className="card" key={c.title}>
                  <div className="card-icon">{c.icon}</div>
                  <div className="card-title">{c.title}</div>
                  <div className="card-body">{c.body}</div>
                </div>
              ))}
            </div>
          </div>

          <div style={{background:"#1c2b1e",padding:"60px 48px",textAlign:"center",width:"100%",marginLeft:0,marginRight:0}}>
            <div style={{fontFamily:"'Playfair Display',serif",fontSize:"clamp(22px,4vw,40px)",fontWeight:900,color:"#f7f4ee",letterSpacing:"-1px",maxWidth:600,margin:"0 auto 20px",lineHeight:1.2}}>
              "The cheapest care is care you never needed."
            </div>
            <p style={{color:"rgba(247,244,238,.4)",fontSize:14,fontWeight:300}}>BOS invests in prevention so emergencies become rare — for every member.</p>
          </div>
        </>}

        {/* JOIN */}
        {view==="join" && (
          <div className="section">
            <div className="sec-label">Membership Application</div>
            <div className="sec-h2">Find your plan.</div>

            {!mSubmitted ? <>
              <div className="notice"><strong>Free to join the cooperative.</strong> Membership fees begin on your coverage start date. No credit card required to apply.</div>

              <div className="pricing-grid" style={{marginBottom:32}}>
                {[
                  {key:"individual",tag:"Most Common",title:"Individual",price:"$89",sub:"/month",feats:["Unlimited primary care visits","Health share pool coverage","Transparent drug pricing","Specialist network access","Direct doctor contact"]},
                  {key:"family",tag:"Best Value",title:"Family",price:"$199",sub:"/month — 2 adults + all kids",feats:["Everything in Individual","All children under 18 included","Pediatric care included","Family health tracking","Priority scheduling"]},
                  {key:"senior",tag:"65+",title:"Senior",price:"$109",sub:"/month",feats:["Enhanced preventive focus","Annual comprehensive labs","Chronic disease management","Medicare coordination","Home visit coordination"]},
                ].map(p=>(
                  <div key={p.key} className={`price-card ${mForm.tier===p.key?"featured":""}`} onClick={()=>mf("tier",p.key)}>
                    <div className="pc-tag">{p.tag}</div>
                    <div className="pc-title">{p.title}</div>
                    <div className="pc-price">{p.price}</div>
                    <div className="pc-sub">{p.sub}</div>
                    <div className="pc-feat">{p.feats.map(f=><div key={f}>→ {f}</div>)}</div>
                  </div>
                ))}
              </div>

              <div className="form-wrap">
                <div className="form-section">
                  <div className="form-section-title">Personal Information</div>
                  <div className="form-section-sub">Used for your member profile and care coordination.</div>
                  <div className="form-row">
                    <div className="form-field"><label>Full Name *</label><input value={mForm.name} onChange={e=>mf("name",e.target.value)} placeholder="Your full name"/></div>
                    <div className="form-field"><label>Age *</label><input value={mForm.age} onChange={e=>mf("age",e.target.value)} placeholder="Age" type="number"/></div>
                  </div>
                  <div className="form-row">
                    <div className="form-field"><label>Email *</label><input value={mForm.email} onChange={e=>mf("email",e.target.value)} placeholder="you@email.com" type="email"/></div>
                    <div className="form-field"><label>Phone</label><input value={mForm.phone} onChange={e=>mf("phone",e.target.value)} placeholder="(760) 000-0000"/></div>
                  </div>
                  <div className="form-field"><label>ZIP Code</label><input value={mForm.zip} onChange={e=>mf("zip",e.target.value)} placeholder="92270"/></div>
                </div>

                <div className="form-section">
                  <div className="form-section-title">Health Context</div>
                  <div className="form-section-sub">Helps us connect you to the right care from day one. Never shared without your consent.</div>
                  <div className="form-field">
                    <label>Primary Health Conditions</label>
                    <select value={mForm.conditions[0]||""} onChange={e=>mf("conditions",[e.target.value])}>
                      <option value="">Select primary condition</option>
                      {CONDITIONS.map(c=><option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                  <div className="form-field">
                    <label>Approximate Household Income</label>
                    <select value={mForm.income} onChange={e=>mf("income",e.target.value)}>
                      <option value="">Prefer not to say</option>
                      <option>Under $25,000</option>
                      <option>$25,000 – $50,000</option>
                      <option>$50,000 – $80,000</option>
                      <option>$80,000 – $120,000</option>
                      <option>Over $120,000</option>
                    </select>
                    <div className="hint">Used only for hardship fund eligibility — never for pricing.</div>
                  </div>
                </div>

                <button className="submit-btn" onClick={calcMemberResult} disabled={!mForm.name||!mForm.email||!mForm.age}>
                  Calculate My Savings & Apply →
                </button>
              </div>
            </> : mResult && (
              <div className="form-wrap">
                <div className="success-box">
                  <div className="success-icon">🌿</div>
                  <div className="success-title">Welcome to BOS Health, {mForm.name.split(" ")[0]}.</div>
                  <div className="success-sub">Your application is received. A BOS care coordinator will contact you within 2 business days to confirm your coverage start date and connect you with your primary care physician.</div>
                  <div className="success-id">{mResult.id}</div>
                </div>
                <div className="result-box" style={{marginTop:20}}>
                  <div className="result-title">Your Membership Summary</div>
                  <div className="result-row"><span className="result-label">Plan</span><span className="result-val" style={{textTransform:"capitalize"}}>{mResult.tier}</span></div>
                  <div className="result-row"><span className="result-label">Monthly Contribution</span><span className="result-val">${mResult.price}/month</span></div>
                  <div className="result-row"><span className="result-label">Estimated Traditional Insurance Cost</span><span className="result-val">${mResult.trad}/month</span></div>
                  <div className="result-row"><span className="result-label">Your Monthly Savings</span><span className="result-val green">${mResult.savings} saved every month</span></div>
                  <div className="result-row"><span className="result-label">Annual Savings</span><span className="result-val green">${(mResult.savings*12).toLocaleString()} per year</span></div>
                  <div className="result-row"><span className="result-label">Health Share Pool Coverage</span><span className="result-val">Up to $250,000/incident</span></div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* DOCTORS */}
        {view==="doctors" && (
          <div className="section">
            <div className="sec-label">Physician Partnership Program</div>
            <div className="sec-h2">Practice medicine the way you meant to.</div>

            <div className="card-grid" style={{marginBottom:40}}>
              {[
                {icon:"📋",title:"600 Patients, Not 2,500",body:"Insurance-model physicians see 2,500+ patients to cover overhead. BOS DPC physicians carry a panel of 600–800 — enough time to actually listen, think, and care."},
                {icon:"💵",title:"Direct Income, No Middlemen",body:"Your monthly membership fees come directly to you. No insurance contracts, no billing department, no claim denials. Average BOS DPC physician earns $120K–$280K annually."},
                {icon:"📵",title:"Zero Prior Authorizations",body:"You decide the care. Not an insurance clerk reading a script. Your clinical judgment is restored to its proper place — at the center of every decision."},
                {icon:"📱",title:"Same-Day Appointments",body:"With a manageable panel, you offer same-day or next-day appointments as standard. Patients text you directly. You respond when you can. Medicine feels like medicine again."},
              ].map(c=>(
                <div className="card" key={c.title}>
                  <div className="card-icon">{c.icon}</div>
                  <div className="card-title">{c.title}</div>
                  <div className="card-body">{c.body}</div>
                </div>
              ))}
            </div>

            {!dSubmitted ? (
              <div className="form-wrap">
                <div className="form-section">
                  <div className="form-section-title">Physician Interest Application</div>
                  <div className="form-section-sub">No commitment — this starts a conversation. A BOS physician coordinator will reach out within 48 hours.</div>
                  <div className="form-row">
                    <div className="form-field"><label>Full Name *</label><input value={dForm.name} onChange={e=>df("name",e.target.value)} placeholder="Dr. _______________"/></div>
                    <div className="form-field"><label>Specialty *</label>
                      <select value={dForm.specialty} onChange={e=>df("specialty",e.target.value)}>
                        <option value="">Select specialty</option>
                        {SPECIALTIES.map(s=><option key={s}>{s}</option>)}
                      </select>
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-field"><label>Email *</label><input value={dForm.email} onChange={e=>df("email",e.target.value)} placeholder="dr@email.com" type="email"/></div>
                    <div className="form-field"><label>Phone</label><input value={dForm.phone} onChange={e=>df("phone",e.target.value)} placeholder="(760) 000-0000"/></div>
                  </div>
                  <div className="form-row">
                    <div className="form-field"><label>State Licensed</label><input value={dForm.state} onChange={e=>df("state",e.target.value)} placeholder="CA"/></div>
                    <div className="form-field"><label>Current Patient Panel Size</label><input value={dForm.currentPatients} onChange={e=>df("currentPatients",e.target.value)} placeholder="e.g. 2,200" /></div>
                  </div>
                  <div className="form-field">
                    <label>What's driving your interest in leaving the insurance model?</label>
                    <textarea value={dForm.why} onChange={e=>df("why",e.target.value)} placeholder="Be as candid as you'd like — burnout, documentation burden, inability to spend time with patients, income frustration..."/>
                  </div>
                  <div className="form-field">
                    <label>What would make this move possible for you?</label>
                    <textarea value={dForm.burnout} onChange={e=>df("burnout",e.target.value)} placeholder="Income floor needed, patient volume preferences, geographic constraints, timeline..."/>
                  </div>
                </div>
                <button className="submit-btn" onClick={calcDoctorResult} disabled={!dForm.name||!dForm.email||!dForm.specialty}>
                  Submit Physician Interest Form →
                </button>
              </div>
            ) : dResult && (
              <div className="form-wrap">
                <div className="success-box">
                  <div className="success-icon">⚕️</div>
                  <div className="success-title">Dr. {dForm.name.split(" ").slice(-1)[0]}, thank you.</div>
                  <div className="success-sub">Your interest form is received. A BOS physician coordinator will contact you within 48 hours to discuss your specific situation, income projections, and next steps — no pressure, no obligation.</div>
                  <div className="success-id">{dResult.id}</div>
                </div>
                <div className="result-box" style={{marginTop:20}}>
                  <div className="result-title">Your BOS DPC Income Projection</div>
                  <div className="result-row"><span className="result-label">Recommended Panel Size</span><span className="result-val">{dResult.panel} patients</span></div>
                  <div className="result-row"><span className="result-label">Membership Fee (avg)</span><span className="result-val">$89/month per member</span></div>
                  <div className="result-row"><span className="result-label">Estimated Gross Monthly Revenue</span><span className="result-val green">${dResult.grossMonthly.toLocaleString()}/month</span></div>
                  <div className="result-row"><span className="result-label">Estimated Gross Annual Revenue</span><span className="result-val green">${dResult.grossAnnual.toLocaleString()}/year</span></div>
                  <div className="result-row"><span className="result-label">Billing Staff Needed</span><span className="result-val">Zero</span></div>
                  <div className="result-row"><span className="result-label">Insurance Contracts Needed</span><span className="result-val">Zero</span></div>
                  <div className="result-row"><span className="result-label">Prior Authorizations</span><span className="result-val">Zero</span></div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* FACILITIES */}
        {view==="facilities" && (
          <div className="section">
            <div className="sec-label">Facility Partnership Program</div>
            <div className="sec-h2">Get paid in 10 days. No exceptions.</div>

            <div className="card-grid" style={{marginBottom:40}}>
              {[
                {icon:"⚡",title:"10-Day Payment Guarantee",body:"BOS pays all partner facility invoices within 10 business days of service confirmation. No more 90–180 day insurance payment cycles. No more claim denials. Cash in your account, fast."},
                {icon:"📊",title:"Volume Guarantee",body:"BOS brings pre-screened, pre-approved member volume. No cold outreach, no marketing spend for you. Negotiated rates mean guaranteed utilization — we send our members, you provide excellent care."},
                {icon:"🚫",title:"Zero Prior Authorizations",body:"Every BOS member referred to your facility has pre-approved access. No pre-certification calls. No 48-hour hold cycles. Service the patient, submit to BOS, get paid."},
                {icon:"📋",title:"Transparent Price Directory",body:"Your services are listed in the BOS Transparent Price Directory — a public, searchable tool that drives additional cash-pay patients to your facility beyond BOS membership volume."},
              ].map(c=>(
                <div className="card" key={c.title}>
                  <div className="card-icon">{c.icon}</div>
                  <div className="card-title">{c.title}</div>
                  <div className="card-body">{c.body}</div>
                </div>
              ))}
            </div>

            {!fSubmitted ? (
              <div className="form-wrap">
                <div className="form-section">
                  <div className="form-section-title">Facility Partnership Inquiry</div>
                  <div className="form-section-sub">Tell us about your facility. Our network coordinator will reach out within 3 business days with proposed contract terms and volume projections.</div>
                  <div className="form-row">
                    <div className="form-field"><label>Contact Name *</label><input value={fForm.name} onChange={e=>ff("name",e.target.value)} placeholder="Your name"/></div>
                    <div className="form-field"><label>Facility Name *</label><input value={fForm.facility} onChange={e=>ff("facility",e.target.value)} placeholder="Facility legal name"/></div>
                  </div>
                  <div className="form-field"><label>Facility Type *</label>
                    <select value={fForm.type} onChange={e=>ff("type",e.target.value)}>
                      <option value="">Select type</option>
                      {FACILITY_TYPES.map(t=><option key={t}>{t}</option>)}
                    </select>
                  </div>
                  <div className="form-row">
                    <div className="form-field"><label>City</label><input value={fForm.city} onChange={e=>ff("city",e.target.value)} placeholder="City"/></div>
                    <div className="form-field"><label>State</label><input value={fForm.state} onChange={e=>ff("state",e.target.value)} placeholder="CA"/></div>
                  </div>
                  <div className="form-field"><label>Services / Procedures Offered</label>
                    <textarea value={fForm.services} onChange={e=>ff("services",e.target.value)} placeholder="List your primary services, procedures, or specialties..."/>
                  </div>
                  <div className="form-field"><label>Current Annual Cash-Pay Volume (approximate)</label>
                    <select value={fForm.annualCashPay} onChange={e=>ff("annualCashPay",e.target.value)}>
                      <option value="">Select range</option>
                      <option>Under $100,000</option>
                      <option>$100,000 – $500,000</option>
                      <option>$500,000 – $2,000,000</option>
                      <option>Over $2,000,000</option>
                      <option>Prefer not to say</option>
                    </select>
                  </div>
                  <div className="form-field"><label>What's most important to you in a network partnership?</label>
                    <textarea value={fForm.interest} onChange={e=>ff("interest",e.target.value)} placeholder="Payment speed, volume guarantees, contract simplicity, price transparency, other..."/>
                  </div>
                </div>
                <button className="submit-btn" onClick={()=>setFSubmitted(true)} disabled={!fForm.name||!fForm.facility||!fForm.type}>
                  Submit Facility Partnership Inquiry →
                </button>
              </div>
            ) : (
              <div className="form-wrap">
                <div className="success-box">
                  <div className="success-icon">🏥</div>
                  <div className="success-title">Thank you, {fForm.name.split(" ")[0]}.</div>
                  <div className="success-sub">Your facility inquiry for <strong>{fForm.facility}</strong> is received. Our network coordinator will contact you within 3 business days with proposed contract terms, cash-pay rate benchmarks for your service category, and volume projections based on current BOS membership in your area.</div>
                  <div className="success-id">{genId("BOS-F-")}</div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* AI ADVISOR */}
        {view==="ai" && (
          <div className="section">
            <div className="sec-label">BOS Health AI</div>
            <div className="sec-h2">Ask anything.</div>
            <div className="chat-wrap">
              <div className="tabs">
                {[["member","I'm a Patient"],["doctor","I'm a Doctor"],["facility","I'm a Facility"]].map(([k,l])=>(
                  <button key={k} className={`tab ${chatMode===k?"active":""}`} onClick={()=>{setChatMode(k);setMessages([{role:"ai",content: k==="doctor" ? "Hello, Doctor. I understand you may be evaluating a different path — one where you actually have time to practice medicine. What's on your mind?" : k==="facility" ? "Hello — I'd like to talk through how a BOS facility partnership works for your organization. What type of facility are you with?" : "Hello — I'm the BOS Health cooperative AI. I can help you understand your membership, coverage, drug pricing, or specialist access. What would you like to know?"}])}}>{l}</button>
                ))}
              </div>
              <div className="chat-box">
                <div className="chat-header">
                  <div className="chat-avatar">🌿</div>
                  <div><div className="chat-name">BOS Health Advisor</div><div className="chat-status">● Online — powered by Claude AI</div></div>
                </div>
                <div className="messages" id="msgs">
                  {messages.map((m,i)=>(
                    <div key={i} className={`msg ${m.role}`}>{m.content}</div>
                  ))}
                  {chatLoading && <div className="msg ai loading">Thinking...</div>}
                </div>
                <div className="quick-btns">
                  {(chatMode==="doctor"?QUICK_PROMPTS_DOCTOR:chatMode==="facility"?QUICK_PROMPTS_FACILITY:QUICK_PROMPTS_MEMBER).map(q=>(
                    <button key={q} className="quick-btn" onClick={()=>sendChat(q)}>{q}</button>
                  ))}
                </div>
                <div className="chat-input-row">
                  <input className="chat-input" value={chatInput} onChange={e=>setChatInput(e.target.value)}
                    onKeyDown={e=>e.key==="Enter"&&!e.shiftKey&&sendChat()} placeholder="Ask anything about BOS Health..."/>
                  <button className="send-btn" onClick={()=>sendChat()} disabled={!chatInput.trim()||chatLoading}>Send</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SYSTEM PROMPT */}
        {view==="prompt" && (
          <div className="section">
            <div className="sec-label">Master System Prompt</div>
            <div className="sec-h2">Drop this into any AI.</div>
            <p style={{color:"#666",fontSize:14,marginBottom:24,fontWeight:300,lineHeight:1.7}}>
              This is the complete system prompt that powers the BOS Health AI Advisor. Copy it and paste it into Claude, ChatGPT, Gemini, or any AI as the system instruction. It will immediately behave as a fully-configured BOS Health cooperative advisor for members, doctors, and facilities.
            </p>
            <div className="prompt-box">
              <div className="prompt-label">// BOS HEALTH — MASTER SYSTEM PROMPT</div>
              <div className="prompt-text">{MASTER_PROMPT}</div>
              <button className="copy-btn" onClick={copyPrompt}>{copied?"✓ Copied!":"Copy Full Prompt"}</button>
            </div>
            <div className="card-grid">
              {[
                {icon:"🤖",title:"Use in Claude",body:"Go to claude.ai → New conversation → Click the system prompt field (if available) or paste directly as the first message with 'Use this as your system context:' prefix."},
                {icon:"💬",title:"Use in ChatGPT",body:"Go to ChatGPT → Custom Instructions → Paste in the 'How should ChatGPT respond?' field. Or use the API with system role message."},
                {icon:"⚙️",title:"Use in Any AI App",body:"In any AI platform that accepts a system prompt or 'instructions' field, paste the full prompt. The AI will immediately adopt the BOS Health advisor persona and knowledge base."},
                {icon:"🔧",title:"Customize It",body:"Modify the pricing, coverage details, geographic focus, or tone to match your specific cooperative's needs. The structure adapts to any DPC or health share model."},
              ].map(c=>(
                <div className="card" key={c.title}>
                  <div className="card-icon">{c.icon}</div>
                  <div className="card-title">{c.title}</div>
                  <div className="card-body">{c.body}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        <footer className="footer">
          <p>© 2026 <span>BOS Health Cooperative</span> — Rancho Mirage, CA — Community-Owned, Not-for-Profit</p>
          <p style={{marginTop:6}}>Not insurance. A community health cooperative operating under California law.</p>
        </footer>
      </div>
    </>
  );
}
