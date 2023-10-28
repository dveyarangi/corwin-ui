import { atom, RecoilState } from 'recoil';


export const taskState = atom({ key: 'taskState', default: ''})

export const codeState =  atom({ key: 'codeState', default: ''})
export const testState =  atom({ key: 'testState', default: ''})
export const importsState =  atom({ key: 'importsState', default: ''})

export const statusState =  atom<string | undefined>({ key: 'statusState', default: ''})
export const consoleState =  atom({ key: 'consoleState', default: {}})

var atoms: { [key: string]: RecoilState<any> } = {

    taskState: taskState,
    codeState: codeState,
    testState: testState,
    importsState: importsState,
    statusState: statusState,
    consoleState: consoleState,

};

export const getState = (tag:string):RecoilState<any> => {
    return atoms[tag];
}
