from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.health import router as health_router
from app.api.profile import router as profile_router
from app.api.search import router as search_router
from app.api.skills import router as skills_router
from app.api.upload import router as upload_router


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(health_router)
app.include_router(profile_router)
app.include_router(skills_router)
app.include_router(search_router)
app.include_router(upload_router)


@app.get("/")
def get_me():
    return {"message":"its working baby"}
