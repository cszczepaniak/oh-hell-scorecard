import React, { useState } from 'react';

import { Blockquote, Flex, Paragraph } from 'bumbag';

import { IconButton } from '../../shared/components/iconButton/IconButton';

interface SettingExplainerProps {
  text: string;
  children: JSX.Element;
}

export const SettingExplainerWrapper: React.FunctionComponent<SettingExplainerProps> = ({ text, children }) => {
  const [show, setShow] = useState(false);

  return (
    <React.Fragment>
      <Flex direction='row' justifyContent='space-between'>
        {children}
        <IconButton icon='solid-question-circle' onClick={() => setShow(!show)} />
      </Flex>
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
