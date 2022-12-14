import { SetStateAction, useState } from 'react';
import { Box } from '@mui/material';
import {
  ExpandLess as ExpandLessIcon,
  ExpandMore as ExpandMoreIcon,
} from '@mui/icons-material';
import { TreeView, TreeItem } from '@mui/lab';
import { styles } from './styles';

type Props = {
  title: string;
  customLabel?: React.ReactNode | null;
  isFolding?: boolean;
  children: React.ReactNode;
};

// 기본적으로 expanded상태에서 시작한다.
const FoldingSection = (props: Props) => {
  // default value(props.title) 세팅 안할경우 collapse상태에서 시작
  const [expanded, setExpanded] = useState([
    !props.isFolding ? props.title : '',
  ]);
  const handleToggle = (event: any, nodeIds: SetStateAction<string[]>) => {
    setExpanded(nodeIds);
  };

  return (
    <TreeView
      defaultExpandIcon={
        <Box sx={styles.arrowIcon}>
          <ExpandMoreIcon />
        </Box>
      }
      defaultCollapseIcon={
        <Box sx={styles.arrowIcon}>
          <ExpandLessIcon />
        </Box>
      }
      expanded={expanded}
      onNodeToggle={handleToggle}
      sx={styles.treeView}
    >
      <TreeItem
        TransitionProps={{ unmountOnExit: false }}
        nodeId={props.title}
        sx={styles.mainTreeItem}
        label={props.customLabel ? props.customLabel : <Box>{props.title}</Box>}
      >
        {props.children}
      </TreeItem>
    </TreeView>
  );
};
export default FoldingSection;
