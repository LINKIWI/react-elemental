import React from 'react';
import { Spacing, bootstrap } from 'react-elemental';
import SampleAlert from './components/alert';
import SampleButton from './components/button';
import SampleCheckbox from './components/checkbox';
import SampleLink from './components/link';
import SampleLoadingBar from './components/loading-bar';
import SampleModal from './components/modal';
import SampleSelectList from './components/select-list';
import SampleSpinner from './components/spinner';
import SampleTag from './components/tag';
import SampleText from './components/text';
import SampleTextArea from './components/text-area';
import SampleTextField from './components/text-field';
import SampleToast from './components/toast';
import SampleTooltip from './components/tooltip';

bootstrap();

const App = () => (
  <Spacing size="huge" style={{ maxWidth: '900px' }} top bottom right left>
    <SampleToast />
    <SampleModal />
    <SampleTooltip />
    <SampleSpinner />
    <SampleLink />
    <SampleTextArea />
    <SampleAlert />
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
