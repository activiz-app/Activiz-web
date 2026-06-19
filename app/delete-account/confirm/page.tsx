import type { Metadata } from "next"
import Image from "next/image"

export const metadata: Metadata = {
  title: "Compte supprimé — Activiz",
}

const API_URL = process.env.API_URL ?? "https://api.activiz.app"

interface Props {
  searchParams: Promise<{ token?: string }>
}

export default async function ConfirmDeleteAccountPage({ searchParams }: Props) {
  const { token } = await searchParams

  let success = false
  let errorMessage = "Lien invalide ou expiré."

  if (token) {
    try {
      const res = await fetch(
        `${API_URL}/public/delete-account/confirm?token=${encodeURIComponent(token)}`,
        { cache: "no-store" }
      )
      if (res.ok) {
        success = true
      } else {
        const data = (await res.json()) as { message?: string }
        errorMessage = data.message ?? errorMessage
      }
    } catch {
      errorMessage = "Une erreur est survenue. Réessaie plus tard."
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

        {success ? (
          <>
            <div>
              <h1 className="text-2xl font-extrabold text-gray-900">Compte supprimé</h1>
              <p className="text-gray-500 text-sm mt-2 leading-relaxed">
                Ton compte Activiz et toutes tes données ont été supprimés définitivement.
              </p>
            </div>
            <div className="bg-white rounded-2xl border-2 border-gray-100 py-5 px-6">
              <p className="text-sm text-gray-400">
                Merci d&apos;avoir utilisé Activiz. À bientôt&nbsp;!
              </p>
            </div>
          </>
        ) : (
          <>
            <div>
              <h1 className="text-2xl font-extrabold text-gray-900">Lien invalide</h1>
              <p className="text-gray-500 text-sm mt-2 leading-relaxed">{errorMessage}</p>
            </div>
            <div className="bg-white rounded-2xl border-2 border-gray-100 py-5 px-6">
              <p className="text-sm text-gray-400">
                Le lien a peut-être déjà été utilisé ou a expiré (valable 24h).{" "}
                <a href="/delete-account" className="text-red-500 underline">
                  Faire une nouvelle demande
                </a>
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
