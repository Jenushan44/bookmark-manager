type BookmarkCardProps = {
  id: number;
  title: string | null;
  url: string;
  category: string;
  description: string | null;
};

export default function BookmarkCard({ id, title, url, category, description }: BookmarkCardProps) {

  return (

    <div>
      <p>{title}</p>
      <p>{url}</p>
      <p>{category}</p>
      <p>{description}</p>
    </div>
  )
}