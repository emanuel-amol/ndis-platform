import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
export default defineConfig({ plugins:[react()], base:"/onboarding/", server:{ port:5102 } });