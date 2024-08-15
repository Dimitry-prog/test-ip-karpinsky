import { useState } from 'react';
import { useTree } from '@/pages/home/hooks/use-tree.ts';
import { ChevronRightIcon, Loader2, PlusIcon } from 'lucide-react';
import { Button } from '@/shared/components/ui/button.tsx';
import { cn } from '@/shared/lib/utils.ts';
import TreeList from '@/pages/home/components/tree-list.tsx';
import { useDialogsType } from '@/pages/home/hooks/use-dialogs-type.ts';
import TreeForm from '@/pages/home/components/tree-form.tsx';

const HomePage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { data: tree, isLoading, isError, error } = useTree('my');
  const { dialogsType, toggleDialog } = useDialogsType();

  return (
    <section className="flex flex-col gap-2">
      {isLoading ? (
        <Loader2 className="size-12 animate-spin self-center" data-testid="loader" />
      ) : isError ? (
        <h2 className="text-lg text-destructive">{error.message}</h2>
      ) : (
        <>
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              onClick={() => setIsOpen(!isOpen)}
              className="flex gap-2"
              data-testid="toggle-button"
            >
              {tree?.children && tree?.children.length > 0 && (
                <ChevronRightIcon className={cn('size-4 transition', isOpen && 'rotate-90')} />
              )}
              {tree?.name}
            </Button>

            <Button
              variant="secondary"
              size="icon"
              onClick={() => {
                toggleDialog('create');
              }}
              data-testid="create-button"
            >
              <PlusIcon className="size-4" />
            </Button>
          </div>

          {tree && isOpen && <TreeList tree={tree} />}
        </>
      )}

      <TreeForm
        type="Create"
        node={tree!}
        onOpenChange={() => toggleDialog('create')}
        open={dialogsType['create']}
        onClose={() => toggleDialog('create')}
      />
    </section>
  );
};

export default HomePage;
