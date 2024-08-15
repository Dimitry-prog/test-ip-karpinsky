import { NodeType } from '@/pages/home/types';
import { useState } from 'react';
import { Button } from '@/shared/components/ui/button.tsx';
import { ChevronRightIcon } from 'lucide-react';
import { cn } from '@/shared/lib/utils.ts';
import TreeActionsDropdown from '@/pages/home/components/tree-actions-dropdown.tsx';

type TreeItemProps = {
  node: NodeType;
};

const TreeItem = ({ node }: TreeItemProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <li>
      <div className="group flex items-center gap-2">
        <Button
          variant="ghost"
          onClick={() => setIsOpen(!isOpen)}
          className="flex gap-2"
          data-testid="root button"
        >
          {node.children.length > 0 && (
            <ChevronRightIcon className={cn('size-4 transition', isOpen && 'rotate-90')} />
          )}
          {node.name}
        </Button>

        <div className="flex items-center gap-2 opacity-0 transition group-hover:opacity-100">
          <TreeActionsDropdown node={node} />
        </div>
      </div>

      {isOpen && (
        <ul className="ml-6">
          {node.children.map((node: NodeType) => (
            <TreeItem node={node} key={node.id} />
          ))}
        </ul>
      )}
    </li>
  );
};

export default TreeItem;
