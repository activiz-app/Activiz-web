import type { Metadata } from "next"
import { JoinDeepLink } from "./JoinDeepLink"

const API_BASE = process.env.API_BASE

interface Group {
  name: string
  memberCount: number
  image: string | null
}

async function getGroup(groupId: string): Promise<Group | null> {
  try {
    const res = await fetch(`${API_BASE}/public/groups/${groupId}`, {
      next: { revalidate: 60 },
    })
    if (!res.ok) return null
    return res.json()
  } catch {
    return null
  }
}

interface Props {
  params: Promise<{ groupId: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { groupId } = await params
  const group = await getGroup(groupId)

  const title = group ? `Rejoins ${group.name} sur Activiz` : "Rejoins un groupe sur Activiz"
  const description = "Clique pour rejoindre ce groupe sur l'app Activiz."
  const image = group?.image ?? null

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      ...(image && { images: [{ url: image }] }),
      type: "website",
    },
  }
}

export default async function JoinPage({ params }: Props) {
  const { groupId } = await params
  const group = await getGroup(groupId)

  return (
    <JoinDeepLink
      groupId={groupId}
      name={group?.name ?? "Groupe Activiz"}
      description="Rejoins ce groupe sur Activiz."
      memberCount={group?.memberCount ?? null}
      image={group?.image ?? null}
    />
  )
}
