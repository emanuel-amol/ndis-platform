from fastapi import FastAPI
app = FastAPI(title="rostering-sil")
@app.get("/health") 
def health(): 
    return {"status":"ok","service":"rostering-sil"}
# TODO: add routers/ and services/ per module