import type { Metadata } from "next"
import { DeleteAccountForm } from "./DeleteAccountForm"

export const metadata: Metadata = {
  title: "Supprimer mon compte — Activiz",
  description: "Demander la suppression de ton compte Activiz",
}

export default function DeleteAccountPage() {
  return <DeleteAccountForm />
}
