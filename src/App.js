import React, { lazy, useEffect } from 'react'
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Layout from './utility/layouts/Parent-page/parent-page'
import { useSelector, useDispatch } from 'react-redux'
import { checkUser } from './redux/slices/Auth';

import './assets/style.scss'

const Home = lazy(() => import("./views/explore/home/home"))
const MasterPage = lazy(() => import("./views/pages/master-page/master-page"))
const Blog = lazy(() => import("./views/explore/blog/blog-page"))
const Profile = lazy(() => import("./views/pages/profile/profile"))
const Video = lazy(() => import("./views/explore/video/video-page"))

const BlogDashboard = lazy(() => import("./views/dashboard/blog/blog"))
const VideoDashboard = lazy(() => import("./views/dashboard/video/video"))
const CreateBlog = lazy(() => import("./views/dashboard/blog/__pages/create"))
const CreateVideo = lazy(() => import("./views/dashboard/video/__pages/create"))

const FAQ = lazy(() => import("./views/pages/faq/FAQ"))
const AccountSetting = lazy(() => import("./views/pages/account-settings/AccountSettings"))
const Loggin = lazy(() => import("./views/pages/logging/logging"))
const Forum = lazy(() => import("./views/forum/forum"))
const Post = lazy(() => import("./views/forum/post"))
// const Chats = lazy(() => import("./views/chats/chats"))
// const Shop = lazy(() => import("./views/shop/shop"))
const MyServices = lazy(() => import("./views/my-services/my-services"))
const NotFoundPage = lazy(() => import("./views/pages/404/404"));

// informative
const Sitemap = lazy(() => import("./views/pages/sitemap/sitemap"))
const Aboutus = lazy(() => import("./views/pages/informative/about-us"))
const CookiePolicy = lazy(() => import("./views/pages/informative/cookie-policy"))
const PrivacyPolicy = lazy(() => import("./views/pages/informative/privacy-policy"))
const TermsAndCondition = lazy(() => import("./views/pages/informative/terms-and-conditions"))

// admin page
const AdminPage = lazy(() => import("./views/pages/admin/admin"))

function App() {

  const dispatch = useDispatch();
  const authStateID = useSelector(e => e.auth.id);
  const appState = useSelector(e => e.appState);

  useEffect(() => {
    dispatch(checkUser());
  }, [authStateID]);


  return (
    <BrowserRouter>
      <Layout
        alert={appState.alert}
        message={appState.message}
        loading={appState.isLoading}
      >
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/filter/:for" element={<MasterPage />} />
          <Route exact path="/read" element={<Blog />} />
          <Route exact path="/blog-analytics" element={<BlogDashboard />} />
          <Route exact path="/record-analytics" element={<VideoDashboard />} />
          <Route exact path="/create-blog" element={<CreateBlog />} />
          <Route exact path="/create-video" element={<CreateVideo />} />
          <Route exact path="/watch" element={<Video />} />

          <Route exact path="/profile/:id" element={<Profile />} />
          <Route exact path="/faq" element={<FAQ />} />
          <Route exact path="/prefrences" element={<AccountSetting />} />
          <Route exact path="/authorization" element={<Loggin />} />
          <Route exact path="/what" element={<Forum />} />
          <Route exact path="/post" element={<Post />} />
          {/* <Route exact path="/chats" element={<Chats />} />
          <Route exact path="/shop" element={<Shop />} /> */}
          <Route exact path="/my-services" element={<MyServices />} />

          <Route exact path="/sitemap" element={<Sitemap />} />
          <Route exact path="/about-us" element={<Aboutus />} />
          <Route exact path="/cookie-policy" element={<CookiePolicy />} />
          <Route exact path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route exact path="/terms-and-conditions" element={<TermsAndCondition />} />

          <Route exact path="/admin" element={<AdminPage />} />

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Layout >
    </BrowserRouter>
  );
}

export default App;
