import { axiosInstance } from '../../../shared/lib/api.ts';
import { TreeType } from '../types';

export const getTreeById = async (id: string) => {
  const tree = await axiosInstance.post<TreeType>(`api.user.tree.get?treeName=${id}`);
  return tree.data;
};
