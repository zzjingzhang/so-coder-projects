export interface NodePosition {
  x: number;
  y: number;
}

export interface NodeProperty {
  name: string;
  type: 'string' | 'number' | 'boolean' | 'select' | 'textarea';
  label: string;
  value: any;
  options?: { label: string; value: any }[];
}

export interface NodeData {
  id: string;
  type: 'source' | 'transform' | 'target';
  subtype: string;
  label: string;
  position: NodePosition;
  properties: NodeProperty[];
}

export interface ConnectionData {
  id: string;
  source: string;
  target: string;
}

export interface PipelineData {
  id: string;
  name: string;
  nodes: NodeData[];
  connections: ConnectionData[];
}

export const NODE_TEMPLATES: Record<string, Omit<NodeData, 'id' | 'position'>> = {
  source_database: {
    type: 'source',
    subtype: 'database',
    label: 'Database Source',
    properties: [
      { name: 'connectionString', type: 'string', label: 'Connection String', value: '' },
      { name: 'tableName', type: 'string', label: 'Table Name', value: '' },
      { name: 'query', type: 'textarea', label: 'SQL Query', value: '' }
    ]
  },
  source_csv: {
    type: 'source',
    subtype: 'csv',
    label: 'CSV Source',
    properties: [
      { name: 'filePath', type: 'string', label: 'File Path', value: '' },
      { name: 'delimiter', type: 'select', label: 'Delimiter', value: ',', options: [
        { label: 'Comma (,)', value: ',' },
        { label: 'Tab (\\t)', value: '\\t' },
        { label: 'Pipe (|)', value: '|' },
        { label: 'Semicolon (;)', value: ';' }
      ]},
      { name: 'hasHeader', type: 'boolean', label: 'Has Header Row', value: true }
    ]
  },
  source_api: {
    type: 'source',
    subtype: 'api',
    label: 'API Source',
    properties: [
      { name: 'url', type: 'string', label: 'API URL', value: '' },
      { name: 'method', type: 'select', label: 'HTTP Method', value: 'GET', options: [
        { label: 'GET', value: 'GET' },
        { label: 'POST', value: 'POST' }
      ]},
      { name: 'headers', type: 'textarea', label: 'Headers (JSON)', value: '{}' }
    ]
  },
  transform_filter: {
    type: 'transform',
    subtype: 'filter',
    label: 'Filter',
    properties: [
      { name: 'condition', type: 'textarea', label: 'Filter Condition', value: '' }
    ]
  },
  transform_map: {
    type: 'transform',
    subtype: 'map',
    label: 'Map',
    properties: [
      { name: 'mappings', type: 'textarea', label: 'Field Mappings (JSON)', value: '{}' }
    ]
  },
  transform_aggregate: {
    type: 'transform',
    subtype: 'aggregate',
    label: 'Aggregate',
    properties: [
      { name: 'groupBy', type: 'string', label: 'Group By Fields', value: '' },
      { name: 'aggregations', type: 'textarea', label: 'Aggregations (JSON)', value: '{}' }
    ]
  },
  transform_join: {
    type: 'transform',
    subtype: 'join',
    label: 'Join',
    properties: [
      { name: 'joinType', type: 'select', label: 'Join Type', value: 'inner', options: [
        { label: 'Inner Join', value: 'inner' },
        { label: 'Left Join', value: 'left' },
        { label: 'Right Join', value: 'right' },
        { label: 'Full Join', value: 'full' }
      ]},
      { name: 'joinKey', type: 'string', label: 'Join Key', value: '' }
    ]
  },
  target_database: {
    type: 'target',
    subtype: 'database',
    label: 'Database Target',
    properties: [
      { name: 'connectionString', type: 'string', label: 'Connection String', value: '' },
      { name: 'tableName', type: 'string', label: 'Table Name', value: '' },
      { name: 'writeMode', type: 'select', label: 'Write Mode', value: 'append', options: [
        { label: 'Append', value: 'append' },
        { label: 'Overwrite', value: 'overwrite' },
        { label: 'Upsert', value: 'upsert' }
      ]}
    ]
  },
  target_csv: {
    type: 'target',
    subtype: 'csv',
    label: 'CSV Target',
    properties: [
      { name: 'filePath', type: 'string', label: 'Output File Path', value: '' },
      { name: 'delimiter', type: 'select', label: 'Delimiter', value: ',', options: [
        { label: 'Comma (,)', value: ',' },
        { label: 'Tab (\\t)', value: '\\t' },
        { label: 'Pipe (|)', value: '|' },
        { label: 'Semicolon (;)', value: ';' }
      ]},
      { name: 'includeHeader', type: 'boolean', label: 'Include Header', value: true }
    ]
  },
  target_api: {
    type: 'target',
    subtype: 'api',
    label: 'API Target',
    properties: [
      { name: 'url', type: 'string', label: 'API URL', value: '' },
      { name: 'method', type: 'select', label: 'HTTP Method', value: 'POST', options: [
        { label: 'POST', value: 'POST' },
        { label: 'PUT', value: 'PUT' },
        { label: 'PATCH', value: 'PATCH' }
      ]},
      { name: 'headers', type: 'textarea', label: 'Headers (JSON)', value: '{}' }
    ]
  }
};
