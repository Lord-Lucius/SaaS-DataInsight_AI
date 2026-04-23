from fastapi import APIRouter, UploadFile, HTTPException
from typing import Optional
from backend.services.upload_service import create_upload_file

router = APIRouter()

@router.post("/upload/")
async def upload_router(file: Optional[UploadFile] = None):
	if not file:
		raise HTTPException(status_code=400, detail="No file provided")
	return	await create_upload_file(file)
