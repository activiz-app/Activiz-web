"use client"

import { useEffect, useState } from "react"

const APP_STORE_URL = "https://apps.apple.com/app/activiz/id000000000" // TODO: remplacer
const PLAY_STORE_URL = "https://play.google.com/store/apps/details?id=com.studiofleuve.activiz" // TODO: remplacer

interface Props {
  groupId: string
  name: string
  description: string
  memberCount: number | null
  image: string | null
}

export function JoinDeepLink({ groupId, name, description, memberCount, image }: Props) {
  const [deviceType, setDeviceType] = useState<"ios" | "android" | "desktop" | null>(null)
  const [showFallback, setShowFallback] = useState(false)

  useEffect(() => {
    const ua = navigator.userAgent.toLowerCase()
    const isIOS = /iphone|ipad|ipod/.test(ua)
    const isAndroid = /android/.test(ua)

    if (isIOS) setDeviceType("ios")
    else if (isAndroid) setDeviceType("android")
    else setDeviceType("desktop")

    const deepLink = `activiz://join/${groupId}`

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
          if (isIOS) window.location.href = APP_STORE_URL
          else if (isAndroid) window.location.href = PLAY_STORE_URL
          else setShowFallback(true)
        }
      }, 2500)

      const handleVisibilityChange = () => {
        if (document.hidden) clearTimeout(timeout)
      }
      const handlePageHide = () => clearTimeout(timeout)

      document.addEventListener("visibilitychange", handleVisibilityChange)
      window.addEventListener("pagehide", handlePageHide)

      return () => {
        clearTimeout(timeout)
        document.removeEventListener("visibilitychange", handleVisibilityChange)
        window.removeEventListener("pagehide", handlePageHide)
      }
    }

    const redirectTimer = setTimeout(tryOpenApp, 1000)
    return () => clearTimeout(redirectTimer)
  }, [groupId])

  const storeUrl = deviceType === "ios" ? APP_STORE_URL : deviceType === "android" ? PLAY_STORE_URL : null
  const storeName = deviceType === "ios" ? "App Store" : "Play Store"

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-sm space-y-6">
        {!showFallback ? (
          <>
            <div className="text-center space-y-3">
              <div className="w-16 h-16 rounded-2xl bg-indigo-600 mx-auto animate-pulse" />
              <h1 className="text-2xl font-bold text-gray-900">Ouverture de l&apos;app…</h1>
              <p className="text-gray-500 text-sm">
                On vous redirige vers Activiz pour rejoindre <strong>{name}</strong>.
              </p>
            </div>

            {image && (
              <div className="border border-gray-200 rounded-2xl p-4 flex items-center gap-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={image} alt={name} className="w-14 h-14 rounded-xl object-cover" />
                <div>
                  <p className="font-semibold text-gray-900">{name}</p>
                  {memberCount !== null && (
                    <p className="text-sm text-gray-500">
                      {memberCount} membre{memberCount > 1 ? "s" : ""}
                    </p>
                  )}
                </div>
              </div>
            )}

            {deviceType && deviceType !== "desktop" && storeUrl && (
              <div className="text-center space-y-2">
                <p className="text-xs text-gray-400">L&apos;app ne s&apos;ouvre pas ?</p>
                <a
                  href={storeUrl}
                  className="block w-full py-3 px-4 bg-indigo-600 text-white text-center rounded-xl font-medium hover:bg-indigo-700 transition-colors"
                >
                  Télécharger sur {storeName}
                </a>
              </div>
            )}
          </>
        ) : (
          <>
            <div className="text-center space-y-2">
              {image && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={image} alt={name} className="w-20 h-20 rounded-2xl object-cover mx-auto mb-4" />
              )}
              <h1 className="text-2xl font-bold text-gray-900">{name}</h1>
              <p className="text-gray-500 text-sm">{description}</p>
              {memberCount !== null && (
                <p className="text-sm font-medium text-indigo-600">
                  {memberCount} membre{memberCount > 1 ? "s" : ""}
                </p>
              )}
            </div>

            <div className="space-y-3">
              <p className="text-center text-sm text-gray-500">
                Télécharge l&apos;app pour rejoindre ce groupe
              </p>
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
