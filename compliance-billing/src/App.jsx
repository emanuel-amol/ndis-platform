import { Link, Routes, Route, Navigate } from "react-router-dom";
function Compliance(){ const creds=[{id:1,name:"First Aid",status:"Valid",expires:"2026-04-01"},{id:2,name:"WWCC",status:"Expiring Soon",expires:"2025-09-10"}];
  return <div className="grid">{creds.map(c=><div key={c.id} className="card"><h3>{c.name}</h3><p>Status: {c.status}</p><p>Expires: {c.expires}</p><button className="btn">Send Reminder</button></div>)}</div>; }
function Comms(){ return <div className="card"><h3>Templates</h3><textarea rows="6" style={{width:"100%"}}></textarea><div style={{marginTop:10,display:"flex",gap:8}}><button className="btn">Send Email</button><button className="btn">Send SMS</button></div></div>; }
export default function App(){ return (<div className="page"><h1>Compliance & Comms</h1>
  <nav className="tabs"><Link to="/">Compliance</Link><Link to="/comms">Comms</Link><a href="/"> Back</a></nav>
  <Routes><Route index element={<Compliance/>}/><Route path="comms" element={<Comms/>}/><Route path="*" element={<Navigate to="/" replace/>}/></Routes>
</div>); }