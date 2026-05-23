import { JoinDeepLink } from "./JoinDeepLink"

interface Props {
  params: Promise<{ inviteCode: string }>
}

export default async function JoinPage({ params }: Props) {
  const { inviteCode } = await params
  return <JoinDeepLink inviteCode={inviteCode} />
}
