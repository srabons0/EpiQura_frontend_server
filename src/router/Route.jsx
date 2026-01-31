import { createBrowserRouter } from "react-router-dom";
import RouteLayout from "../layouts/RouteLayout";
import Home from "../pages/Home/Home";
import ContactUs from "../pages/contact/ContactUs";
import Recipes from "../pages/Recipes/Recipes";
import RecipesLayout from "../layouts/RecipesLayout";
import RecipesLoader from "../pages/Recipes/RecipesLoader";
import RecipeDetails from "../components/Shared/Recipes/RecipeDetails";
import AddToCart from "../pages/AddToCart/AddToCart";
import Login from "../Auth/Login";
import Register from "../Auth/Register";
import About from "../pages/About/About";
import Payment from "../pages/payment/Payment";
import PaymentLayout from "../layouts/PaymentLayout";
import PayOffline from "../PaymentMethod/PayOffline";
import PayOnline from "../PaymentMethod/PayOnline";
import AdminLayout from "../layouts/AdminLayout";
import AdminHome from "../dashboard/Admin/AdminHome";
import PrivateRoute from "../layouts/PrivateRoute";
import UserLayout from "../layouts/UserLayout";
import UserHome from "../dashboard/User/UserHome";
import PaymentHistory from "../dashboard/User/UserPayment/PaymentHistory";
import MyBooking from "../dashboard/User/MyBooking";
import UserProfile from "../dashboard/User/UserProfile";
import LogOut from "../dashboard/User/Logout";
import Notifications from "../dashboard/User/Notification";
import UsersManagement from "../dashboard/Admin/Users/UsersManagement";
import OrdersManagement from "../dashboard/Admin/Order/OrdersManagement";
import PaymentsManagement from "../dashboard/Admin/Payment/PaymentsManagement";
import ProductsManagement from "../dashboard/Admin/Product/Products/ProductsManagement";
import Logout from "../components/ui/logout";
import UserOrders from "../dashboard/User/UserOrder/UserOrders";
import AdminProfile from "../dashboard/Admin/AdminProfile";
import PaymentsHistory from "../dashboard/Admin/PaymentHistory/PaymentsHistory";
import ProductLayout from "../dashboard/Admin/Product/ProductLayout";
import ReviewLayout from "../dashboard/Admin/Review/ReviewLayout";
import ManageProductsLayout from "../dashboard/Admin/ManageProducts/ManageProductsLayout";
import UserReviewLayout from "../dashboard/User/Review/UserReviewLayout";
import Coverage from "../components/Coverage/Coverage";
import Forbidden from "../components/feature/Forbidden";
import NotFound from "../components/feature/NotFound";
import ForgotPassword from "../Auth/ForgotPassword";

export const Route = createBrowserRouter([
  {
    path: "/",
    Component: RouteLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "about",
        Component: About,
      },
      {
        path: "contact",
        Component: ContactUs,
      },
      {
        path: "login",
        Component: Login,
      },
      {
        path: "register",
        Component: Register,
      },
      {
        path: "coverage",
        Component: Coverage,
        loader: () => fetch("https://epi-qura-backend-server-red.vercel.app/coverage"),
      },
      {
        path: "addToCart",
        element: (
          <PrivateRoute>
            <AddToCart></AddToCart>
          </PrivateRoute>
        ),
      },
      {
        path: "recipe/:id",
        element: (
          <PrivateRoute>
            <RecipeDetails></RecipeDetails>
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "recipes",
    Component: RecipesLayout,
    children: [
      {
        index: true,
        Component: Recipes,
      },
      {
        path: "/recipes/:name",
        Component: RecipesLoader,
      },
    ],
  },
  {
    path: "payment",
    element: (
      <PrivateRoute>
        <PaymentLayout></PaymentLayout>
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: (
          <PrivateRoute>
            <Payment></Payment>
          </PrivateRoute>
        ),
      },
      {
        path: "offline",
        element: (
          <PrivateRoute>
            <PayOffline></PayOffline>
          </PrivateRoute>
        ),
      },
      {
        path: "online",
        element: (
          <PrivateRoute>
            <PayOnline></PayOnline>
          </PrivateRoute>
        ),
      },
    ],
  },
  // USER DASHBOARD

  {
    path: "dashboard/user",
    element: (
      <PrivateRoute>
        <UserLayout />
      </PrivateRoute>
    ),
    children: [
      { path: "home", Component: UserHome },
      {
        path: "payments",
        element: <PaymentHistory></PaymentHistory>,
      },
      {
        path: "bookings",
        element: <MyBooking></MyBooking>,
      },
      {
        path: "reviews",
        element: <UserReviewLayout />,
      },
      {
        path: "profile",
        element: <UserProfile></UserProfile>,
      },
      {
        path: "orders",
        element: <UserOrders></UserOrders>,
      },
      {
        path: "logout",
        element: <LogOut></LogOut>,
      },
      {
        path: "notifications",
        element: <Notifications></Notifications>,
      },
    ],
  },

  // ADMIN DASHBOARD
  {
    path: "dashboard/admin",
    element: (
      <PrivateRoute>
        <AdminLayout />
      </PrivateRoute>
    ),
    children: [
      { path: "home", Component: AdminHome },
      { path: "users", element: <UsersManagement></UsersManagement> },
      { path: "orders", element: <OrdersManagement /> },
      { path: "payments", element: <PaymentsManagement /> },
      {
        path: "paymentsHistory",
        element: <PaymentsHistory></PaymentsHistory>,
      },
      {
        path: "product",
        element: <ProductLayout></ProductLayout>,
        children: [{ path: "products", element: <ProductsManagement /> }],
      },
      {
        path: "manageProducts",
        element: <ManageProductsLayout />,
      },
      { path: "reviews", element: <ReviewLayout /> },
      { path: "profile", element: <AdminProfile /> },
      { path: "logout", element: <Logout /> },
    ],
  },
  {
    path: "*",
    Component: NotFound,
  },
  {
    path: "/forbidden",
    Component: Forbidden,
  },
  {
  path: "/forgot-password",
  element: <ForgotPassword />
}
]);
