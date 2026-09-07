from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from schemas import BookmarkCreate, BookmarkUpdate
from models import Bookmark
from database import SessionLocal, Base, engine
from firebase_auth import get_current_user

Base.metadata.create_all(bind=engine)

app = FastAPI()

app.add_middleware(CORSMiddleware, allow_origins=["http://localhost:3000", "http://127.0.0.1:3000",], allow_credentials=True, allow_methods=["*"], allow_headers=["*"],)

@app.get("/")
def home(): 
  return {"message": "/"}

@app.post("/bookmarks")
def add_bookmark(bookmark: BookmarkCreate, current_user = Depends(get_current_user)): 
  db = SessionLocal()

  new_bookmark = Bookmark(
    title = bookmark.title, 
    url = bookmark.url, 
    category = bookmark.category, 
    description = bookmark.description,
    user_id = current_user["uid"],
  )

  db.add(new_bookmark)
  db.commit()
  db.refresh(new_bookmark)
  db.close()

  return new_bookmark

@app.get("/bookmarks")
def get_bookmarks(current_user = Depends(get_current_user)): 
  db = SessionLocal()

  bookmarks = db.query(Bookmark).filter(Bookmark.user_id == current_user["uid"]).all()

  db.close()

  return bookmarks

@app.get("/bookmarks/{bookmark_id}")
def get_bookmark_by_id(bookmark_id: int, current_user = Depends(get_current_user)):
  db = SessionLocal()

  bookmark = db.query(Bookmark).filter(Bookmark.id == bookmark_id, Bookmark.user_id == current_user["uid"]).first()

  db.close()

  if bookmark == None: 
    return "Error: Bookmark not found"

  return bookmark

@app.delete("/bookmarks/{bookmark_id}")
def delete_bookmark_by_id(bookmark_id: int, current_user = Depends(get_current_user)): 
  db = SessionLocal()

  bookmark = db.query(Bookmark).filter(Bookmark.id == bookmark_id, Bookmark.user_id == current_user["uid"]).first()

  if bookmark == None: 
    db.close()
    return {"error": "Bookmark not found"}

  db.delete(bookmark)

  db.commit()
  db.close()

  

  return {"message": "Bookmark successfully deleted"}

@app.patch("/bookmarks/{bookmark_id}")
def update_bookmark_by_id(bookmark_id: int, updates: BookmarkUpdate, current_user = Depends(get_current_user)): 
  db = SessionLocal()

  bookmark = db.query(Bookmark).filter(Bookmark.id == bookmark_id, Bookmark.user_id == current_user["uid"]).first()

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

  if updates.is_favorite is not None:
    bookmark.is_favorite = updates.is_favorite

  db.commit()
  db.refresh(bookmark)
  db.close()

  return bookmark
    