from pydantic import BaseModel, Field

from app.schemas.profile import ProfileResponse
from app.schemas.skills import SkillResponse


class GalleryProfileResponse(ProfileResponse):
    skills: list[SkillResponse]


class GalleryResponse(BaseModel):
    items: list[GalleryProfileResponse]
    total: int
    limit: int = Field(..., ge=1)
    offset: int = Field(..., ge=0)
