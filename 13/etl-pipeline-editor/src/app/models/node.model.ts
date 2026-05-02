export type NodeType = 'source' | 'transform' | 'sink';

export interface NodeConfig {
  [key: string]: any;
}

export interface PipelineNode {
  id: string;
  type: NodeType;
  name: string;
  label: string;
  x: number;
  y: number;
  config: NodeConfig;
  inputPort?: boolean;
  outputPort?: boolean;
}

export interface Connection {
  id: string;
  sourceId: string;
  targetId: string;
}

export interface Workflow {
  id: string;
  name: string;
  nodes: PipelineNode[];
  connections: Connection[];
  createdAt: Date;
  updatedAt: Date;
}

export const NodeTemplates: { [key in NodeType]: { name: string; label: string; config: NodeConfig; inputPort: boolean; outputPort: boolean }[] } = {
  source: [
    {
      name: 'database-source',
      label: 'Database Source',
      config: {
        connectionString: '',
        query: '',
        tableName: ''
      },
      inputPort: false,
      outputPort: true
    },
    {
      name: 'file-source',
      label: 'File Source',
      config: {
        filePath: '',
        fileFormat: 'csv',
        delimiter: ','
      },
      inputPort: false,
      outputPort: true
    },
    {
      name: 'api-source',
      label: 'API Source',
      config: {
        url: '',
        method: 'GET',
        headers: {},
        body: ''
      },
      inputPort: false,
      outputPort: true
    }
  ],
  transform: [
    {
      name: 'filter',
      label: 'Filter',
      config: {
        condition: '',
        fields: []
      },
      inputPort: true,
      outputPort: true
    },
    {
      name: 'map',
      label: 'Map',
      config: {
        mappings: []
      },
      inputPort: true,
      outputPort: true
    },
    {
      name: 'aggregate',
      label: 'Aggregate',
      config: {
        groupBy: [],
        aggregations: []
      },
      inputPort: true,
      outputPort: true
    },
    {
      name: 'join',
      label: 'Join',
      config: {
        joinType: 'inner',
        leftKey: '',
        rightKey: ''
      },
      inputPort: true,
      outputPort: true
    },
    {
      name: 'sort',
      label: 'Sort',
      config: {
        sortBy: [],
        order: 'asc'
      },
      inputPort: true,
      outputPort: true
    }
  ],
  sink: [
    {
      name: 'database-sink',
      label: 'Database Sink',
      config: {
        connectionString: '',
        tableName: '',
        writeMode: 'append'
      },
      inputPort: true,
      outputPort: false
    },
    {
      name: 'file-sink',
      label: 'File Sink',
      config: {
        filePath: '',
        fileFormat: 'csv',
        delimiter: ','
      },
      inputPort: true,
      outputPort: false
    },
    {
      name: 'api-sink',
      label: 'API Sink',
      config: {
        url: '',
        method: 'POST',
        headers: {},
        bodyTemplate: ''
      },
      inputPort: true,
      outputPort: false
    }
  ]
};

export function generateId(): string {
  return 'node_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
}
