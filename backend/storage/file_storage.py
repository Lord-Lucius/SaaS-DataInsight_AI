import pathlib
import uuid
from fastapi import HTTPException
from backend.models.schema import response_model

def save_file(content: bytes, filename: str):
    name = pathlib.Path(filename).name
    if not name:
        raise HTTPException(status_code=400, detail="Invalid filename")
    id = str(uuid.uuid4())
