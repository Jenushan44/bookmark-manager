from fastapi import FastAPI
from database import SessionLocal
from schemas import BookmarkCreate
from models import Bookmark

app = FastAPI()

@app.get("/")
def home(): 
  return {"message": "/"}

@app.post("/bookmarks")
def add_bookmark(bookmark: BookmarkCreate): 
  db = SessionLocal()

  new_bookmark = Bookmark(
    title = bookmark.title, 
    url = bookmark.url, 
    category = bookmark.category, 
    description = bookmark.description,
  )

  db.add(new_bookmark)
  db.commit()
  db.close()

  return new_bookmark