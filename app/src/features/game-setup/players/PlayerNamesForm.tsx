import React, { useEffect, useState } from 'react';

import { useHistory } from 'react-router-dom';

import { useGame } from '../../game/game-hooks';
import { useDealer, usePlayerNames } from '../hooks';
import { PlayerNamesFormUI } from './PlayerNamesFormUI';

interface PlayerNamesFormProps {
    minPlayers: number;
    maxPlayers: number;
}

export interface PlayerNamesFormUIProps {
    addPlayer: (name: string) => void;
    playerNames: string[];
    setName: (name: string, i: number) => void;
    errorText: string;
    handleGoToNext: () => void;
    validation: string[];
    handlePlayerNameBlur: (idx: number) => void;
    removePlayer: (idx: number) => void;
    canRemovePlayer: boolean;
    canAddPlayer: boolean;
    nextTo: string;
    backTo: string;
}

const playerNamesError = 'Player names must be unique and non-empty';
const dealerError = 'Please select a dealer';

export const PlayerNamesForm: React.FunctionComponent<PlayerNamesFormProps> = ({ minPlayers, maxPlayers }) => {
    const {
        playerNames,
        dealer,
        validation,
        setName,
        addPlayer,
        removePlayer,
        handlePlayerNameBlur,
    } = usePlayerFormData(minPlayers, maxPlayers);
    const [errorText, setErrorText] = useState('');

    const history = useHistory();

    const handleGoToNext = () => {
        if (playerNames.some(n => n.length === 0) || hasDuplicates(playerNames)) {
            setErrorText(playerNamesError);
            return;
        }
        history.push('/selectDealer');
    };

    // clear error text if the errors have been fixed
    useEffect(() => {
        if (errorText === playerNamesError && !playerNames.some(n => n.length === 0) && !hasDuplicates(playerNames)) {
            setErrorText('');
        }
        if (errorText === dealerError && dealer.length > 0) {
            setErrorText('');
        }
    }, [errorText, playerNames, dealer]);

    const props: PlayerNamesFormUIProps = {
        addPlayer,
        canAddPlayer: playerNames.length < maxPlayers,
        removePlayer,
        canRemovePlayer: playerNames.length > minPlayers,
        playerNames,
        setName,
        errorText,
        validation,
        handleGoToNext,
        handlePlayerNameBlur,
        nextTo: '/selectDealer',
        backTo: '/',
    };

    return <PlayerNamesFormUI {...props} />;
};

// custom hook for handling the form data
const usePlayerFormData = (minPlayers: number, maxPlayers: number) => {
    const { addPlayer, removePlayerAt, setPlayerName } = useGame();
    const { playerNames } = usePlayerNames();
    const { dealer, unsetDealer } = useDealer();
    const [touched, setTouched] = useState(Array(playerNames.length).fill(false));
    const [validation, setValidation] = useState<string[]>(Array(playerNames.length).fill(''));

    // validation for each name
    useEffect(() => {
        setValidation(
            playerNames.map((p, i) => {
                if (touched[i] && p.length === 0) {
                    return 'Name is required';
                }
                return '';
            }),
        );
    }, [playerNames, touched]);

    return {
        playerNames,
        dealer,
        validation,
        setName: setPlayerName,
        unsetDealer,
        addPlayer: (playerName: string) => {
            if (playerNames.length < maxPlayers) {
                addPlayer(playerName);
                setTouched([...touched, false]);
                setValidation([...validation, '']);
            }
        },
        removePlayer: (idx: number) => {
            if (playerNames.length > minPlayers) {
                removePlayerAt(idx);
                setTouched(touched.filter((_, i) => i !== idx));
                setValidation(validation.filter((_, i) => i !== idx));
            }
        },
        handlePlayerNameBlur: (idx: number) => {
            const touchedCopy = [...touched];
            touchedCopy[idx] = true;
            setTouched(touchedCopy);
        },
    };
};

const hasDuplicates = (playerNames: string[]): boolean => {
    const nameMap: { [key: string]: string } = {};
    for (let i = 0; i < playerNames.length; i++) {
        if (playerNames[i] in nameMap) {
            return true;
        }
        nameMap[playerNames[i]] = '';
    }
    return false;
};
