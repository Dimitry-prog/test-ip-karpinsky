import { useState } from 'react';
import { useTree } from './hooks/use-tree.tsx';
import { ChevronRightIcon, Loader2, PlusIcon } from 'lucide-react';
import { Button } from '../../shared/components/ui/button.tsx';
import { cn } from '../../shared/lib/utils.ts';
import NodeList from './components/node-list.tsx';

const HomePage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { data: tree, isLoading, isError, error } = useTree('my');

  return (
    <section className="flex flex-col">
      {isLoading ? (
        <Loader2 className="size-12 animate-spin self-center" />
      ) : isError ? (
        <h2 className="text-lg text-destructive">{error.message}</h2>
      ) : (
        <>
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={() => setIsOpen(!isOpen)} className="flex gap-2">
              {tree?.children && tree?.children.length > 0 && (
                <ChevronRightIcon className={cn('size-4 transition', isOpen && 'rotate-90')} />
              )}
              {tree?.name}
            </Button>

            <Button variant="secondary" size="icon">
              <PlusIcon className="size-4" />
            </Button>
          </div>

          {isOpen && <NodeList tree={tree!} />}
        </>
      )}
    </section>
  );
};

export default HomePage;
