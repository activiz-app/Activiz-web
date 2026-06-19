"use client"

import { useEffect, useState } from "react"
import Image from "next/image"

const APP_STORE_URL = "https://apps.apple.com/app/activiz/id6765621204"
const PLAY_STORE_URL = "https://play.google.com/store/apps/details?id=app.activiz"

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
    <div className="min-h-screen flex flex-col items-center justify-center px-4" style={{ background: "linear-gradient(160deg, #e8f0ff 0%, #f5f7ff 60%, #fff 100%)" }}>
      <div className="w-full max-w-sm space-y-6 text-center">
        <Image src="/logo.png" alt="Activiz" width={80} height={80} className="rounded-[22px] mx-auto shadow-lg" />

        {!showFallback ? (
          <>
            <div>
              <h1 className="text-3xl font-extrabold text-gray-900">Rejoindre le groupe</h1>
              <p className="text-gray-500 text-sm mt-2">Redirection vers Activiz en cours...</p>
            </div>
            <div className="bg-white rounded-2xl border-2 border-gray-100 py-4 px-6">
              <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">Code d&apos;invitation</p>
              <p className="text-2xl font-extrabold tracking-[0.2em] text-gray-900">{inviteCode}</p>
            </div>
            {deviceType && (
              <div className="space-y-2">
                <p className="text-xs text-gray-400">L&apos;application ne s&apos;ouvre pas ?</p>
                <a
                  href={storeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center justify-center gap-3 w-full py-4 px-4 rounded-2xl font-extrabold text-lg transition-opacity hover:opacity-90 ${deviceType === "ios" ? "text-white" : "text-gray-900"}`}
                  style={{ backgroundColor: deviceType === "ios" ? "#0057FF" : "#FADC00" }}
                >
                  <span className="w-6 h-6 flex items-center justify-center shrink-0">
                    <Image src={deviceType === "ios" ? "/apple.png" : "/android.png"} alt={storeName} width={24} height={24} className={`object-contain${deviceType === "ios" ? " brightness-0 invert" : ""}`} />
                  </span>
                  Télécharger pour {deviceType === "ios" ? "iPhone" : "Android"}
                </a>
              </div>
            )}
          </>
        ) : (
          <>
            <div>
              <h1 className="text-3xl font-extrabold text-gray-900">Télécharge Activiz</h1>
              <p className="text-gray-500 text-sm mt-2">Pour rejoindre ce groupe, télécharge l&apos;application.</p>
            </div>
            <div className="bg-white rounded-2xl border-2 border-gray-100 py-4 px-6">
              <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">Code d&apos;invitation</p>
              <p className="text-2xl font-extrabold tracking-[0.2em] text-gray-900">{inviteCode}</p>
            </div>
            <div className="space-y-3">
              <a
                href={APP_STORE_URL}
                className="flex items-center justify-center gap-3 w-full py-4 px-4 rounded-2xl font-extrabold text-white transition-opacity hover:opacity-90"
                style={{ backgroundColor: "#0057FF" }}
              >
                <span className="w-6 h-6 flex items-center justify-center shrink-0">
                  <Image src="/apple.png" alt="iPhone" width={24} height={24} className="brightness-0 invert object-contain" />
                </span>
                Télécharger pour iPhone
              </a>
              <a
                href={PLAY_STORE_URL}
                className="flex items-center justify-center gap-3 w-full py-4 px-4 rounded-2xl font-extrabold text-gray-900 transition-opacity hover:opacity-90"
                style={{ backgroundColor: "#FADC00" }}
              >
                <span className="w-6 h-6 flex items-center justify-center shrink-0">
                  <Image src="/android.png" alt="Android" width={24} height={24} className="object-contain" />
                </span>
                Télécharger pour Android
              </a>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
