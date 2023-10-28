import { useRecoilState } from 'recoil';
import { statusState } from '../actions/DataTags';

import { Check, Autorenew } from '@mui/icons-material'

import './StatusBar.css'

export const StatusBar = () => {

    
    const [value, _] = useRecoilState(statusState);

    return (
        <div className="statusbar">
            {value ? <Autorenew className="status-icon spinner" /> : <Check className="status-icon" />}{value ? value : "Ready"}
        </div>
      );
} 
