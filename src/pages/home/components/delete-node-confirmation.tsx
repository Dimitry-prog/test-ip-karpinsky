import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/shared/components/ui/alert-dialog.tsx';
import { useDeleteNode } from '@/pages/home/hooks/use-delete-node.ts';
import { NodeType } from '@/pages/home/types';

type DeleteNodeConfirmationProps = {
  node: NodeType;
  onOpenChange: () => void;
  open: boolean;
};

const DeleteNodeConfirmation = ({ node, open, onOpenChange }: DeleteNodeConfirmationProps) => {
  const deleteNode = useDeleteNode();

  const handleDelete = () => {
    deleteNode.mutate({
      treeName: 'my',
      nodeId: node.id,
    });
  };

  return (
    <AlertDialog onOpenChange={onOpenChange} open={open}>
      <AlertDialogContent className="bg-white">
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure you want to delete?</AlertDialogTitle>
          <AlertDialogDescription>This will permanently delete this node</AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>

          <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteNodeConfirmation;
