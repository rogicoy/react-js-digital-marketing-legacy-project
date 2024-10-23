/**
 **********************************************************************
 * This source code is shared for the sole purpose of demo. Do not copy!
 **********************************************************************
 **/

/// <reference types="react-scripts" />

// module for toast image editor since it doesnt have an equivalent typescript
declare module '@toast-ui/react-image-editor' {
  import ImageEditor from 'tui-image-editor';

  type Props = ConstructorParameters<typeof ImageEditor>[1];

  export default function BaseImageEditor(props: Props): JSX.Element;
}

declare module 'image-to-base64/browser';

declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: 'development' | 'production' | 'test';
    REACT_APP_ENVIRONMENT: 'development' | 'staging' | 'production';
    REACT_APP_GRAPHQL_URL: string;
    REACT_APP_API_URL: string;
    REACT_APP_STRIPE_KEY: string;
    REACT_APP_SOCKET_URL: string;
  }
}
