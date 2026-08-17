# Validate both input and output data

from pydantic import BaseModel
from datetime import datetime

class BookmarkCreate(BaseModel):
    title: str | None = None
    url: str
    category: str = "Other"
    description: str | None = None

class BookmarkResponse(BaseModel):
    id: int
    title: str | None
    url: str
    category: str
    description: str | None
    date: datetime

    class Config:
        from_attributes = True