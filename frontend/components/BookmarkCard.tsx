import { CalendarDays, Pencil, Trash2, Info } from 'lucide-react';

type BookmarkCardProps = {
  id: number;
  title: string | null;
  url: string;
  category: string;
  description: string | null;
  deleteBookmark: (id: number) => void;
  openEditModal: () => void;
  openInfoModal: () => void;
};

export default function BookmarkCard({ id, title, url, category, description, deleteBookmark, openEditModal, openInfoModal }: BookmarkCardProps) {

  const website = new URL(url);
  const favicon = `https://www.google.com/s2/favicons?domain=${website.hostname}&sz=64`;
  return (
    <div className="border-1 flex border-gray-800 w-[330px] bg-[#121a25] pb-2 hover:scale-105 hover:shadow-xl hover:border-zinc-500 hover:border-1 transition duration-300 ease-in-out">
      <a className='z-10' target="_blank" href={url}>
        <div className="flex mt-5 ml-5 gap-4">
          <div>
            <img src={favicon} className="w-10 h-10" />
          </div>

          <div>
            <p className="font-semibold truncate max-w-45">{title}</p>
            <p className='truncate max-w-50'>{url}</p>
          </div>
        </div>
      </a>
      <div className='z-20'>
        <button onClick={openInfoModal} className="z-50 text-blue-400 cursor-pointer hover:text-blue-500 transition-colors hover:scale-105 hover:shadow-xl mt-4 ml-5"><Info /></button>
      </div>
    </div>
  )
}