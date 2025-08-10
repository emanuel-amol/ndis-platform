import { Link, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
function Wizard(){ const steps=["Profile","Checks","Contracts","Complete"]; const [i,setI]=useState(0);
  return <div className="card"><h3>Step {i+1} of {steps.length}: {steps[i]}</h3><p>Placeholder for {steps[i]}.</p>
    <div style={{display:"flex",gap:8}}><button className="btn" disabled={i===0} onClick={()=>setI(x=>x-1)}>Back</button>
    <button className="btn" disabled={i===steps.length-1} onClick={()=>setI(x=>x+1)}>Next</button></div></div>; }
function Uploads(){ return <div className="card"><h3>Uploads</h3><input type="file"/></div>; }
export default function App(){ return (<div className="page"><h1>Onboarding</h1>
  <nav className="tabs"><Link to="/">Wizard</Link><Link to="/uploads">Uploads</Link><a href="/">← Back</a></nav>
  <Routes><Route index element={<Wizard/>}/><Route path="uploads" element={<Uploads/>}/><Route path="*" element={<Navigate to="/" replace/>}/></Routes>
</div>); }