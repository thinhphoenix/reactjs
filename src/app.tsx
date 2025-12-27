import '@/global.css';
import { envConfig } from '@/helpers/constants/env-config';
import { routeTree } from '@/route-tree.gen';
import { createRouter, RouterProvider } from '@tanstack/react-router';
import 'antd/dist/reset.css';

const router = createRouter({ routeTree });

const App = () => {
  return <RouterProvider router={router} basepath={envConfig.base} />;
};

export default App;
