import { generateStandardId } from '@logto/core-kit';

import type { CreateResource, CreateRole, CreateScope } from '../db-entries/index.js';
import { PredefinedScope, UserRole } from '../types/index.js';
import { adminTenantId, defaultTenantId } from './tenant.js';

export type AdminData = {
  resource: CreateResource;
  scope: CreateScope;
  role: CreateRole;
};

// Consider remove the dependency of IDs
const defaultResourceId = 'management-api';
const defaultScopeAllId = 'management-api-all';

// Consider combine this with `createAdminData()`
/** The fixed Management API Resource for `default` tenant. */
export const defaultManagementApi = Object.freeze({
  resource: {
    tenantId: defaultTenantId,
    /** @deprecated You should not rely on this constant. Change to something else. */
    id: defaultResourceId,
    /**
     * The fixed resource indicator for Management APIs.
     *
     * Admin Console requires the access token of this resource to be functional.
     */
    indicator: `https://${defaultTenantId}.logto.app/api`,
    name: 'Logto Management API',
  },
  scope: {
    tenantId: defaultTenantId,
    /** @deprecated You should not rely on this constant. Change to something else. */
    id: defaultScopeAllId,
    name: PredefinedScope.All,
    description: 'Default scope for Management API, allows all permissions.',
    /** @deprecated You should not rely on this constant. Change to something else. */
    resourceId: defaultResourceId,
  },
  role: {
    tenantId: defaultTenantId,
    /** @deprecated You should not rely on this constant. Change to something else. */
    id: 'admin-role',
    name: UserRole.Admin,
    description: 'Admin role for Logto.',
  },
}) satisfies AdminData;

export function getManagementApiResourceIndicator<TenantId extends string>(
  tenantId: TenantId
): `https://${TenantId}.logto.app/api`;
export function getManagementApiResourceIndicator<TenantId extends string, Path extends string>(
  tenantId: TenantId,
  path: Path
): `https://${TenantId}.logto.app/${Path}`;

export function getManagementApiResourceIndicator(tenantId: string, path = 'api') {
  return `https://${tenantId}.logto.app/${path}`;
}

export const getManagementApiAdminName = <TenantId extends string>(tenantId: TenantId) =>
  `${tenantId}:${UserRole.Admin}` as const;

/** Create a set of admin data for Management API of the given tenant ID. */
export const createAdminData = (tenantId: string): AdminData => {
  const resourceId = generateStandardId();

  return Object.freeze({
    resource: {
      tenantId,
      id: resourceId,
      indicator: getManagementApiResourceIndicator(tenantId),
      name: `Logto Management API`,
    },
    scope: {
      tenantId,
      id: generateStandardId(),
      name: PredefinedScope.All,
      description: 'Default scope for Management API, allows all permissions.',
      resourceId,
    },
    role: {
      tenantId,
      id: generateStandardId(),
      name: UserRole.Admin,
      description: 'Admin role for Logto.',
    },
  });
};

/** Create a set of admin data for Management API of the given tenant ID for `admin` tenant. */
export const createAdminDataInAdminTenant = (tenantId: string): AdminData => {
  const resourceId = generateStandardId();

  return Object.freeze({
    resource: {
      tenantId: adminTenantId,
      id: resourceId,
      indicator: getManagementApiResourceIndicator(tenantId),
      name: `Logto Management API for tenant ${tenantId}`,
    },
    scope: {
      tenantId: adminTenantId,
      id: generateStandardId(),
      name: PredefinedScope.All,
      description: 'Default scope for Management API, allows all permissions.',
      resourceId,
    },
    role: {
      tenantId: adminTenantId,
      id: generateStandardId(),
      name: getManagementApiAdminName(tenantId),
      description: 'Admin role for Logto.',
    },
  });
};

export const createMeApiInAdminTenant = (): AdminData => {
  const resourceId = generateStandardId();

  return Object.freeze({
    resource: {
      tenantId: adminTenantId,
      id: resourceId,
      indicator: getManagementApiResourceIndicator(adminTenantId, 'me'),
      name: `Logto Me API`,
    },
    scope: {
      tenantId: adminTenantId,
      id: generateStandardId(),
      name: PredefinedScope.All,
      description: 'Default scope for Me API, allows all permissions.',
      resourceId,
    },
    role: {
      tenantId: adminTenantId,
      id: generateStandardId(),
      name: UserRole.User,
      description: 'Default role for admin tenant.',
    },
  });
};
