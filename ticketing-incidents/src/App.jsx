import { Link, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
function Ticketing(){ const [items,setItems]=useState([{id:1,title:"Update certificate",status:"Open"},{id:2,title:"Roster conflict Tue",status:"In Progress"}]); const [title,setTitle]=useState("");
  return (<><div className="card"><h3>New Ticket</h3><input placeholder="Describe your issue" value={title} onChange={e=>setTitle(e.target.value)} />
  <button className="btn" onClick={()=>{ if(!title.trim())return; setItems([{id:Date.now(),title,status:"Open"},...items]); setTitle(""); }}>Submit</button></div>
  <div className="grid">{items.map(t=><div key={t.id} className="card"><h3>{t.title}</h3><p>Status: {t.status}</p></div>)}</div></>); }
function Incidents(){ return <div className="card"><h3>Incident Log</h3><input placeholder="Title"/><textarea rows="6" style={{width:"100%"}}></textarea><input type="file"/><div style={{marginTop:10}}><button className="btn">Save Draft</button></div></div>; }
export default function App(){ return (<div className="page"><h1>HR Ticketing & Incidents</h1>
  <nav className="tabs"><Link to="/">Ticketing</Link><Link to="/incidents">Incidents</Link><a href="/"> Back</a></nav>
  <Routes><Route index element={<Ticketing/>}/><Route path="incidents" element={<Incidents/>}/><Route path="*" element={<Navigate to="/" replace/>}/></Routes>
</div>); }