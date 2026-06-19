'use server'

const API_URL = process.env.API_URL ?? 'https://api.activiz.app'

export async function requestAccountDeletion(email: string): Promise<void> {
  try {
    await fetch(`${API_URL}/public/delete-account/request`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    })
  } catch {
    // silently fail — user always sees "Email envoyé"
  }
}
