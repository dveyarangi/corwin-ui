import { atom, RecoilState } from 'recoil';


export const chatState = atom({ key: 'chatState', default: ''})
export const consoleState = atom({ key: 'consoleState', default: ''})
export const statusState = atom({ key: 'statusState', default: ''})

var atoms: { [key: string]: RecoilState<any> } = {
    chatState: chatState,
    consoleState: consoleState,
    statusState: statusState,
};

export const getState = (tag:string):RecoilState<any> => {
    return atoms[tag];
}
