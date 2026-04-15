import { SettingsForm } from "@/components/dashboard/settings-form";
import { requireSessionActor } from "@/server/lib/auth/session";
import { fetchInternalApi } from "@/server/api/internal-rest-client";

interface SettingsUserPayload {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
}

export default async function SettingsPage() {
  const actor = await requireSessionActor();
  const user = await fetchInternalApi<SettingsUserPayload>(`/api/users/${actor.userId}`);

  return (
    <SettingsForm
      initialUser={{
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
      }}
    />
  );
}
