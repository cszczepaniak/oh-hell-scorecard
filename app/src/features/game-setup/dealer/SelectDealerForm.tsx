import React from 'react';

import { useHistory } from 'react-router';

import { useDealer, usePlayerNames } from '../hooks';
import { SelectDealerFormUI } from './SelectDealerFormUI';

export interface SelectDealerFormUIProps {
    playerNames: string[];
    handleDealerChange: (val: string) => void;
    handleClickBack: () => void;
    handleClickNext: () => void;
}

export const SelectDealerForm: React.FunctionComponent = () => {
    const { playerNames } = usePlayerNames();
    const { setDealer, unsetDealer } = useDealer();
    const history = useHistory();

    const handleClickBack = () => {
        unsetDealer();
        history.push('/newGame');
    };

    const handleClickNext = () => {
        history.push('/gameSettings');
    };

    const props: SelectDealerFormUIProps = {
        playerNames,
        handleDealerChange: setDealer,
        handleClickBack,
        handleClickNext,
    };

    return <SelectDealerFormUI {...props} />;
};
