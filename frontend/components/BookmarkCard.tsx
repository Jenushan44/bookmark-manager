import { CalendarDays, Pencil, Trash2, Info, Star } from 'lucide-react';

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
    <div className="relative border-2 rounded-md flex border-gray-800 w-[350px] bg-[#121a25] pb-2 hover:scale-105 hover:shadow-xl hover:border-[#5c50dc] hover:border-1 transition duration-300 ease-in-out">
      <a className='z-10' target="_blank" href={url}>
        <div className="flex mt-5 ml-5 gap-4">
          <img src={favicon} className="w-10 h-10 rounded-lg" />

          <div>
            <p className="font-semibold truncate">{title}</p>
            <p className='truncate text-sm text-gray-400'>{url}</p>
          </div>
        </div>
      </a>
      <div className='absolute top-3 right-2 flex gap-2 '>
        <button onClick={toggleFavourite} className="z-50 text-gray-400 cursor-pointer hover:text-blue-500 transition-colors hover:scale-105 hover:shadow-xl"><Star className={isFavourite ? "text-yellow-400 fill-yellow-400" : "text-gray-500"} size={20} /></button>
        <button onClick={openInfoModal} className="z-50 text-gray-400 cursor-pointer hover:text-blue-500 transition-colors hover:scale-105 hover:shadow-xl"><Info size={20} /></button>
      </div>
    </div>
  )
}