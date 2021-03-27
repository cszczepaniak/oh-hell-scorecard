import React, { useState } from 'react';

import clsx from 'clsx';

interface Props {
    open: boolean;
    onClose: () => void;
}

export const Modal: React.FunctionComponent<Props> = ({ children, open, onClose }) => {
    const [outsideDialog, setOutsideDialog] = useState(false);
    const handleClose = () => {
        if (outsideDialog) {
            onClose();
        }
    };
    return (
        <div
            id='modal_overlay'
            onClick={handleClose}
            className={clsx(
                'absolute',
                'inset-0',
                'bg-black',
                'bg-opacity-50',
                'h-screen',
                'w-full',
                'justify-center',
                'items-start',
                'md:items-center',
                'pt-10',
                'md:pt-0',
                {
                    ['flex']: open,
                    ['hidden']: !open,
                },
            )}
        >
            <div
                onMouseEnter={() => setOutsideDialog(false)}
                onMouseLeave={() => setOutsideDialog(true)}
                className='relative px-4 py-2 bg-white w-full max-w-md m-auto rounded-lg'
            >
                {children}
            </div>
        </div>
    );
};
