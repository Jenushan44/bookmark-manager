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

  useEffect(() => {
    fetch("http://127.0.0.1:8000/bookmarks")
      .then((response) => response.json())
      .then((data) => setBookmarks(data));
  }, []);


  return (
    <div className="flex min-h-screen bg-[#0f1621]">
      <Navbar />
      <div className="flex-1 p-8 bg-[#090f18]">

        <div className="flex">
          <div className="max-w-5xl">
            <p className="flex text-3xl font-semibold items-center gap-2"><Bookmark className="fill-[#5c50dc]" color="#5c50dc" size={45} />Bookmark Manager</p>
            <p className="mt-2 ml-14 text-gray-600">Save and organize useful links.</p>
          </div>

          <button className="ml-auto flex items-center gap-2 rounded-md border border-[#5e54e0] bg-[#5e54e0] px-4 py-2 h-[50px] cursor-pointer"><Plus /> Add Bookmark</button>
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

        <div>
          {bookmarks.map((bookmark) => (
            <div key={bookmark.id}>
              <BookmarkCard id={bookmark.id} title={bookmark.title} url={bookmark.url} category={bookmark.category} description={bookmark.description} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}