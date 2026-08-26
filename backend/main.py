from fastapi import FastAPI
from schemas import BookmarkCreate, BookmarkUpdate
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

@app.get("/bookmarks/{bookmark_id}")
def get_bookmark_by_id(bookmark_id: int): 
  db = SessionLocal()

  bookmark = db.query(Bookmark).filter(Bookmark.id == bookmark_id).first()

  db.close()

  if bookmark == None: 
    return "Error: Bookmark not found"

  return bookmark

@app.delete("/bookmarks/{bookmark_id}")
def delete_bookmark_by_id(bookmark_id: int): 
  db = SessionLocal()

  bookmark = db.query(Bookmark).filter(Bookmark.id == bookmark_id).first()

  if bookmark == None: 
    db.close()
    return {"error": "Bookmark not found"}

  db.delete(bookmark)

  db.commit()
  db.close()

  

  return {"message": "Bookmark successfully deleted"}

@app.patch("/bookmarks/{bookmark_id}")
def update_bookmark_by_id(bookmark_id: int, updates: BookmarkUpdate): 
  db = SessionLocal()

  bookmark = db.query(Bookmark).filter(Bookmark.id == bookmark_id).first()

  if bookmark is None: 
    db.close()
    return {"error": "Bookmark not found"}

  if updates.title is not None: 
    bookmark.title = updates.title

  if updates.url is not None:
    bookmark.url = updates.url

  if updates.category is not None:
      bookmark.category = updates.category

  if updates.description is not None:
      bookmark.description = updates.description

  db.commit()
  db.refresh(bookmark)
  db.close()

  return bookmark
    