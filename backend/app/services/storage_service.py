import asyncio
from pathlib import Path
from uuid import uuid4

from fastapi import UploadFile
from sqlalchemy.orm import Session

from app.core.config import SUPABASE_STORAGE_BUCKET, supabase
from app.models.profile import Profile


class InvalidFileTypeError(Exception):
    pass


class ProfileNotFoundError(Exception):
    pass


class ProfileForbiddenError(Exception):
    pass


class StorageUploadError(Exception):
    pass


PDF_MIME_TYPE = "application/pdf"


async def upload_resume(
    db: Session,
    profile_id: int,
    file: UploadFile,
    user_id: str,
) -> str:
    if file.content_type != PDF_MIME_TYPE:
        raise InvalidFileTypeError("Only PDF files are allowed.")

    profile = db.get(Profile, profile_id)
    if profile is None:
        raise ProfileNotFoundError
    if profile.user_id != user_id:
        raise ProfileForbiddenError

    contents = await file.read()
    if not contents:
        raise InvalidFileTypeError("Uploaded PDF file is empty.")

    filename = Path(file.filename or "resume.pdf").name
    storage_path = f"profiles/{user_id}/{profile_id}/resumes/{uuid4()}-{filename}"

    try:
        await asyncio.to_thread(
            supabase.storage.from_(SUPABASE_STORAGE_BUCKET).upload,
            storage_path,
            contents,
            {"content-type": PDF_MIME_TYPE, "upsert": "true"},
        )
        public_url = await asyncio.to_thread(
            supabase.storage.from_(SUPABASE_STORAGE_BUCKET).get_public_url,
            storage_path,
        )
    except Exception as exc:
        raise StorageUploadError("Failed to upload resume to storage.") from exc

    profile.resume_url = public_url
    db.commit()
    db.refresh(profile)
    return public_url
