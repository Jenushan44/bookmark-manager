# Defines what the database tables should look like

from sqlalchemy import Column, Integer, String, DateTime
from datetime import datetime
from database import Base

class Bookmark(Base): 
  __tablename__ = "bookmarks"
  id = Column(Integer, primary_key=True, index=True)
  title = Column(String, nullable=True)
  url = Column(String, nullable=False)
  date = Column(DateTime, default=datetime.utcnow)
  category = Column(String, default="Other", nullable=False)
  description = Column(String, nullable=True)