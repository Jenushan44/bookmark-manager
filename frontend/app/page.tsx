"use client"
import { Bookmark, Search, Plus, Info, Star, Pencil, Trash2, Clock, BookMarked, ChevronUp, ChevronDown } from "lucide-react"
import Navbar from "../components/Navbar"
import BookmarkCard from "../components/BookmarkCard"
import { useState, useEffect, useRef } from 'react';

type BookmarkType = {
  id: number;
  title: string | null;
  url: string;
  category: string;
  description: string | null;
  is_favorite: boolean;
  date: string;
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

  const [selectedBookmark, setSelectedBookmark] = useState<BookmarkType | null>(null);
  const [isInfoOpen, setIsInfoOpen] = useState(false);

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");

  const favouriteBookmarks = bookmarks.filter((bookmark) => bookmark.is_favorite);
  const [showAllFavourites, setShowAllFavourites] = useState(false);
  const [showAllRecents, setShowAllRecents] = useState(false);


  const favouritesContainerRef = useRef<HTMLDivElement>(null);
  const recentsContainerRef = useRef<HTMLDivElement>(null);

  const [visibleFavourites, setVisibleFavourites] = useState(4);
  const [visibleRecents, setVisibleRecents] = useState(4);


  useEffect(() => {
    fetch("http://127.0.0.1:8000/bookmarks")
      .then((response) => response.json())
      .then((data) => setBookmarks(data));
  }, []);

  useEffect(() => {
    const calculateVisibleFavourites = () => {

      if (!favouritesContainerRef.current) {
        return;

      }

      const containerWidth = favouritesContainerRef.current.offsetWidth;

      const cardWidth = 220;
      const gap = 16;

      const cardsThatFit = Math.floor(containerWidth / (cardWidth + gap));

      setVisibleFavourites(cardsThatFit);
    };

    calculateVisibleFavourites();
    window.addEventListener("resize", calculateVisibleFavourites);
    return () => { window.removeEventListener("resize", calculateVisibleFavourites); };
  }, []);

  useEffect(() => {
    const calculateVisibleRecents = () => {

      if (!recentsContainerRef.current) {
        return;

      }

      const containerWidth = recentsContainerRef.current.offsetWidth;

      const cardWidth = 220;
      const gap = 16;

      const cardsThatFit = Math.floor(containerWidth / (cardWidth + gap));

      setVisibleRecents(cardsThatFit);
    };

    calculateVisibleRecents();
    window.addEventListener("resize", calculateVisibleRecents);
    return () => { window.removeEventListener("resize", calculateVisibleRecents); };
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

  const openInfoModal = (bookmark: BookmarkType) => {
    setSelectedBookmark(bookmark);
    setIsInfoOpen(true);
  };

  const filteredBookmarks = bookmarks.filter((bookmark) => {
    const matchesSearch = (bookmark.title || "").toLowerCase().includes(search.toLowerCase());

    let matchesCategory;

    if (selectedCategory === "All Categories") {
      matchesCategory = true;
    } else if (selectedCategory === "Categorized") {
      matchesCategory = bookmark.category !== "Other";
    } else {
      matchesCategory = bookmark.category === selectedCategory;
    }


    return matchesSearch && matchesCategory;

  });

  const toggleFavourite = (bookmark: BookmarkType) => {
    fetch(`http://127.0.0.1:8000/bookmarks/${bookmark.id}`, {
      method: "PATCH", headers: { "Content-Type": "application/json", },
      body: JSON.stringify({ is_favorite: !bookmark.is_favorite, }),
    })
      .then((response) => response.json())
      .then((updatedBookmark) => { setBookmarks(bookmarks.map((currentBookmark) => currentBookmark.id === bookmark.id ? updatedBookmark : currentBookmark)); setSelectedBookmark(updatedBookmark) });
  };

  const recentBookmarks = bookmarks.filter((bookmark) => {
    const bookmarkDate = new Date(bookmark.date);
    const sevenDaysAgo = new Date();

    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    return bookmarkDate >= sevenDaysAgo;


  });

  const displayedFavourites = showAllFavourites ? favouriteBookmarks : favouriteBookmarks.slice(0, visibleFavourites);
  const displayedRecents = showAllRecents ? recentBookmarks : recentBookmarks.slice(0, visibleRecents);


  const [sortOption, setSortOption] = useState("A-Z");
  let sortedBookmarks = [...filteredBookmarks];

  if (sortOption === "Newest First") {
    sortedBookmarks.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  } else if (sortOption === "Oldest First") {
    sortedBookmarks.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  } else if (sortOption === "A-Z") {

    sortedBookmarks.sort((a, b) => (a.title || "").localeCompare(b.title || ""));
  } else if (sortOption === "Z-A") {
    sortedBookmarks.sort((a, b) => (b.title || "").localeCompare(a.title || ""));

  }

  return (
    <div className=" bg-[#0f1621]">
      <Navbar openAddModal={() => setIsAddOpen(true)} />
      <div className="flex-1 px-5 bg-[#09121a]">

        <div className="flex items-center gap-5">
          <div className="mt-8 flex items-center border-1 rounded-md border-gray-800 p-1 pl-2 py-2 w-1/3 gap-2">
            <Search size={18} />
            <input value={search} onChange={(event) => setSearch(event.target.value)} className="w-full outline-none" placeholder="Search bookmarks..." />
          </div>

          <div className="mt-8 border-gray-800 border-1 rounded-md p-1 pl-2 py-2 w-1/5 bg-[#121a25]">
            <select value={selectedCategory} onChange={(event) => setSelectedCategory(event.target.value)} className="w-full outline-none cursor-pointer">
              <option className="bg-[#121a25] cursor-pointer">All Categories</option>
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
          </div>

          <div className="ml-auto flex items-center mt-8">
            <p className="text-gray-400 font-semibold">{filteredBookmarks.length == 1 ? "1 bookmark" : `${filteredBookmarks.length} bookmarks`}</p>
          </div>

        </div>

        <div className="mt-5 border-2 border-gray-800 rounded-md bg-[#0f1822] min-h-[150px]">
          <div className="flex justify-between">
            <p className="font-semibold flex gap-1 items-center ml-2 pt-3 text-xl"><Star className="text-yellow-400 fill-yellow-400" />Favourites</p>
            <button onClick={() => setShowAllFavourites(!showAllFavourites)} className="transition-all duration-800 flex mt-3 mr-2">{showAllFavourites ? (<p className="flex gap-1 font-semibold text-[#b7b2f1] cursor-pointer">Show Less <ChevronUp className="transition-transform duration-300" /></p>) : (<p className="flex gap-1 font-semibold text-[#b7b2f1] cursor-pointer">Show All <ChevronDown className="transition-transform duration-300" /></p>)}</button>
          </div>
          <div className="flex flex-wrap gap-4 mt-5 px-2 pb-5" ref={favouritesContainerRef}>
            {displayedFavourites.map((bookmark) => (
              <div key={bookmark.id}>
                <BookmarkCard id={bookmark.id} title={bookmark.title} url={bookmark.url} category={bookmark.category} description={bookmark.description} deleteBookmark={deleteBookmark} openEditModal={() => openEditModal(bookmark)} openInfoModal={() => openInfoModal(bookmark)} toggleFavourite={() => toggleFavourite(bookmark)} isFavourite={favouriteBookmarks.some((favourite) => favourite.id === bookmark.id)} />
              </div>
            ))}
          </div>
        </div>

        <div className="mt-5 border-2 border-gray-800 rounded-md bg-[#0f1822] min-h-[150px]">
          <div className="flex justify-between">
            <p className="font-semibold flex gap-1 items-center ml-2 pt-3 text-xl"><Clock className="text-black fill-[#6586f9]" size={30} />Recently Added</p>
            <button onClick={() => setShowAllRecents(!showAllRecents)} className="transition-all duration-800 flex mt-3 mr-2">{showAllRecents ? (<p className="flex gap-1 font-semibold text-[#b7b2f1] cursor-pointer">Show Less <ChevronUp className="transition-transform duration-300" /></p>) : (<p className="flex gap-1 font-semibold text-[#b7b2f1] cursor-pointer">Show All <ChevronDown className="transition-transform duration-300" /></p>)}</button>
          </div>
          <div className="flex flex-wrap gap-4 mt-5 px-2 pb-5" ref={recentsContainerRef}>
            {displayedRecents.map((bookmark) => (
              <div key={bookmark.id}>
                <BookmarkCard id={bookmark.id} title={bookmark.title} url={bookmark.url} category={bookmark.category} description={bookmark.description} deleteBookmark={deleteBookmark} openEditModal={() => openEditModal(bookmark)} openInfoModal={() => openInfoModal(bookmark)} toggleFavourite={() => toggleFavourite(bookmark)} isFavourite={favouriteBookmarks.some((favourite) => favourite.id === bookmark.id)} />
              </div>
            ))}
          </div>
        </div>

        <div className="mt-5 border-2 border-gray-800 rounded-md bg-[#0f1822] min-h-[160px]">
          <div className="flex items-center justify-between">
            <p className="font-semibold flex gap-1 items-center ml-2 pt-3 text-xl"><BookMarked className="text-black fill-[#6586f9]" size={30} />All Bookmarks</p>

            <div className="mt-5 mr-5 flex items-center gap-2">
              <p className="text-md text-gray-400">Sort by:</p>
              <select value={sortOption} onChange={(event) => setSortOption(event.target.value)} className="outline-none mr-5 cursor-pointer border-gray-800 border-1 rounded-md p-1 pl-2 py-2 w-[150px] bg-[#15202b]">
                <option>A-Z</option>
                <option>Z-A</option>
                <option>Newest First</option>
                <option>Oldest First</option>
              </select>

            </div>
          </div>
          <div className="flex flex-wrap gap-4 mt-5 px-2 pb-5">

            {sortedBookmarks.map((bookmark) => (
              <div key={bookmark.id}>
                <BookmarkCard id={bookmark.id} title={bookmark.title} url={bookmark.url} category={bookmark.category} description={bookmark.description} deleteBookmark={deleteBookmark} openEditModal={() => openEditModal(bookmark)} openInfoModal={() => openInfoModal(bookmark)} toggleFavourite={() => toggleFavourite(bookmark)} isFavourite={favouriteBookmarks.some((favourite) => favourite.id === bookmark.id)} />
              </div>
            ))}
          </div>
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

      {isInfoOpen && selectedBookmark && (
        <div className="z-100 fixed inset-0 bg-black/60 flex items-center justify-center">
          <div className="bg-[#121a25] border border-gray-700 rounded-lg p-6 w-[400px] flex flex-col">
            <div className="flex items-center justify-between">
              <p className="text-xl font-semibold">Info Bookmark</p>
              <button onClick={() => toggleFavourite(selectedBookmark)} className="z-50 text-gray-400 cursor-pointer hover:text-blue-500 transition-colors hover:scale-105 hover:shadow-xl"><Star className={selectedBookmark.is_favorite ? "text-yellow-400 fill-yellow-400" : "text-gray-500"} size={20} /></button>
            </div>
            <hr className="mt-1" />
            <div className="flex items-center gap-4 mt-5">
              <img src={`https://www.google.com/s2/favicons?domain=${new URL(selectedBookmark.url).hostname}&sz=64`} className="w-12 h-12" />

              <div>
                <p className="text-lg font-semibold">{selectedBookmark.title || "Untitled"}</p>
                <p className="text-sm text-gray-400">{new URL(selectedBookmark.url).hostname}</p>
              </div>
            </div>

            <div className="mt-6">
              <p className="text-sm text-gray-400">URL</p>
              <a href={selectedBookmark.url} target="_blank" className="text-[#8177ff] hover:underline">{selectedBookmark.url}</a>
            </div>

            <div className="mt-5">
              <p className="text-sm text-gray-400">Category</p>
              <p className="mt-1">{selectedBookmark.category}</p>
            </div>

            <div className="mt-5">
              <p className="text-sm text-gray-400">Description</p>
              <p className="mt-1 text-gray-200">{selectedBookmark.description || "No description added."}</p>
            </div>

            <div className="flex gap-2 mx-auto mt-5 w-full">
              <button onClick={() => { setIsInfoOpen(false); openEditModal(selectedBookmark); }} className='z-50 p-2 rounded-md border border-gray-600 text-gray-300 hover:border-gray-300 w-1/2 hover:bg-gray-800 hover:text-white transition-colors cursor-pointer flex gap-2 text-lg font-semibold items-center justify-center'>Edit<Pencil size={20} /></button>
              <button onClick={(event) => { event.preventDefault(); event.stopPropagation(); setIsInfoOpen(false); deleteBookmark(selectedBookmark.id); }} className='z-20 p-2 rounded-md border border-gray-600 text-gray-300 hover:border-red-500 hover:bg-red-500/10 hover:text-red-500 transition-colors ml-2 cursor-pointer w-1/2 flex gap-2 text-lg font-semibold items-center justify-center'>Delete<Trash2 className='text-red-700' /></button>
            </div>
            <button onClick={() => setIsInfoOpen(false)} className="mt-5 border border-gray-600 rounded-md px-4 py-2 w-1/2 mx-auto w-full cursor-pointer font-semibold hover:bg-[#5e54e0] transition-colors">Close</button>
          </div>
        </div>
      )}


    </div>
  );
}