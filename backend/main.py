from fastapi import FastAPI
from backend.core.config import settings
from backend.routes.upload import router as upload_router

app = FastAPI(
    title=settings.APP_NAME,
    version=settings.APP_VERSION,
)

@app.get("/")
def root():
    return {"app": settings.APP_NAME, "version": settings.APP_VERSION}


@app.get("/health")
def health_check():
    return {"status": "healthy"}

app.include_router(upload_router, prefix="/api", tags=["upload"])
