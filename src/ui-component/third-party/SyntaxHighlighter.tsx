/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

// material-ui
import { useTheme } from '@material-ui/core/styles';
import { Card } from '@material-ui/core';

// third-party
import SyntaxHighlighter from 'react-syntax-highlighter';
import { a11yDark, a11yLight } from 'react-syntax-highlighter/dist/esm/styles/hljs';

// ==============================|| SYNTAX HIGHLIGHTER ||============================== //

export interface ReactSyntaxHighlighterProps {
  codeString: string;
  showLineNumbers: boolean;
}
const ReactSyntaxHighlighter = ({ codeString, showLineNumbers = true }: ReactSyntaxHighlighterProps) => {
  const theme = useTheme();
  return (
    <Card
      sx={{
        fontSize: '1rem !important',
        overflow: 'hidden',
        '& pre': {
          margin: 0,
          padding: '16px !important',
          fontFamily: theme.typography.fontFamily,
          bgcolor: theme.palette.mode === 'dark' ? `${theme.palette.grey[50]} !important` : `${theme.palette.grey[900]} !important`
        }
      }}
    >
      <SyntaxHighlighter
        language="javacript"
        showLineNumbers={showLineNumbers}
        style={theme.palette.mode === 'dark' ? a11yLight : a11yDark}
      >
        {codeString}
      </SyntaxHighlighter>
    </Card>
  );
};

export default ReactSyntaxHighlighter;
