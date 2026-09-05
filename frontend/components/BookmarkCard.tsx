import { CalendarDays, Pencil, Trash2, Info, Star, EllipsisVertical } from 'lucide-react';

type BookmarkCardProps = {
  id: number;
  title: string | null;
  url: string;
  category: string;
  description: string | null;
  deleteBookmark: (id: number) => void;
  openEditModal: () => void;
  openInfoModal: () => void;
  toggleFavourite: () => void;
  isFavourite: boolean;
};

export default function BookmarkCard({ id, title, url, category, description, deleteBookmark, openEditModal, openInfoModal, toggleFavourite, isFavourite }: BookmarkCardProps) {

  const website = new URL(url);
  const favicon = `https://www.google.com/s2/favicons?domain=${website.hostname}&sz=64`;
  return (
    <div className="relative border-2 rounded-md flex gap-5 items-center border-gray-800 w-fit bg-[#15202b] hover:scale-102 hover:shadow-xl hover:border-[#5c50dc] hover:border-1 transition duration-300 ease-in-out">
      <a className='z-10' target="_blank" href={url}>
        <div className="flex mt-3 mb-3 ml-5 gap-4 items-center">
          <img src={favicon} className="w-8 h-8 rounded-lg" />
          <p className="font-semibold truncate">{title}</p>
        </div>
      </a>
      <button onClick={openInfoModal} className="z-50 text-gray-400 cursor-pointer hover:text-blue-500 transition-colors hover:scale-105 hover:shadow-xl"><EllipsisVertical size={20} /></button>
    </div>
  )
}