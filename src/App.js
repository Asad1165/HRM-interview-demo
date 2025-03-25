// scroll bar
import 'simplebar-react/dist/simplebar.min.css';

// image
import 'react-lazy-load-image-component/src/effects/blur.css';

// ----------------------------------------------------------------------
// ** global styling

import './theme/scss/global/style-spaces.scss';
import './theme/scss/global/style-textfield.scss';

// ----------------------------------------------------------------------

// redux
import ReduxProvider from 'src/redux/redux-provider';
// routes
import Router from 'src/routes/sections';
// theme
import ThemeProvider from 'src/theme';
// hooks
import { useScrollToTop } from 'src/hooks/use-scroll-to-top';
// components
import ProgressBar from 'src/components/progress-bar';
import MotionLazy from 'src/components/animate/motion-lazy';
import { SettingsProvider, SettingsDrawer } from 'src/components/settings';

// ----------------------------------------------------------------------

export default function App() {
  useScrollToTop();

  return (
    <ReduxProvider>
      <SettingsProvider
        defaultSettings={{
          themeMode: 'dark',
          themeDirection: 'ltr',
          themeContrast: 'default',
          themeLayout: 'vertical',
          themeColorPresets: 'default',
          themeStretch: false,
        }}
      >
        <ThemeProvider>
          <MotionLazy>
            <SettingsDrawer />
            <ProgressBar />
            <Router />
          </MotionLazy>
        </ThemeProvider>
      </SettingsProvider>
    </ReduxProvider>
  );
}
