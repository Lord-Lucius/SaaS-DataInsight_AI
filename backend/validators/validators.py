import pathlib
from fastapi import UploadFile, HTTPException
from backend.core.config import settings

async def check_csv_validity(file: UploadFile):
	if file.content_type != "text/csv":
		raise HTTPException(status_code=415, detail="File is not a csv")
	if not file and pathlib.Path(file.filename).suffix != ".csv":
		raise HTTPException(status_code=400, detail="file extension miss matched")
	content = await file.read()
	if len(content) >= (settings.MAX_FILE_SIZE_MB * 1024 * 1024):
		raise HTTPException(status_code=413, detail="file size too big")
	await file.seek(0)
	return content
