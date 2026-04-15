import {
  createAllowAllAdminPermissions,
  createEmptyAdminPermissions,
  type AdminPermission,
} from "@/shared/auth/admin-permissions.catalog";
import {
  createDenyAllOperatorPermissions,
  type OperatorPermissions,
} from "@/shared/auth/permissions.catalog";
import type { Role, UserStatus } from "@/shared/users/types";

export type SampleUserKey =
  | "super"
  | "adminSelfOnly"
  | "adminVisible"
  | "operatorDenyAll"
  | "operatorDelegated"
  | "userStandard"
  | "userInactive"
  | "operatorInvited";

export interface SampleUserDefinition {
  key: SampleUserKey;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  role: Role;
  status: UserStatus;
  adminPermissions: AdminPermission[] | null;
  operatorPermissions: OperatorPermissions | null;
  emailVerified: boolean;
  acceptTerms: boolean;
  acceptPrivacy: boolean;
  invitedByKey?: SampleUserKey;
}

function createDelegatedOperatorPermissions(): OperatorPermissions {
  const permissions = createDenyAllOperatorPermissions();

  permissions.dashboard.view = true;
  permissions.dashboard.analytics = true;
  permissions.users.view = true;
  permissions.users.update = true;
  permissions.reports.view = true;

  return permissions;
}

export function createSampleUserDefinitions(): SampleUserDefinition[] {
  return [
    {
      key: "super",
      email: "super@ready2agent.dev",
      firstName: "Sofia",
      lastName: "Super",
      password: "Ready2Agent123!",
      role: "SUPER",
      status: "ACTIVE",
      adminPermissions: null,
      operatorPermissions: null,
      emailVerified: true,
      acceptTerms: true,
      acceptPrivacy: true,
    },
    {
      key: "adminSelfOnly",
      email: "admin@ready2agent.dev",
      firstName: "Giada",
      lastName: "Admin",
      password: "Ready2Agent123!",
      role: "ADMIN",
      status: "ACTIVE",
      adminPermissions: createEmptyAdminPermissions(),
      operatorPermissions: null,
      emailVerified: true,
      acceptTerms: true,
      acceptPrivacy: true,
      invitedByKey: "super",
    },
    {
      key: "adminVisible",
      email: "admin-visible@ready2agent.dev",
      firstName: "Bianca",
      lastName: "Visibility",
      password: "Ready2Agent123!",
      role: "ADMIN",
      status: "ACTIVE",
      adminPermissions: createAllowAllAdminPermissions(),
      operatorPermissions: null,
      emailVerified: true,
      acceptTerms: true,
      acceptPrivacy: true,
      invitedByKey: "super",
    },
    {
      key: "operatorDenyAll",
      email: "operator@ready2agent.dev",
      firstName: "Olivia",
      lastName: "Operator",
      password: "Ready2Agent123!",
      role: "OPERATOR",
      status: "ACTIVE",
      adminPermissions: null,
      operatorPermissions: createDenyAllOperatorPermissions(),
      emailVerified: true,
      acceptTerms: true,
      acceptPrivacy: true,
      invitedByKey: "adminSelfOnly",
    },
    {
      key: "operatorDelegated",
      email: "operator-delegated@ready2agent.dev",
      firstName: "Diego",
      lastName: "Delegated",
      password: "Ready2Agent123!",
      role: "OPERATOR",
      status: "ACTIVE",
      adminPermissions: null,
      operatorPermissions: createDelegatedOperatorPermissions(),
      emailVerified: true,
      acceptTerms: true,
      acceptPrivacy: true,
      invitedByKey: "adminVisible",
    },
    {
      key: "userStandard",
      email: "player@ready2agent.dev",
      firstName: "Paola",
      lastName: "Player",
      password: "Ready2Agent123!",
      role: "USER",
      status: "ACTIVE",
      adminPermissions: null,
      operatorPermissions: null,
      emailVerified: true,
      acceptTerms: true,
      acceptPrivacy: true,
    },
    {
      key: "userInactive",
      email: "inactive@ready2agent.dev",
      firstName: "Irene",
      lastName: "Inactive",
      password: "Ready2Agent123!",
      role: "USER",
      status: "INACTIVE",
      adminPermissions: null,
      operatorPermissions: null,
      emailVerified: true,
      acceptTerms: true,
      acceptPrivacy: true,
    },
    {
      key: "operatorInvited",
      email: "invited-operator@ready2agent.dev",
      firstName: "Ivan",
      lastName: "Invited",
      password: "Ready2Agent123!",
      role: "OPERATOR",
      status: "INVITED",
      adminPermissions: null,
      operatorPermissions: createDenyAllOperatorPermissions(),
      emailVerified: false,
      acceptTerms: false,
      acceptPrivacy: false,
      invitedByKey: "adminVisible",
    },
  ];
}
