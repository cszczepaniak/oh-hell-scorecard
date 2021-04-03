import React, { useEffect, useState } from 'react';

import { useHistory } from 'react-router';

import { useDealer, usePlayerNames } from '../hooks';
import { SelectDealerFormUI } from './SelectDealerFormUI';

export interface SelectDealerFormUIProps {
    playerNames: string[];
    dealer: string;
    handleDealerChange: (val: string, i?: number) => void;
    handleClickBack: () => void;
    handleClickNext: () => void;
    error: string;
    showError: boolean;
}

export const SelectDealerForm: React.FunctionComponent = () => {
    const [error, setError] = useState('');
    const [showError, setShowError] = useState(false);
    const { playerNames } = usePlayerNames();
    const { dealer, setDealerIndex, unsetDealer } = useDealer();
    const history = useHistory();
    const handleClickNext = () => {
        if (!showError) {
            setShowError(true);
        }
        if (!error) {
            history.push('/gameSettings');
        }
    };

    const handleClick = (name: string, i = 0) => {
        if (dealer === name) {
            unsetDealer();
            if (showError) {
                setShowError(false);
            }
            return;
        }
        setDealerIndex(i);
    };

    useEffect(() => {
        if (!dealer) {
            setError('Must select a dealer!');
        } else {
            setError('');
        }
    }, [dealer, setError]);

    const props: SelectDealerFormUIProps = {
        playerNames,
        dealer,
        handleDealerChange: handleClick,
        handleClickBack: () => {
            unsetDealer();
            history.push('/newGame');
        },
        handleClickNext,
        error,
        showError,
    };

    return <SelectDealerFormUI {...props} />;
};
