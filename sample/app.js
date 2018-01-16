import React from 'react';
import { Elemental, Spacing } from 'react-elemental';
import karlaBold from 'react-elemental-fonts/karla-bold';
import karlaRegular from 'react-elemental-fonts/karla-regular';
import sourceCodeProMedium from 'react-elemental-fonts/source-code-pro-medium';
import sourceCodeProRegular from 'react-elemental-fonts/source-code-pro-regular';
import SampleAlert from 'components/alert';
import SampleButton from 'components/button';
import SampleCheckbox from 'components/checkbox';
import SampleLink from 'components/link';
import SampleLoadingBar from 'components/loading-bar';
import SampleModal from 'components/modal';
import SamplePulsator from 'components/pulsator';
import SampleSelectList from 'components/select-list';
import SampleSpinner from 'components/spinner';
import SampleTabs from 'components/tabs';
import SampleTag from 'components/tag';
import SampleText from 'components/text';
import SampleTextArea from 'components/text-area';
import SampleTextField from 'components/text-field';
import SampleToast from 'components/toast';
import SampleTooltip from 'components/tooltip';

const App = () => (
  <Elemental
    fontOpts={{
      primary: {
        regular: karlaRegular,
        bold: karlaBold,
      },
      secondary: {
        regular: sourceCodeProRegular,
        bold: sourceCodeProMedium,
      },
    }}
  >
    <Spacing size="huge" style={{ maxWidth: '900px' }} top bottom right left>
      <SampleTabs />
      <SampleToast />
      <SampleModal />
      <SampleTooltip />
      <SamplePulsator />
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
  </Elemental>
);

export default App;
