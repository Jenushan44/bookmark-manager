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
    <div className="border-1 border-gray-800 w-[400px] bg-[#121a25]">
      <a className='z-10' target="_blank" href={url}>
        <div className="flex mt-5 ml-5 gap-4">
          <div>
            <img src={favicon} className="w-10 h-10" />
          </div>

          <div>
            <p className="font-semibold">{title}</p>
            <p>{url}</p>
          </div>


        </div>

        <div className="ml-5 mt-2">
          <p>{description}</p>
        </div>
      </a>
      <div className='ml-5 mt-3 mb-3 flex items-center'>
        <p className='flex gap-2'><CalendarDays /> August 30, 2026</p>
        <div className='z-20 ml-auto mr-5'>
          <button onClick={openInfoModal} className="text-blue-400 mt-5 px-4 py-2 cursor-pointer hover:text-blue-500 transition-colors hover:scale-105 hover:shadow-xl"><Info /></button>
        </div>
      </div>

    </div>
  )
}