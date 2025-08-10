import { Link, Routes, Route, Navigate } from "react-router-dom";
function Jobs(){ const jobs=[{id:1,title:"Support Worker - Morning Shifts"},{id:2,title:"Community Care - Weekend"}];
  return <div className="grid">{jobs.map(j=><div key={j.id} className="card"><h3>{j.title}</h3><button className="btn">View</button></div>)}</div>; }
function Candidates(){ const items=[{id:1,name:"Alex"},{id:2,name:"Priya"},{id:3,name:"Sam"}];
  return <div className="grid">{items.map(c=><div key={c.id} className="card"><h3>{c.name}</h3><div>AI Rank: {Math.round(Math.random()*100)}</div></div>)}</div>; }
export default function App(){ return (<div className="page">
  <h1>Talent & AI Ranking</h1><nav className="tabs"><Link to="/">Jobs</Link><Link to="/candidates">Candidates</Link><a href="/"> Back</a></nav>
  <Routes><Route index element={<Jobs/>}/><Route path="candidates" element={<Candidates/>}/><Route path="*" element={<Navigate to="/" replace/>}/></Routes>
</div>); }