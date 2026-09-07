import { House, Star, Clock, Bookmark, ListSortAscending, Code2, ShieldCheck, GraduationCap, BriefcaseBusiness, Film, Folder, Plus } from "lucide-react";

type NavbarProps = {
  openAddModal: () => void;
  handleLogout: () => void
};

export default function Navbar({ openAddModal, handleLogout }: NavbarProps) {


  return (
    <div className="justify-between border-1 border-gray-400 h-[90px] min-w-screen flex items-center bg-[#0a111d] p-4 border-r-1 border-gray-800">
      <div>
        <p className="flex text-3xl font-semibold items-center gap-2"><Bookmark className="fill-[#5c50dc]" color="#5c50dc" size={40} />Bookmark Manager</p>
      </div>
      <div className="flex gap-2">
        <button onClick={openAddModal} className="bg-[#5e54e0] rounded-md px-4 py-2 font-semibold cursor-pointer flex items-center gap-2 transition-all duration-200 hover:bg-[#6d63ed] hover:scale-[1.02] hover:shadow-md"><Plus size={18} /> Add Bookmark</button>
        <button onClick={handleLogout} className="border border-gray-700 rounded-md px-4 py-2 font-medium text-gray-300 cursor-pointer transition-all duration-200 hover:bg-red-500/10 hover:border-red-500 hover:text-red-600 hover:shadow-md">Logout</button>
      </div>
    </div>
  );
}