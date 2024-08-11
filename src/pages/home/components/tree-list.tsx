import TreeItem from '@/pages/home/components/tree-item.tsx';
import { TreeType } from '@/pages/home/types';

type TreeListProps = {
  tree: TreeType;
};

const TreeList = ({ tree }: TreeListProps) => {
  return (
    <ul className="ml-2 flex flex-col gap-2">
      {tree.children.map((node) => (
        <TreeItem node={node} key={node.id} />
      ))}
    </ul>
  );
};

export default TreeList;
