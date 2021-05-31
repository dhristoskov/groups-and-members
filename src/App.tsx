import { Fragment } from 'react';
import { useLocation } from 'react-router-dom';
import { Route, Switch, Redirect } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion';

import Header from './components/HeaderComponent/Header/Header';
import ContextLayout from './components/shared-components/Layouts/ContextLayout/ContextLayout';
import GroupsPage from './pages/GroupsPage/GroupsPage';
import UsersPage from './pages/UsersPage/UsersPage';
import GroupPage from './pages/GroupPage/GroupPage';
import UserPage from './pages/UserPage/UserPage';

import './styles/global.scss';

const App = () => {

  const location = useLocation();

  return (
    <Fragment>
        <Header />
        <ContextLayout>
          <AnimatePresence exitBeforeEnter initial={false}>
            <Switch location={location} key={location.pathname}>
                <Route path='/groups/:id' component={GroupPage} />
                <Route path='/groups' component={GroupsPage} />
                <Route path='/users/:id' component={UserPage} />
                <Route path='/users' component={UsersPage} />
                <Redirect to='/groups'/>
            </Switch>
          </AnimatePresence>
        </ContextLayout>
    </Fragment>
  );
}

export default App;

