import { House, Star, Clock, Bookmark, ListSortAscending, Code2, ShieldCheck, GraduationCap, BriefcaseBusiness, Film, Folder, Plus } from "lucide-react";

export default function Navbar() {
  return (
    <div className="w-[275px] min-h-screen bg-[#0a111d] p-4 border-r-1 border-gray-800">

      <div className="mb-8 px-2">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#181d35]">
            <p className="text-lg font-bold text-[#8f91f5]">BM</p>
          </div>

          <div>
            <p className="font-semibold text-[#f3f4f6]">My Library</p>
            <p className="text-xs text-[#687387]">Bookmark collection</p>
          </div>
        </div>
      </div>

      <button className="group cursor-pointer flex items-center w-full gap-4 mt-2 px-4 py-3 rounded-lg hover:bg-[#1c2038] transition-all duration-300">
        <House size={20} className="text-gray-500 group-hover:text-[#9a9cff] transition-colors duration-300" />
        <p className="text-gray-400 group-hover:text-[#e0d3f3] transition-colors duration-300">All Bookmarks</p>
        <p className="ml-auto w-7 h-7 flex items-center justify-center rounded-full border border-gray-700 group-hover:border-gray-500 border-1 text-gray-500 group-hover:text-[#e0d3f3] text-[#c8b8e8] group-hover:bg-[#252a48] transition-all duration-300">0</p>
      </button>

      <div className="flex items-center justify-between mt-8 px-4">
        <p className="text-xs font-semibold text-gray-500">QUICK VIEWS</p>

        <button className="text-gray-500 hover:text-[#9a9cff] transition-colors duration-300">
          <Plus size={18} />
        </button>
      </div>

      <button className="group cursor-pointer flex items-center w-full gap-4 mt-2 px-4 py-3 rounded-lg hover:bg-[#1c2038] transition-all duration-300">
        <Star size={20} className="text-gray-500 group-hover:text-[#9a9cff] transition-colors duration-300" />
        <p className="text-gray-400 group-hover:text-[#d8d8e8] transition-colors duration-300">Favourites</p>
        <p className="ml-auto w-7 h-7 flex items-center justify-center rounded-full border border-gray-700 group-hover:border-gray-500 border-1 text-gray-500 group-hover:text-[#e0d3f3] text-[#c8b8e8] group-hover:bg-[#252a48] transition-all duration-300">0</p>
      </button>

      <button className="group cursor-pointer flex items-center w-full gap-4 mt-2 px-4 py-3 rounded-lg hover:bg-[#1c2038] transition-all duration-300">
        <Clock size={20} className="text-gray-500 group-hover:text-[#9a9cff] transition-colors duration-300" />
        <p className="text-gray-400 group-hover:text-[#d8d8e8] transition-colors duration-300">Recently Added</p>
        <p className="ml-auto w-7 h-7 flex items-center justify-center rounded-full border border-gray-700 group-hover:border-gray-500 border-1 text-gray-500 group-hover:text-[#e0d3f3] text-[#c8b8e8] group-hover:bg-[#252a48] transition-all duration-300">0</p>
      </button>



      <div className="flex items-center justify-between mt-8 px-4">
        <p className="text-xs font-semibold text-gray-500">LIBRARY</p>

        <button className="text-gray-500 hover:text-[#9a9cff] transition-colors duration-300">
          <Plus size={18} />
        </button>
      </div>

      <button className="group flex cursor-pointer items-center w-full gap-4 mt-3 px-4 py-3 rounded-lg hover:bg-[#1c2038] transition-all duration-300">
        <ListSortAscending size={19} className="text-gray-500 group-hover:text-[#9a9cff] transition-colors duration-300" />
        <p className="text-gray-400 group-hover:text-white transition-colors duration-300">Categorized</p>
        <p className="ml-auto w-7 h-7 flex items-center justify-center rounded-full border border-gray-700 group-hover:border-gray-500 border-1 text-gray-500 group-hover:text-[#e0d3f3] text-[#c8b8e8] group-hover:bg-[#252a48] transition-all duration-300">0</p>
      </button>

      <button className="group flex items-center cursor-pointer w-full gap-4 px-4 py-3 rounded-lg hover:bg-[#1c2038] transition-all duration-300">
        <ListSortAscending size={19} className="text-gray-500 group-hover:text-[#9a9cff] transition-colors duration-300" />
        <p className="text-gray-400 group-hover:text-white transition-colors duration-300">Uncategorized</p>
        <p className="ml-auto w-7 h-7 flex items-center justify-center rounded-full border border-gray-700 group-hover:border-gray-500 border-1 text-gray-500 group-hover:text-[#e0d3f3] text-[#c8b8e8] group-hover:bg-[#252a48] transition-all duration-300">0</p>
      </button>
    </div>
  );
}