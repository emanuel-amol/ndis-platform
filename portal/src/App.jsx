import { Routes, Route, Navigate, useLocation, Link } from "react-router-dom";
import { useState } from "react";

const authKey = "auth";
const getAuth = () => { try { return JSON.parse(localStorage.getItem(authKey)||"null"); } catch { return null; } };
const setAuth = (a) => localStorage.setItem(authKey, JSON.stringify(a));
const clearAuth = () => localStorage.removeItem(authKey);

function Login(){
  const [name,setName]=useState(""); const [role,setRole]=useState("worker"); const loc=useLocation();
  const to = (loc.state?.from?.pathname) || "/dashboard";
  return (<div className="page"><div className="card">
    <h2>Login (visual only)</h2>
    <label>Name</label><input value={name} onChange={e=>setName(e.target.value)}/>
    <label>Role</label>
    <select value={role} onChange={e=>setRole(e.target.value)}>
      <option value="worker">Support Worker</option><option value="coordinator">Coordinator</option>
      <option value="hr">HR</option><option value="admin">Admin</option>
    </select>
    <button className="btn" onClick={()=>{ if(!name.trim())return; setAuth({name,role}); location.href=to; }}>Continue</button>
  </div></div>);
}

function Dashboard(){
  const auth=getAuth()||{role:"worker"};
  const tiles=[
    { href:"/talent/",     label:"Talent & AI Ranking", roles:["admin","hr","coordinator"] },
    { href:"/onboarding/", label:"Onboarding",          roles:["admin","hr","coordinator"] },
    { href:"/rostering/",  label:"Rostering & SIL",     roles:["admin","coordinator"] },
    { href:"/compliance/", label:"Compliance & Comms",  roles:["admin","hr"] },
    { href:"/tickets/",    label:"HR Ticketing & Incidents", roles:["admin","hr","worker","coordinator"] }
  ].filter(t=>t.roles.includes(auth.role));
  return (<div className="page">
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
      <h2>Dashboard</h2>
      <button className="btn" onClick={()=>{ clearAuth(); location.href="/"; }}>Logout ({auth?.name||"?"})</button>
    </div>
    <div className="grid">{tiles.map(t=>(<a key={t.href} href={t.href} className="tile">{t.label}</a>))}
      <a href="/rostering/" className="tile">SIL House Mgmt</a>
      <a href="/compliance/" className="tile">Communications</a>
    </div>
  </div>);
}

export default function App(){
  const authed = !!getAuth();
  return (<Routes>
    <Route path="/" element={<Navigate to={authed?"/dashboard":"/login"} replace/>}/>
    <Route path="/login" element={<Login/>}/>
    <Route path="/dashboard" element={authed?<Dashboard/>:<Navigate to="/login" replace/>}/>
    <Route path="*" element={<Navigate to="/" replace/>}/>
  </Routes>);
}