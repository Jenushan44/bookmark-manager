import { House, ListSortAscending, Plus } from 'lucide-react';

export default function Navbar() {

  return (
    <div className="w-[250px]">
      <button className='flex items-center gap-5 ml-5 mt-5'>
        <House />
        <p>All Bookmarks</p>
        <p>0</p>
      </button>

      <button className='flex items-center gap-5 ml-5 mt-5'>
        <ListSortAscending />
        <p>Uncategorized</p>
        <p>0</p>
      </button>

      <button className='flex items-center gap-5 ml-5 mt-5'>
        <p>CATEGORIES</p>
        <Plus className='justify-end' />
      </button>


    </div>
  )


}