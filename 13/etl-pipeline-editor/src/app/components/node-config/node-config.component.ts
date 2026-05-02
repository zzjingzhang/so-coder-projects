import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { PipelineNode, NodeType } from '../../models/node.model';

@Component({
  selector: 'app-node-config',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule
  ],
  templateUrl: './node-config.component.html',
  styleUrl: './node-config.component.css'
})
export class NodeConfigComponent implements OnChanges {
  @Input() node: PipelineNode | null = null;
  @Output() nodeUpdated = new EventEmitter<PipelineNode>();

  configForm: FormGroup;
  formFields: { key: string; label: string; type: 'text' | 'select' | 'textarea'; options?: { value: string; label: string }[] }[] = [];

  constructor(private fb: FormBuilder) {
    this.configForm = this.fb.group({});
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['node'] && this.node) {
      this.buildForm();
    }
  }

  private buildForm(): void {
    if (!this.node) return;

    this.formFields = this.getFormFieldsForNode(this.node);
    
    const formGroup: { [key: string]: FormControl } = {};
    
    this.formFields.forEach(field => {
      formGroup[field.key] = new FormControl(this.node?.config[field.key] || '');
    });

    this.configForm = this.fb.group(formGroup);
  }

  private getFormFieldsForNode(node: PipelineNode): { key: string; label: string; type: 'text' | 'select' | 'textarea'; options?: { value: string; label: string }[] }[] {
    const fields: { key: string; label: string; type: 'text' | 'select' | 'textarea'; options?: { value: string; label: string }[] }[] = [];

    switch (node.name) {
      case 'database-source':
      case 'database-sink':
        fields.push(
          { key: 'connectionString', label: 'Connection String', type: 'text' },
          { key: 'tableName', label: 'Table Name', type: 'text' }
        );
        if (node.name === 'database-source') {
          fields.push({ key: 'query', label: 'SQL Query', type: 'textarea' });
        }
        if (node.name === 'database-sink') {
          fields.push({
            key: 'writeMode',
            label: 'Write Mode',
            type: 'select',
            options: [
              { value: 'append', label: 'Append' },
              { value: 'overwrite', label: 'Overwrite' },
              { value: 'upsert', label: 'Upsert' }
            ]
          });
        }
        break;

      case 'file-source':
      case 'file-sink':
        fields.push(
          { key: 'filePath', label: 'File Path', type: 'text' },
          {
            key: 'fileFormat',
            label: 'File Format',
            type: 'select',
            options: [
              { value: 'csv', label: 'CSV' },
              { value: 'json', label: 'JSON' },
              { value: 'parquet', label: 'Parquet' },
              { value: 'xml', label: 'XML' }
            ]
          },
          { key: 'delimiter', label: 'Delimiter', type: 'text' }
        );
        break;

      case 'api-source':
      case 'api-sink':
        fields.push(
          { key: 'url', label: 'API URL', type: 'text' },
          {
            key: 'method',
            label: 'HTTP Method',
            type: 'select',
            options: [
              { value: 'GET', label: 'GET' },
              { value: 'POST', label: 'POST' },
              { value: 'PUT', label: 'PUT' },
              { value: 'DELETE', label: 'DELETE' }
            ]
          }
        );
        if (node.name === 'api-source') {
          fields.push({ key: 'body', label: 'Request Body', type: 'textarea' });
        }
        if (node.name === 'api-sink') {
          fields.push({ key: 'bodyTemplate', label: 'Body Template', type: 'textarea' });
        }
        break;

      case 'filter':
        fields.push(
          { key: 'condition', label: 'Filter Condition', type: 'textarea' },
          { key: 'fields', label: 'Fields (comma-separated)', type: 'text' }
        );
        break;

      case 'map':
        fields.push(
          { key: 'mappings', label: 'Field Mappings (JSON)', type: 'textarea' }
        );
        break;

      case 'aggregate':
        fields.push(
          { key: 'groupBy', label: 'Group By Fields (comma-separated)', type: 'text' },
          { key: 'aggregations', label: 'Aggregations (JSON)', type: 'textarea' }
        );
        break;

      case 'join':
        fields.push(
          {
            key: 'joinType',
            label: 'Join Type',
            type: 'select',
            options: [
              { value: 'inner', label: 'Inner Join' },
              { value: 'left', label: 'Left Join' },
              { value: 'right', label: 'Right Join' },
              { value: 'full', label: 'Full Outer Join' }
            ]
          },
          { key: 'leftKey', label: 'Left Key', type: 'text' },
          { key: 'rightKey', label: 'Right Key', type: 'text' }
        );
        break;

      case 'sort':
        fields.push(
          { key: 'sortBy', label: 'Sort By Fields (comma-separated)', type: 'text' },
          {
            key: 'order',
            label: 'Sort Order',
            type: 'select',
            options: [
              { value: 'asc', label: 'Ascending' },
              { value: 'desc', label: 'Descending' }
            ]
          }
        );
        break;

      default:
        fields.push(
          { key: 'config', label: 'Configuration (JSON)', type: 'textarea' }
        );
    }

    return fields;
  }

  getNodeTypeLabel(type: NodeType): string {
    switch (type) {
      case 'source':
        return 'Source';
      case 'transform':
        return 'Transform';
      case 'sink':
        return 'Sink';
      default:
        return 'Unknown';
    }
  }

  getNodeTypeColor(type: NodeType): string {
    switch (type) {
      case 'source':
        return 'bg-blue-100 text-blue-800';
      case 'transform':
        return 'bg-emerald-100 text-emerald-800';
      case 'sink':
        return 'bg-amber-100 text-amber-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  }

  onSubmit(): void {
    if (!this.node || !this.configForm.valid) return;

    const updatedNode: PipelineNode = {
      ...this.node,
      config: { ...this.configForm.value }
    };

    this.nodeUpdated.emit(updatedNode);
  }

  onReset(): void {
    if (this.node) {
      this.buildForm();
    }
  }
}
