from fastapi import FastAPI
from typing import List, Any
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/categories", response_model=List[str])
async def get_categories():
    return ["samochody", "slodycze", "rowery"]


@app.get("/items", response_model=list[dict[str, Any]])
async def get_categories():
    return [
        {"samochody": ["BMW", "Audi", "Fiat"]},
        {"slodycze": ["Lukrecja", "Zozole"]},
        {"rowery": ["Romet", "Kross"]}
    ]



if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
