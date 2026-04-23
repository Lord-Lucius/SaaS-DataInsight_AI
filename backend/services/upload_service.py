import uuid
from fastapi import UploadFile
from backend.models.schema import response_model

async def create_upload_file(file: UploadFile):
    if not file:
        return {"error": "No file given"}

    content = await file.read()
    if not content:
        return {"error": "No content in the file"}
    return response_model(status="succes", file_id=str(uuid.uuid4()))
