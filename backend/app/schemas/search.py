from app.schemas.profile import ProfileResponse

from pydantic import BaseModel, Field


class SearchResponse(BaseModel):
    items: list[ProfileResponse]
    total: int
    limit: int = Field(..., ge=1)
    offset: int = Field(..., ge=0)
