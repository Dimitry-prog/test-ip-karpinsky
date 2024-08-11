import { NodeType } from '@/pages/home/types';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shared/components/ui/dropdown-menu.tsx';
import { MoreVertical } from 'lucide-react';
import { Button } from '@/shared/components/ui/button.tsx';
import { useDialogsType } from '@/pages/home/hooks/use-dialogs-type.ts';
import TreeForm from '@/pages/home/components/tree-form.tsx';
import DeleteNodeConfirmation from '@/pages/home/components/delete-node-confirmation.tsx';

type NodeActionsDropdownProps = {
  node: NodeType;
};

const TreeActionsDropdown = ({ node }: NodeActionsDropdownProps) => {
  const { dialogsType, toggleDialog } = useDialogsType();

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button aria-haspopup="true" size="icon" variant="ghost">
            <MoreVertical />
            <span className="sr-only">Actions</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem
            onSelect={() => {
              toggleDialog('create');
            }}
          >
            Create
          </DropdownMenuItem>
          <DropdownMenuItem
            onSelect={() => {
              toggleDialog('edit');
            }}
          >
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem
            variant="destructive"
            onSelect={() => {
              toggleDialog('delete');
            }}
          >
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <TreeForm
        type="Edit"
        node={node}
        onOpenChange={() => toggleDialog('edit')}
        open={dialogsType['edit']}
        onClose={() => toggleDialog('edit')}
      />
      <TreeForm
        type="Create"
        node={node}
        onOpenChange={() => toggleDialog('create')}
        open={dialogsType['create']}
        onClose={() => toggleDialog('create')}
      />
      <DeleteNodeConfirmation
        node={node}
        onOpenChange={() => toggleDialog('delete')}
        open={dialogsType['delete']}
      />
    </>
  );
};

export default TreeActionsDropdown;
