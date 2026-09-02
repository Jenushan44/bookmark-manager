"use client"
import { Bookmark, Search, Plus } from "lucide-react"
import Navbar from "../components/Navbar"
import BookmarkCard from "../components/BookmarkCard"
import { useState, useEffect } from 'react';

type BookmarkType = {
  id: number;
  title: string | null;
  url: string;
  category: string;
  description: string | null;
};

export default function Home() {
  const [bookmarks, setBookmarks] = useState<BookmarkType[]>([]);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [category, setCategory] = useState("Work");
  const [description, setDescription] = useState("");

  const [editingId, setEditingId] = useState<number | null>(null);
  const [isEditOpen, setIsEditOpen] = useState(false);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/bookmarks")
      .then((response) => response.json())
      .then((data) => setBookmarks(data));
  }, []);

  const addBookmark = () => {
    fetch("http://127.0.0.1:8000/bookmarks", {
      method: "POST",
      headers: { "Content-Type": "application/json", },
      body: JSON.stringify({ title: title || null, url: url, category: category, description: description || null, }),
    })
      .then((response) => response.json())
      .then((newBookmark) => { setBookmarks([...bookmarks, newBookmark]); setTitle(""); setUrl(""); setCategory("Work"); setDescription(""); setIsAddOpen(false); });
  };


  const deleteBookmark = (id: number) => {
    fetch(`http://127.0.0.1:8000/bookmarks/${id}`, { method: "DELETE", }).then(() => { setBookmarks(bookmarks.filter((bookmark) => bookmark.id !== id)); });
  };

  const openEditModal = (bookmark: BookmarkType) => {
    setEditingId(bookmark.id);
    setTitle(bookmark.title || "");
    setUrl(bookmark.url);
    setCategory(bookmark.category);
    setDescription(bookmark.description || "");
    setIsEditOpen(true);
  };

  const editBookmark = (id: number) => {
    fetch(`http://127.0.0.1:8000/bookmarks/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json", },
      body: JSON.stringify({ title: title || null, url: url, category: category, description: description || null, }),
    })
      .then((response) => response.json())
      .then((updatedBookmark) => {
        setBookmarks(bookmarks.map((bookmark) => bookmark.id === id ? updatedBookmark : bookmark));

        setIsEditOpen(false);
        setEditingId(null);


      });
  };


  return (
    <div className="flex min-h-screen bg-[#0f1621]">
      <Navbar />
      <div className="flex-1 p-8 bg-[#090f18]">

        <div className="flex">
          <div className="max-w-5xl">
            <p className="flex text-3xl font-semibold items-center gap-2"><Bookmark className="fill-[#5c50dc]" color="#5c50dc" size={45} />Bookmark Manager</p>
            <p className="mt-2 ml-14 text-gray-600">Save and organize useful links.</p>
          </div>

          <button onClick={() => setIsAddOpen(true)} className="ml-auto flex items-center gap-2 rounded-md border border-[#5e54e0] bg-[#5e54e0] px-4 py-2 h-[50px] cursor-pointer"><Plus />Add Bookmark</button>
        </div>


        <div className="flex items-center gap-5">
          <div className="mt-8 flex items-center border-1 rounded-md border-gray-800 p-1 pl-2 py-2 w-1/3 gap-2">
            <Search size={18} />
            <input className="w-full outline-none" placeholder="Search bookmarks..." />
          </div>

          <div className="mt-8 border-gray-800 border-1 rounded-md p-1 pl-2 py-2 w-1/5 bg-[#121a25]">
            <select className="w-full outline-none cursor-pointer">
              <option>All Categories</option>
            </select>
          </div>

          <div className="ml-auto flex items-center mt-8">
            <p className="text-gray-400 font-semibold">0 bookmarks</p>
          </div>

        </div>

        <div className="flex gap-3 mt-5">
          {bookmarks.map((bookmark) => (
            <div key={bookmark.id}>
              <BookmarkCard id={bookmark.id} title={bookmark.title} url={bookmark.url} category={bookmark.category} description={bookmark.description} deleteBookmark={deleteBookmark} openEditModal={() => openEditModal(bookmark)} />
            </div>
          ))}
        </div>
      </div>
      {isAddOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
          <div className="bg-[#121a25] border border-gray-700 rounded-lg p-6 w-[400px] flex flex-col">
            <p className="text-xl font-semibold">Add Bookmark</p>
            <hr className="mt-1" />
            <div className="mt-5 flex gap-1">
              <p>Title</p>
              <p className="text-gray-400">(Optional)</p>
            </div>
            <input value={title} onChange={(event) => setTitle(event.target.value)} className="mt-2 border-1 border-gray-500 rounded-md p-1 pl-2" placeholder="e.g. FastAPI Docs" />

            <div className="mt-5 flex gap-1">
              <p>URL</p>
              <p className="text-red-800">*</p>
            </div>
            <input value={url} onChange={(event) => setUrl(event.target.value)} className="mt-2 border-1 border-gray-500 rounded-md p-1 pl-2" placeholder="https://example.com" />

            <div className="mt-5 flex gap-1">
              <p>Category</p>
            </div>
            <select value={category} onChange={(event) => setCategory(event.target.value)} className="mt-2 border-1 border-gray-500 rounded-md p-1 pl-2 pr-2 cursor-pointer">
              <option className="bg-[#121a25] cursor-pointer">Work</option>
              <option className="bg-[#121a25] cursor-pointer">Education</option>
              <option className="bg-[#121a25] cursor-pointer">Technology</option>
              <option className="bg-[#121a25] cursor-pointer">News</option>
              <option className="bg-[#121a25] cursor-pointer">Entertainment</option>
              <option className="bg-[#121a25] cursor-pointer">Shopping</option>
              <option className="bg-[#121a25] cursor-pointer">Finance</option>
              <option className="bg-[#121a25] cursor-pointer">Health</option>
              <option className="bg-[#121a25] cursor-pointer">Travel</option>
              <option className="bg-[#121a25] cursor-pointer">Social</option>
              <option className="bg-[#121a25] cursor-pointer">Reference</option>
              <option className="bg-[#121a25] cursor-pointer">Other</option>
            </select>

            <div className="mt-5 flex gap-1">
              <p>Description</p>
              <p className="text-gray-400">(Optional)</p>
            </div>
            <textarea value={description} onChange={(event) => setDescription(event.target.value)} className="mt-2 border-1 border-gray-500 rounded-md p-1 pl-2 h-40" placeholder="Add a short description..." />

            <div className="flex ml-auto gap-3">
              <button onClick={() => setIsAddOpen(false)} className="mt-5 border border-gray-600 rounded-md px-4 py-2 cursor-pointer hover:bg-red-600 transition-colors font-medium">Close</button>
              <button onClick={addBookmark} className="mt-5 border border-gray-600 rounded-md px-4 py-2 cursor-pointer bg-[#5e54e0] transition-colors font-medium">Add Bookmark</button>
            </div>
          </div>
        </div>
      )}

      {isEditOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
          <div className="bg-[#121a25] border border-gray-700 rounded-lg p-6 w-[400px] flex flex-col">

            <p className="text-xl font-semibold">Edit Bookmark</p>
            <hr className="mt-1" />

            <div className="mt-5 flex gap-1">
              <p>Title</p>
              <p className="text-gray-400">(Optional)</p>
            </div>

            <input value={title} onChange={(event) => setTitle(event.target.value)} className="mt-2 border border-gray-500 rounded-md p-1 pl-2" />
            <div className="mt-5">
              <p>URL</p>
            </div>

            <input value={url} onChange={(event) => setUrl(event.target.value)} className="mt-2 border border-gray-500 rounded-md p-1 pl-2" />

            <div className="mt-5">
              <p>Category</p>
            </div>

            <select value={category} onChange={(event) => setCategory(event.target.value)} className="mt-2 border border-gray-500 rounded-md p-1 pl-2">
              <option>Work</option>
              <option>Education</option>
              <option>Technology</option>
              <option>News</option>
              <option>Entertainment</option>
              <option>Shopping</option>
              <option>Finance</option>
              <option>Health</option>
              <option>Travel</option>
              <option>Social</option>
              <option>Reference</option>
              <option>Other</option>
            </select>

            <div className="mt-5 flex gap-1">
              <p>Description</p>
              <p className="text-gray-400">(Optional)</p>
            </div>

            <textarea value={description} onChange={(event) => setDescription(event.target.value)} className="mt-2 border border-gray-500 rounded-md p-1 pl-2 h-40" />

            <div className="flex ml-auto gap-3">
              <button onClick={() => setIsEditOpen(false)} className="mt-5 border border-gray-600 rounded-md px-4 py-2">Cancel</button>

              <button
                onClick={() => {
                  if (editingId !== null) {
                    editBookmark(editingId);
                  }
                }}
                className="mt-5 border border-gray-600 rounded-md px-4 py-2 bg-[#5e54e0]">
                Save Changes
              </button>
            </div>

          </div>
        </div>
      )}


    </div>
  );
}