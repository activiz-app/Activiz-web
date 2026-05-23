"use client"

import { useEffect, useState } from "react"

const APP_STORE_URL = "https://apps.apple.com/app/activiz/id000000000" // TODO: remplacer
const PLAY_STORE_URL = "https://play.google.com/store/apps/details?id=com.studiofleuve.activiz" // TODO: remplacer

interface Props {
  inviteCode: string
}

export function JoinDeepLink({ inviteCode }: Props) {
  const [deviceType, setDeviceType] = useState<"ios" | "android" | "desktop" | null>(null)
  const [showFallback, setShowFallback] = useState(false)

  useEffect(() => {
    const ua = navigator.userAgent.toLowerCase()
    const isIOS = /iphone|ipad|ipod/.test(ua)
    const isAndroid = /android/.test(ua)

    if (isIOS) {
      setDeviceType("ios")
    } else if (isAndroid) {
      setDeviceType("android")
    } else {
      setDeviceType("desktop")
      setShowFallback(true)
      return
    }

    const deepLink = `activiz://join/${inviteCode}`

    const tryOpenApp = () => {
      const link = document.createElement("a")
      link.href = deepLink
      link.style.display = "none"
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)

      const startTime = Date.now()
      const timeout = setTimeout(() => {
        if (Date.now() - startTime < 3000) {
          window.location.href = isIOS ? APP_STORE_URL : PLAY_STORE_URL
        }
      }, 2500)

      const handleVisibilityChange = () => {
        if (document.hidden) clearTimeout(timeout)
      }
      const handlePageHide = () => clearTimeout(timeout)

      document.addEventListener("visibilitychange", handleVisibilityChange)
      window.addEventListener("pagehide", handlePageHide)
    }

    const redirectTimer = setTimeout(tryOpenApp, 1000)
    return () => clearTimeout(redirectTimer)
  }, [inviteCode])

  const storeUrl = deviceType === "ios" ? APP_STORE_URL : PLAY_STORE_URL
  const storeName = deviceType === "ios" ? "App Store" : "Play Store"

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-sm space-y-6 text-center">
        {!showFallback ? (
          <>
            <div className="w-16 h-16 rounded-2xl bg-indigo-600 mx-auto animate-pulse" />
            <h1 className="text-2xl font-bold text-gray-900">Rejoindre le groupe</h1>
            <p className="text-gray-500 text-sm">
              Redirection vers Activiz en cours...
            </p>
            {deviceType && (
              <div className="space-y-2">
                <p className="text-xs text-gray-400">L&apos;application ne s&apos;ouvre pas ?</p>
                <a
                  href={storeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full py-3 px-4 bg-indigo-600 text-white rounded-xl font-medium"
                >
                  Télécharger sur {storeName}
                </a>
              </div>
            )}
          </>
        ) : (
          <>
            <div className="w-16 h-16 rounded-2xl bg-indigo-600 mx-auto" />
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
