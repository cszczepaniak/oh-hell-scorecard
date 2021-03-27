import React from 'react';

import { useHistory } from 'react-router';

import { useDealer, usePlayerNames } from '../hooks';
import { SelectDealerFormUI } from './SelectDealerFormUI';

export interface SelectDealerFormUIProps {
    playerNames: string[];
    handleDealerChange: (val: string) => void;
    handleClickBack: () => void;
    nextTo: string;
}

export const SelectDealerForm: React.FunctionComponent = () => {
    const { playerNames } = usePlayerNames();
    const { setDealer, unsetDealer } = useDealer();
    const history = useHistory();

    const props: SelectDealerFormUIProps = {
        playerNames,
        handleDealerChange: setDealer,
        handleClickBack: () => {
            unsetDealer();
            history.push('/newGame');
        },
        nextTo: '/gameSettings',
    };

    return <SelectDealerFormUI {...props} />;
};
