import uuid
from fastapi import UploadFile, HTTPException
from backend.models.schema import response_model
from backend.validators.validators import check_csv_validity

async def create_upload_file(file: UploadFile):
    if not file:
        raise HTTPException(status_code=400, detail="No file given")
    content: bytes = await check_csv_validity(file)

    if not content:
        raise HTTPException(status_code=400, detail="No content in the file")
    
    return response_model(status="succes", file_id=str(uuid.uuid4()))
