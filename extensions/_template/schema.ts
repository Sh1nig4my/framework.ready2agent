export type ExtensionSchema = {
  name: string;
  fields: Array<{
    key: string;
    type: "string" | "number" | "boolean" | "date";
    required: boolean;
  }>;
};

export const extensionSchema: ExtensionSchema = {
  name: "TemplateSchema",
  fields: [],
};
