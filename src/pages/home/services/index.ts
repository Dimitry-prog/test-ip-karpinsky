import { axiosInstance } from '@/shared/lib/api.ts';
import { CreateNodeType, DeleteNodeType, TreeType, UpdateNodeType } from '@/pages/home/types';

export const getTreeById = async (id: string) => {
  const tree = await axiosInstance.post<TreeType>(`api.user.tree.get?treeName=${id}`);
  return tree.data;
};

export const createNode = async (data: CreateNodeType) => {
  await axiosInstance.post(
    `api.user.tree.node.create?treeName=${data.treeName}&parentNodeId=${data.parentNodeId}&nodeName=${data.nodeName}`
  );
};

export const updateNode = async (data: UpdateNodeType) => {
  await axiosInstance.post(
    `api.user.tree.node.rename?treeName=${data.treeName}&nodeId=${data.nodeId}&newNodeName=${data.newNodeName}`
  );
};

export const deleteNode = async (data: DeleteNodeType) => {
  await axiosInstance.post(
    `api.user.tree.node.delete?treeName=${data.treeName}&nodeId=${data.nodeId}`
  );
};
