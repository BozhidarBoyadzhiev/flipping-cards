import { memo } from 'react';

interface EmptyStateProps {
  title: string;
  description: string;
}

const EmptyState = memo(function EmptyState({ title, description }: EmptyStateProps) {
  return (
    <div className="text-center py-12">
      <p className="text-gray-400 text-lg">{title}</p>
      <p className="text-gray-500 text-sm mt-2">{description}</p>
    </div>
  );
});

export default EmptyState