from fastapi import FastAPI
from schemas import BookmarkCreate
from models import Bookmark
from database import SessionLocal, Base, engine

Base.metadata.create_all(bind=engine)

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

@app.get("/bookmarks")
def get_bookmarks(): 
  db = SessionLocal()

  bookmarks = db.query(Bookmark).all()

  db.close()

  return bookmarks