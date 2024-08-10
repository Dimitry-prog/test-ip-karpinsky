import { NodeType } from '../types';
import { useState } from 'react';
import { Button } from '../../../shared/components/ui/button.tsx';
import { ChevronRightIcon } from 'lucide-react';
import { cn } from '../../../shared/lib/utils.ts';

type NodeProps = {
  node: NodeType;
};

const NodeItem = ({ node }: NodeProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <li>
      <Button variant="ghost" onClick={() => setIsOpen(!isOpen)} className="flex gap-2">
        {node.children.length > 0 && (
          <ChevronRightIcon className={cn('size-4 transition', isOpen && 'rotate-90')} />
        )}
        {node.name}
      </Button>

      {isOpen && (
        <ul className="ml-6">
          {node.children.map((node: NodeType) => (
            <NodeItem node={node} key={node.id} />
          ))}
        </ul>
      )}
    </li>
  );
};

export default NodeItem;
