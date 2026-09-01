import { CalendarDays, Pencil, Trash2 } from 'lucide-react';

type BookmarkCardProps = {
  id: number;
  title: string | null;
  url: string;
  category: string;
  description: string | null;
  deleteBookmark: (id: number) => void;
};

export default function BookmarkCard({ id, title, url, category, description, deleteBookmark }: BookmarkCardProps) {

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

        <div className='ml-5 mt-3 mb-3 flex items-center'>
          <p className='flex gap-2'><CalendarDays /> August 30, 2026</p>
          <div className='z-20 ml-auto mr-5'>
            <button onClick={(event) => { event.preventDefault(); event.stopPropagation(); }} className='z-20 p-2 rounded-md border border-gray-600 text-gray-300 hover:border-gray-300 hover:bg-gray-800 hover:text-white transition-colors cursor-pointer'><Pencil /></button>
            <button onClick={(event) => { event.preventDefault(); event.stopPropagation(); deleteBookmark(id) }} className='z-20 p-2 rounded-md border border-gray-600 text-gray-300 hover:border-red-500 hover:bg-red-500/10 hover:text-red-500 transition-colors ml-2 cursor-pointer'><Trash2 className='text-red-700' /></button>
          </div>
        </div>
      </a>
    </div>
  )
}