import React from 'react';
import { Spacing, bootstrap } from 'react-elemental';
import SampleButton from './components/button';
import SampleCheckbox from './components/checkbox';
import SampleLoadingBar from './components/loading-bar';
import SampleSelectList from './components/select-list';
import SampleTag from './components/tag';
import SampleText from './components/text';
import SampleTextField from './components/text-field';

bootstrap();

const App = () => (
  <Spacing size="huge" style={{ maxWidth: '900px' }} top bottom right left>
    <SampleCheckbox />
    <SampleLoadingBar />
    <SampleTag />
    <SampleSelectList />
    <SampleTextField />
    <SampleButton />
    <SampleText />
  </Spacing>
);

export default App;
