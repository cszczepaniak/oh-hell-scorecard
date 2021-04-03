import React from 'react';

import { useHistory } from 'react-router';

import { Button } from '../../shared/ui-components/Button';

interface Props {
    title: string;
    nextButtonText?: string;
    backTo?: string;
    nextTo?: string;
    onClickBack?: () => void;
    onClickNext?: () => void;
}

export const PreGameShell: React.FunctionComponent<Props> = ({
    children,
    title,
    backTo,
    nextTo,
    onClickNext,
    onClickBack,
    nextButtonText = 'Next',
}) => {
    const history = useHistory();
    const handleClickNext = () => {
        if (onClickNext) {
            onClickNext();
            return;
        }
        if (nextTo) {
            history.push(nextTo);
            return;
        }
        throw new Error('Must set either nextTo or onClickNext');
    };
    const handleClickBack = () => {
        if (onClickBack) {
            onClickBack();
            return;
        }
        if (backTo) {
            history.push(backTo);
            return;
        }
        throw new Error('Must set either backTo or onClickBack');
    };

    return (
        <div className='flex flex-col space-y-4 items-center bg-white max-w-md mx-auto sm:my-8 p-4 sm:rounded-2xl sm:border sm:border-gray-200 sm:shadow-md'>
            <h3 className='font-semibold text-lg'>{title}</h3>
            <div className='flex flex-col space-y-4 w-full px-8'>
                {children}
                <div className='flex space-x-4'>
                    <Button onClick={handleClickBack} variant='secondary' className='w-full'>
                        Back
                    </Button>
                    <Button onClick={handleClickNext} variant='primary' className='w-full'>
                        {nextButtonText}
                    </Button>
                </div>
            </div>
        </div>
    );
};
