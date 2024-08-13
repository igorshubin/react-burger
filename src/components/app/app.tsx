import React, {FC, useEffect} from 'react';
import {Route, Routes, useLocation, useNavigate} from 'react-router-dom';
import AppHeader from '../app-header';
import s from "./styles.module.css";
import {useAppSelector} from '../../hooks';
import {PAGES} from '../../utils/constants';

/* COMPONENTS */
import Modal from '../modal';
import IngredientDetails from '../ingredient-details';
import ProtectedRoutes from '../protected-routes';
import ProfileOrderDetails from '../profile-order-details';

/* PAGES */
import Constructor from '../../pages/constructor';
import Ingredient from '../../pages/ingredient';
import Login from '../../pages/login';
import Register from '../../pages/register';
import ForgotPassword from '../../pages/forgot-password';
import ResetPassword from '../../pages/reset-password';
import NotFound from '../../pages/not-found';
import Profile from '../../pages/profile';
import ProfileOrders from '../../pages/profile-orders';
import Order from '../../pages/order';
import Feed from '../../pages/feed';

const App: FC = () => {
  const popupStore = useAppSelector(state => state.popup);

  /**
   * switch between two routes depending on backgroundLocation state
   * https://github.com/remix-run/react-router/tree/dev/examples
   */
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as { backgroundLocation?: Location };

  // goto ingredient page when modal is opened & user click on browser url
  useEffect(() => {
    if (state?.backgroundLocation && !popupStore.data) {
      navigate(location.pathname);
    }
  }, [state?.backgroundLocation, popupStore.data, navigate, location.pathname]);

  return (
    <div className={s['app']}>
      <AppHeader />

      <Routes location={state?.backgroundLocation || location}>
        {/*ITEMS*/}
        <Route path={PAGES.ingredientId} element={<Ingredient />} />
        <Route path={PAGES.constructor} element={<Constructor />} />
        <Route path={PAGES.feed} element={<Feed />} />
        <Route path={PAGES.feedOrder} element={<Order />} />

        <Route element={<ProtectedRoutes type={'login'} />}>
          {/*AUTH*/}
          <Route path={PAGES.login} element={<Login />} />
          <Route path={PAGES.register} element={<Register />} />
          <Route path={PAGES.forgotPassword} element={<ForgotPassword />} />
          <Route path={PAGES.resetPassword} element={<ResetPassword />} />
        </Route>

        <Route element={<ProtectedRoutes type={'profile'} />}>
          {/*PROFILE*/}
          <Route path={PAGES.profileOrders} element={<ProfileOrders />} />
          <Route path={PAGES.profileOrder} element={<Order />} />
          <Route path={PAGES.profile} element={<Profile />} />
        </Route>

        {/*404*/}
        <Route path="*" element={<NotFound />} />
      </Routes>

      {/*virtual route (with modal)*/}
      {state?.backgroundLocation && popupStore.data && (
        <Routes>
          <Route path={PAGES.feedOrder} element={
            <Modal onClose={() => {navigate(PAGES.feed)}}>
              <ProfileOrderDetails order={popupStore.data} />
            </Modal>
          } />

          <Route path={PAGES.profileOrder} element={
            <Modal onClose={() => {navigate(PAGES.profileOrders)}}>
              <ProfileOrderDetails order={popupStore.data} />
            </Modal>
          } />

          <Route path={PAGES.ingredientId} element={
            <Modal onClose={() => {navigate(PAGES.constructor)}}>
              <IngredientDetails data={popupStore.data} />
            </Modal>
          } />
        </Routes>
      )}
    </div>
  );
}

export default App;
