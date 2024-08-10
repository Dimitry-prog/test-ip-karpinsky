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
