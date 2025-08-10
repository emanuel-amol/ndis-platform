from fastapi import FastAPI
app = FastAPI(title="onboarding")
@app.get("/health") 
def health(): 
    return {"status":"ok","service":"onboarding"}
# TODO: add routers/ and services/ per module