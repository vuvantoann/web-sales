import HomePage from "../pages/HomePage/HomePage";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";
import Orderpage from "../pages/OrderPage/Orderpage";
import ProductsPage from "../pages/ProductsPage/ProductsPage";
import ProductDetailsPage from "../pages/ProductDetailsPage/ProductDetailsPage";
import RegisterPage from "../pages/RegisterPage/RegisterPage";
import LoginPage from "../pages/LoginPage/LoginPage";
import ListUser from "../pages/AdminPage/ListUser";
import TypeProductPage from "../pages/TypeProductPage/TypeProductPage";
import SignInPage from "../pages/SignInPage/SignInPage";
import SignUpPage from "../pages/SignUpPage/SingUpPage";
import ProfilePage from "../pages/ProfilePage/ProfilePage";
import AdminPage from "../pages/AdminPage/AdminPage";

export const routes = [
    {
        path: '/',
        page: HomePage,
        isShowHeader: true
    },
    {
        path: '/order',
        page: Orderpage,
        isShowHeader: true
    },
    {
        path: '/products',
        page: ProductsPage,
        isShowHeader: true
    },
    {
        path: '/productsdetails',
        page: ProductDetailsPage,
        isShowHeader: true
    },
    {
        path: '/signin',
        page: SignInPage ,
        isShowHeader: false
    },
    {
        path: '/signup',
        page: SignUpPage ,
        isShowHeader: false
    },
    {
        path: '/login',
        page: LoginPage ,
        //isShowHeader: true
    },
    {
        path: '/register',
        page: RegisterPage,
        //isShowHeader: true
    },
    {
        path: '/typeproduct',
        page: TypeProductPage,
        isShowHeader: true
    },
    {
        path: '/listuser',
        page: ListUser,
        isShowHeader: true
    },
    {
        path: '/profile-user',
        page: ProfilePage,
        isShowHeader: true
    },
    {
        path: '/system/admin',
        page: AdminPage,
        isShowHeader: false,
        isPrivate: true
    },
    {
        path: '*',
        page: NotFoundPage
    }

]
