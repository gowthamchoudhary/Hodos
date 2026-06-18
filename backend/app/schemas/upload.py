from pydantic import BaseModel


class ResumeUploadResponse(BaseModel):
    profile_id: int
    resume_url: str
    message: str
