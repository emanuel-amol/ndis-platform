import { Link, Routes, Route, Navigate } from "react-router-dom";
function Rostering(){ const shifts=[{id:1,worker:"Alice",time:"09:0013:00"},{id:2,worker:"Bob",time:"13:0017:00"}];
  return <div className="grid">{shifts.map(s=><div key={s.id} className="card"><h3>{s.worker}</h3><p>{s.time}</p><button className="btn">Assign</button></div>)}</div>; }
function SILHomes(){ const homes=[{id:1,name:"Maple House",rooms:4},{id:2,name:"Ocean View",rooms:3}];
  return <div className="grid">{homes.map(h=><div key={h.id} className="card"><h3>{h.name}</h3><p>Rooms: {h.rooms}</p></div>)}</div>; }
export default function App(){ return (<div className="page"><h1>Rostering & SIL</h1>
  <nav className="tabs"><Link to="/">Rostering</Link><Link to="/sil">SIL Homes</Link><a href="/"> Back</a></nav>
  <Routes><Route index element={<Rostering/>}/><Route path="sil" element={<SILHomes/>}/><Route path="*" element={<Navigate to="/" replace/>}/></Routes>
</div>); }