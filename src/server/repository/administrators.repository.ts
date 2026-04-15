import type { AppUser } from "@/server/lib/users/types";
import {
  createUser,
  findUserById,
  listUsers,
  updateUser,
} from "@/server/repository/users.repository";

export async function listAdministratorsRepository(): Promise<AppUser[]> {
  return listUsers({ role: "ADMIN" });
}

export async function findAdministratorByIdRepository(id: string): Promise<AppUser | null> {
  const user = await findUserById(id);
  return user?.role === "ADMIN" ? user : null;
}

export async function createAdministratorRepository(
  input: Omit<AppUser, "id"> & { id?: string },
): Promise<AppUser> {
  return createUser({ ...input, role: "ADMIN" });
}

export async function updateAdministratorRepository(
  id: string,
  patch: Partial<Omit<AppUser, "id">>,
): Promise<AppUser | null> {
  return updateUser(id, patch);
}
