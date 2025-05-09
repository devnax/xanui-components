import React from 'react';
import { createRoot } from 'react-dom/client';
import Layout from './example/Layout';

const App = () => {
  return (<Layout />);
}
const rootEle = document.getElementById('root')
if (rootEle) {
  const root = createRoot(rootEle);
  root.render(<App />);
}
