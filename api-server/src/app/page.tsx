export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4">
      <h1 className="mb-4 text-2xl font-bold">KhaRom API Server</h1>
      <p>Status: Active</p>
      <p className="mt-2 text-sm text-gray-600">Available endpoints:</p>
      <ul className="mt-1 text-sm">
        <li>/api/chat - POST endpoint for chat interactions</li>
      </ul>
    </main>
  );
}
