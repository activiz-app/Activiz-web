"use client"

import { useRouter } from "next/navigation"
import Image from "next/image"
import { useRef, useState } from "react"

export default function Home() {
  const router = useRouter()
  const [code, setCode] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault()
    const trimmed = (inputRef.current?.value || code).trim().toUpperCase()
    if (trimmed) router.push(`/join/${trimmed}`)
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4" style={{ background: "linear-gradient(160deg, #e8f0ff 0%, #f5f7ff 60%, #fff 100%)" }}>
      <div className="w-full max-w-sm space-y-8 text-center">
        <Image src="/logo.png" alt="Activiz" width={80} height={80} className="rounded-[22px] mx-auto shadow-lg" />
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900">Rejoindre un groupe</h1>
          <p className="text-gray-500 text-sm mt-2">Entre le code d&apos;invitation pour rejoindre un groupe Activiz.</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            ref={inputRef}
            type="text"
            onChange={(e) => setCode(e.target.value)}
            onInput={(e) => setCode((e.target as HTMLInputElement).value)}
            placeholder="CODE D'INVITATION"
            className="w-full py-4 px-4 border-2 border-gray-200 rounded-2xl text-center text-xl font-extrabold tracking-[0.2em] text-gray-900 focus:outline-none focus:border-[#0057FF] bg-white uppercase"
            autoFocus
          />
          <button
            type="submit"
            className="w-full py-4 px-4 rounded-2xl font-extrabold text-lg text-gray-900 transition-opacity"
            style={{ backgroundColor: "#FADC00", opacity: code.trim() ? 1 : 0.4 }}
          >
            Rejoindre →
          </button>
        </form>
      </div>
    </div>
  )
}
