export type ExtensionConfig = {
  id: string;
  version: string;
  enabledByDefault: boolean;
  declares: {
    routes: boolean;
    services: boolean;
    repositories: boolean;
    uiComponents: boolean;
    permissions: boolean;
    persistenceModels: boolean;
  };
};

export const extensionConfig: ExtensionConfig = {
  id: "<extension-id>",
  version: "0.0.0-template",
  enabledByDefault: false,
  declares: {
    routes: false,
    services: false,
    repositories: false,
    uiComponents: false,
    permissions: true,
    persistenceModels: false,
  },
};
