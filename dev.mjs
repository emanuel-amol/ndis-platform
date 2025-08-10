import { spawn } from "node:child_process";
import http from "node:http";
import httpProxy from "http-proxy";
import open from "open";
import { existsSync } from "node:fs";

const apps = [
  { name:"portal", dir:"portal",               port:5100, base:"/" },
  { name:"talent", dir:"talent-acquisition",   port:5101, base:"/talent/" },
  { name:"onboarding", dir:"onboarding",       port:5102, base:"/onboarding/" },
  { name:"rostering", dir:"rostering-sil",     port:5103, base:"/rostering/" },
  { name:"compliance", dir:"compliance-billing", port:5104, base:"/compliance/" },
  { name:"tickets", dir:"ticketing-incidents", port:5105, base:"/tickets/" }
];

function sh(cmd, args, cwd) {
  return new Promise((resolve, reject) => {
    const p = spawn(cmd, args, { cwd, shell:true, stdio:"inherit" });
    p.on("exit", c => c===0 ? resolve() : reject(new Error(`${cmd} ${args.join(" ")} -> ${c}`)));
  });
}

async function ensureDeps() {
  for (const a of apps) {
    if (!existsSync(`${a.dir}/node_modules`)) {
      console.log(`[${a.name}] installing deps`);
      await sh("npm", ["install","--no-fund","--no-audit"], a.dir);
    }
  }
}

async function startApps() {
  for (const a of apps) {
    console.log(`[${a.name}] dev on ${a.base} -> :${a.port}`);
    spawn("npm", ["run","dev","--","--port", String(a.port), "--base", a.base], {
      cwd: a.dir, shell:true, stdio:"inherit"
    });
  }
}

function targetFor(url="") {
  if (url.startsWith("/talent/")) return "http://localhost:5101";
  if (url.startsWith("/onboarding/")) return "http://localhost:5102";
  if (url.startsWith("/rostering/")) return "http://localhost:5103";
  if (url.startsWith("/compliance/")) return "http://localhost:5104";
  if (url.startsWith("/tickets/")) return "http://localhost:5105";
  return "http://localhost:5100";
}

async function main(){
  await ensureDeps();
  await startApps();

  const proxy = httpProxy.createProxyServer({});
  const server = http.createServer((req,res)=>{
    proxy.web(req,res,{ target: targetFor(req.url) }, (err)=>{ res.writeHead(502); res.end("Proxy error "+err.message); });
  });
  server.on("upgrade", (req,sock,head)=>{
    proxy.ws(req,sock,head,{ target: targetFor(req.url).replace("http","ws") });
  });
  server.listen(8080, ()=> {
    console.log(" http://localhost:8080  / (portal) and /talent/ /onboarding/ /rostering/ /compliance/ /tickets/");
    open("http://localhost:8080").catch(()=>{});
  });
}
main().catch(e=>{ console.error(e); process.exit(1); });