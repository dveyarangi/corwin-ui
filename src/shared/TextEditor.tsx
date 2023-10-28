import {FC} from 'react';
import { useRecoilState } from 'recoil';

import { getState } from '../actions/DataTags';

type TextEditorProps = {
    tag: string;
  };

export const TextEditor:FC<TextEditorProps> = ({tag}) =>{

    const [_, setText] = useRecoilState(getState(tag));

    const onChange = (event:any) => {
      setText(event.target.value);
    };


    return <textarea spellCheck={false} onChange={onChange} />;
}
