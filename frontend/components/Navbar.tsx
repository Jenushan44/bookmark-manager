import { House, Star, Clock, Bookmark, ListSortAscending, Code2, ShieldCheck, GraduationCap, BriefcaseBusiness, Film, Folder, Plus } from "lucide-react";

type NavbarProps = {
  openAddModal: () => void;
};

export default function Navbar({ openAddModal }: NavbarProps) {


  return (
    <div className="border-1 border-gray-400 h-[90px] min-w-screen flex items-center bg-[#0a111d] p-4 border-r-1 border-gray-800">
      <p className="flex text-3xl font-semibold items-center gap-2"><Bookmark className="fill-[#5c50dc]" color="#5c50dc" size={40} />Bookmark Manager</p>
      <button onClick={openAddModal} className="ml-auto flex items-center gap-2 rounded-md border border-[#5e54e0] bg-[#5e54e0] px-4 py-2 h-[50px] cursor-pointer"><Plus />Add Bookmark</button>
    </div>
  );
}