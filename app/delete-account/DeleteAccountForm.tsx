"use client"

import { useState } from "react"
import Image from "next/image"
import { requestAccountDeletion } from "./actions"

export function DeleteAccountForm() {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email.trim()) return
    setLoading(true)
    try {
      await requestAccountDeletion(email.trim())
    } finally {
      setLoading(false)
      setSubmitted(true)
    }
  }

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4"
      style={{ background: "linear-gradient(160deg, #e8f0ff 0%, #f5f7ff 60%, #fff 100%)" }}
    >
      <div className="w-full max-w-sm space-y-6 text-center">
        <Image
          src="/logo.png"
          alt="Activiz"
          width={80}
          height={80}
          className="rounded-[22px] mx-auto shadow-lg"
        />

        {submitted ? (
          <>
            <div>
              <h1 className="text-2xl font-extrabold text-gray-900">Email envoyé</h1>
              <p className="text-gray-500 text-sm mt-2 leading-relaxed">
                Si un compte existe avec cette adresse, tu recevras un email pour confirmer la suppression.
              </p>
            </div>
            <div className="bg-white rounded-2xl border-2 border-gray-100 py-5 px-6">
              <p className="text-sm text-gray-400">
                Vérifie ta boîte de réception et clique sur le lien dans l&apos;email.
              </p>
            </div>
          </>
        ) : (
          <>
            <div>
              <h1 className="text-2xl font-extrabold text-gray-900">Supprimer mon compte</h1>
              <p className="text-gray-500 text-sm mt-2 leading-relaxed">
                Entre ton adresse email pour recevoir un lien de confirmation.
                Cette action est <strong>irréversible</strong>.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ton@email.com"
                className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 text-gray-900 text-sm focus:outline-none focus:border-red-400 transition-colors"
                disabled={loading}
              />
              <button
                type="submit"
                disabled={loading || !email.trim()}
                className="w-full py-4 px-4 rounded-2xl font-extrabold text-white text-base transition-opacity hover:opacity-90 disabled:opacity-50"
                style={{ backgroundColor: "#e53e3e" }}
              >
                {loading ? "Envoi en cours…" : "Envoyer le lien de suppression"}
              </button>
            </form>

            <p className="text-xs text-gray-400">
              Tu recevras un email uniquement si un compte existe avec cette adresse.
            </p>
          </>
        )}
      </div>
    </div>
  )
}
