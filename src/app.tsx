import '@/global.css';
import { createRouter, RouterProvider } from '@tanstack/react-router';
import { envConfig } from '@/helpers/constants/env-config';
import { routeTree } from '@/route-tree.gen';
import 'antd/dist/reset.css';

const router = createRouter({ routeTree });

const App = () => {
  return <RouterProvider router={router} basepath={envConfig.base} />;
};

export default App;
