import {Layout, Model, TabNode, IJsonModel} from 'flexlayout-react';

import 'flexlayout-react/style/dark.css';  
import {CodeEditor} from '../shared/CodeEditor';
import {TextEditor} from '../shared/TextEditor';
import {Console} from '../shared/Console';
import {Explorer} from '../Explorer';

import './WorkArea.css'
import modelJsonRaw from './WorkArea.json';

const modelJson = modelJsonRaw as unknown as IJsonModel;
export function WorkArea() {
    const factory = (node: TabNode) => {
        var component = node.getComponent();

        switch (component) {
            case "taskPanel":
                return <TextEditor tag={'taskState'} />;
            case "testPanel":
                return <CodeEditor tag={'testState'} />;
            case "functionPanel":
                return <CodeEditor tag={'codeState'} />;
            case "importsPanel":
                return <CodeEditor tag={'importsState'} />;
            case "explorerPanel":
                return <Explorer />;
            case "consolePanel":
                return <Console />;
        }
    };

    const model = Model.fromJson(modelJson);  

    return (<Layout model={model} factory={factory} />);
    
}


export default WorkArea;
