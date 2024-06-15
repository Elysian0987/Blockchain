import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard')));

// sample page routing
const SamplePage = Loadable(lazy(() => import('views/sample-page')));

const Home = Loadable(lazy(() => import('views/home')));

const Campaign = Loadable(lazy(() => import('views/create-campaigns')));

const CampaignDetails = Loadable(lazy(() => import('views/campaign-details')));


// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: '/',
      element: <DashboardDefault />
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'default',
          element: <DashboardDefault />
        }
      ]
    },
    {
      path: '/home',
      element: <Home />
    },
    {
      path: '/create-campaigns',
      element: <Campaign />
    },
    {
      path: '/campaign-details/:title',
      element: <CampaignDetails />
    }
  ]
};

export default MainRoutes;
