import React from 'react';
import { Spacing, bootstrap } from 'react-elemental';
import SampleButton from './components/button';
import SampleText from './components/text';

bootstrap();

const App = () => (
  <Spacing size="huge" style={{ maxWidth: '900px' }} top bottom right left>
    <SampleButton />
    <SampleText />
  </Spacing>
);

export default App;
