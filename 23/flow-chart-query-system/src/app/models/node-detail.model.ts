export interface NodeDetail {
  codeClasses: CodeClassInfo[];
  methods: MethodInfo[];
  businessRules: BusinessRule[];
  permissions: Permission[];
  tableModels: TableModel[];
  staticConfigs: StaticConfig[];
}

export interface CodeClassInfo {
  className: string;
  packageName: string;
  description: string;
}

export interface MethodInfo {
  methodName: string;
  returnType: string;
  parameters: string;
  description: string;
}

export interface BusinessRule {
  ruleId: string;
  ruleName: string;
  ruleContent: string;
}

export interface Permission {
  permissionCode: string;
  permissionName: string;
  description: string;
}

export interface TableModel {
  tableName: string;
  tableComment: string;
  fields: TableField[];
}

export interface TableField {
  fieldName: string;
  fieldType: string;
  comment: string;
  isPrimaryKey: boolean;
}

export interface StaticConfig {
  configKey: string;
  configValue: string;
  description: string;
}
