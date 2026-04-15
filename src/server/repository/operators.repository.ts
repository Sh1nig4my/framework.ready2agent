import type { AppUser } from "@/server/lib/users/types";
import {
  createUser,
  findUserById,
  listUsers,
  updateUser,
} from "@/server/repository/users.repository";

export async function listOperatorsRepository(): Promise<AppUser[]> {
  return listUsers({ role: "OPERATOR" });
}

export async function findOperatorByIdRepository(id: string): Promise<AppUser | null> {
  const user = await findUserById(id);
  return user?.role === "OPERATOR" ? user : null;
}

export async function createOperatorRepository(
  input: Omit<AppUser, "id"> & { id?: string },
): Promise<AppUser> {
  return createUser({ ...input, role: "OPERATOR" });
}

export async function updateOperatorRepository(
  id: string,
  patch: Partial<Omit<AppUser, "id">>,
): Promise<AppUser | null> {
  return updateUser(id, patch);
}
