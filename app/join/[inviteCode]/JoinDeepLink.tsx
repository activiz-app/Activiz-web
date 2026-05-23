"use client"

import { useEffect, useState } from "react"

const APP_STORE_URL = "https://apps.apple.com/app/activiz/id000000000" // TODO: remplacer
const PLAY_STORE_URL = "https://play.google.com/store/apps/details?id=com.studiofleuve.activiz" // TODO: remplacer

interface Props {
  inviteCode: string
}

export function JoinDeepLink({ inviteCode }: Props) {
  const [showFallback, setShowFallback] = useState(false)
  const [isAndroid, setIsAndroid] = useState(false)

  useEffect(() => {
    const ua = navigator.userAgent.toLowerCase()
    const android = /android/.test(ua)
    const ios = /iphone|ipad|ipod/.test(ua)
    setIsAndroid(android)

    if (ios) {
      window.location.href = `activiz://join/${inviteCode}`
      setTimeout(() => setShowFallback(true), 3000)
    } else if (!android) {
      setShowFallback(true)
    }
    // Android : l'utilisateur tape le bouton, pas d'auto-redirect possible
  }, [inviteCode])

  const intentUrl = `intent://join/${inviteCode}#Intent;scheme=activiz;package=app.activiz;S.browser_fallback_url=${encodeURIComponent(PLAY_STORE_URL)};end`

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-sm space-y-6 text-center">
        {!showFallback ? (
          <>
            <div className="w-16 h-16 rounded-2xl bg-indigo-600 mx-auto" />
            <h1 className="text-2xl font-bold text-gray-900">Rejoindre le groupe</h1>
            <p className="text-gray-500 text-sm">
              Appuie sur le bouton pour ouvrir Activiz.
            </p>
            {isAndroid && (
              <a
                href={intentUrl}
                className="block w-full py-3 px-4 bg-indigo-600 text-white rounded-xl font-medium"
              >
                Ouvrir dans Activiz
              </a>
            )}
          </>
        ) : (
          <>
            <h1 className="text-2xl font-bold text-gray-900">Télécharge Activiz</h1>
            <p className="text-gray-500 text-sm">
              Pour rejoindre ce groupe, télécharge l&apos;application.
            </p>
            <div className="space-y-3">
              <a
                href={APP_STORE_URL}
                className="flex items-center gap-3 w-full py-3 px-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
              >
                <span className="text-2xl">🍎</span>
                <div className="text-left">
                  <p className="text-xs text-gray-400">Télécharger sur l&apos;</p>
                  <p className="font-semibold text-gray-900">App Store</p>
                </div>
              </a>
              <a
                href={PLAY_STORE_URL}
                className="flex items-center gap-3 w-full py-3 px-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
              >
                <span className="text-2xl">🤖</span>
                <div className="text-left">
                  <p className="text-xs text-gray-400">Disponible sur</p>
                  <p className="font-semibold text-gray-900">Google Play</p>
                </div>
              </a>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
