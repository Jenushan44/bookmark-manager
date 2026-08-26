import Navbar from "../components/Navbar"

export default function Home() {
  return (
    <div className="flex min-h-screen">
      <Navbar />
      <main className="flex-1 bg-gray-50 p-8">

        <div className="mx-auto max-w-5xl">
          <h1 className="text-3xl font-bold">Bookmark Manager</h1>
          <p className="mt-2 text-gray-600">
            Save and organize useful links.
          </p>
        </div>
      </main>
    </div>
  );
}