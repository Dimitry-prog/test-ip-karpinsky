import { z } from 'zod';
import { treeFormSchema } from '@/pages/home/schema';

export type TreeType = {
  id: number;
  name: string;
  children: NodeType[];
};

export type NodeType = {
  id: number;
  name: string;
  children: NodeType[];
};

export type CreateNodeType = {
  treeName: string;
  parentNodeId: number;
  nodeName: string;
};

export type UpdateNodeType = {
  treeName: string;
  nodeId: number;
  newNodeName: string;
};

export type DeleteNodeType = Omit<UpdateNodeType, 'newNodeName'>;

export type TreeFormType = z.infer<typeof treeFormSchema>;
