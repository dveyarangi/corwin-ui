import {FC} from 'react';
import { useRecoilState } from 'recoil';

import CodeMirror from '@uiw/react-codemirror';
import { python } from '@codemirror/lang-python';
import { darcula } from '@uiw/codemirror-theme-darcula';
import { getState } from '../actions/DataTags';

type CodeEditorProps = {
    tag: string;
  };

export const CodeEditor:FC<CodeEditorProps> = ({tag}) =>{


    const [value, _] = useRecoilState(getState(tag));

    return <CodeMirror 
        className="code-editor"
        theme='dark' 
        extensions={[python()]} 
        value = {value}
         />;
}
