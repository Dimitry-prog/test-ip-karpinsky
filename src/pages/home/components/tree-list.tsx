import TreeItem from '@/pages/home/components/tree-item.tsx';
import { TreeType } from '@/pages/home/types';
import { AnimatePresence, motion } from 'framer-motion';

type TreeListProps = {
  tree: TreeType;
};

const TreeList = ({ tree }: TreeListProps) => {
  return (
    <AnimatePresence mode="wait">
      <motion.ul
        initial={{ opacity: 0, height: 0, y: -30 }}
        animate={{ opacity: 1, height: 'auto', y: 0 }}
        exit={{ opacity: 0, height: 0, y: -30 }}
        transition={{ duration: 0.3 }}
        className="ml-2"
      >
        {tree.children.map((node) => (
          <TreeItem node={node} key={node.id} />
        ))}
      </motion.ul>
    </AnimatePresence>
  );
};

export default TreeList;
