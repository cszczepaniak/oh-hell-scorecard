import React, { useState } from 'react';

import { Blockquote, Box, Paragraph, Set } from 'bumbag';

import { IconButton } from '../iconButton/IconButton';

interface SettingExplainerProps {
  text: string;
  children: JSX.Element;
}

export const SettingExplainerWrapper: React.FunctionComponent<SettingExplainerProps> = ({ text, children }) => {
  const [show, setShow] = useState(false);

  return (
    <React.Fragment>
      <Set>
        <Box width='25%'>{children}</Box>
        <IconButton icon='solid-question-circle' onClick={() => setShow(!show)} />
      </Set>
      {show && (
        <Blockquote border='none' marginY='0.5rem' width='90%'>
          <Paragraph color='#444444' fontStyle='italic'>
            {text}
          </Paragraph>
        </Blockquote>
      )}
    </React.Fragment>
  );
};
