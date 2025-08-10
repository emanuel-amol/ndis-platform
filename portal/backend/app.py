from fastapi import FastAPI
app = FastAPI(title="portal-core")
@app.get("/health") 
def health(): 
    return {"status":"ok","service":"portal-core"}
# TODO: add routers/ and services/ per module