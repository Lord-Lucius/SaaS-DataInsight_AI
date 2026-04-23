from pydantic import BaseModel

class response_model(BaseModel):
    status: str = "failed"
    file_id: str
