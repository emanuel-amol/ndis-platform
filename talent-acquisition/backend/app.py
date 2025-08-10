from fastapi import FastAPI
app = FastAPI(title="talent")
@app.get("/health") 
def health(): 
    return {"status":"ok","service":"talent"}
# TODO: add routers/ and services/ per module