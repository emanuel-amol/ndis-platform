from fastapi import FastAPI
app = FastAPI(title="compliance-billing")
@app.get("/health") 
def health(): 
    return {"status":"ok","service":"compliance-billing"}
# TODO: add routers/ and services/ per module