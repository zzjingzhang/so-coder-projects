import type { Resource } from '../types';

interface ResourceBarProps {
  resources: Resource[];
  storageCapacity: number;
}

export const ResourceBar = ({ resources, storageCapacity }: ResourceBarProps) => {
  return (
    <div className="resource-bar">
      {resources.map(resource => (
        <div key={resource.id} className="resource-item">
          <span className="resource-icon">{resource.icon}</span>
          <span className="font-semibold text-gray-700">{resource.name}</span>
          <span className="text-gray-800 font-bold">{Math.floor(resource.amount)}</span>
          <span className="text-gray-500 text-sm">/ {storageCapacity}</span>
        </div>
      ))}
    </div>
  );
};
