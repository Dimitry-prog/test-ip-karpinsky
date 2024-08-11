import { SubmitHandler, useForm } from 'react-hook-form';
import { NodeType, TreeFormType } from '@/pages/home/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { treeFormSchema } from '@/pages/home/schema';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/shared/components/ui/form.tsx';
import { Button } from '@/shared/components/ui/button.tsx';
import { Loader2 } from 'lucide-react';
import { Input } from '@/shared/components/ui/input.tsx';
import { useCreateNode } from '@/pages/home/hooks/use-create-node.ts';
import { useUpdatedNode } from '@/pages/home/hooks/use-updated-node.ts';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/shared/components/ui/dialog.tsx';

type TreeFormProps = {
  type: 'Create' | 'Edit';
  node?: NodeType;
  onOpenChange: () => void;
  open: boolean;
  onClose: () => void;
};

const TreeForm = ({ type, node, open, onOpenChange, onClose }: TreeFormProps) => {
  const initialValues = type === 'Edit' && node ? { name: node.name } : { name: '' };

  const form = useForm<TreeFormType>({
    defaultValues: initialValues,
    resolver: zodResolver(treeFormSchema),
  });
  const createNode = useCreateNode();
  const updatedNode = useUpdatedNode();

  const onSubmit: SubmitHandler<TreeFormType> = async (data) => {
    if (type === 'Create') {
      createNode.mutate({
        treeName: 'my',
        parentNodeId: node?.id as number,
        nodeName: data.name,
      });
      onClose();
    }

    if (type === 'Edit') {
      updatedNode.mutate({
        treeName: 'my',
        nodeId: node?.id as number,
        newNodeName: data.name,
      });
      onClose();
    }
  };

  return (
    <Dialog onOpenChange={onOpenChange} open={open}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{type === 'Create' ? 'Create node' : 'Edit node'}</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Node name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter node name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="flex items-center gap-2">
              {`${type} Node`}
              {form.formState.isSubmitting && <Loader2 className="size-4 animate-spin" />}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default TreeForm;
