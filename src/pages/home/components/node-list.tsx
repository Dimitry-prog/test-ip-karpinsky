import NodeItem from './node-item.tsx';
import { TreeType } from '../types';

type NodeListProps = {
  tree: TreeType;
};

const NodeList = ({ tree }: NodeListProps) => {
  return (
    <ul className="ml-2">
      {tree.children.map((node) => (
        <NodeItem node={node} key={node.id} />
      ))}
    </ul>
  );
};

export default NodeList;
