import GoogleTranslate from '@/components/google-translate'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between w-full">
      {/* Ensure the component takes the full width */}
      <div className="w-full">
        <GoogleTranslate />
      </div>
    </main>
  )
}
