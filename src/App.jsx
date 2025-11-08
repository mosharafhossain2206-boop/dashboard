import { BrowserRouter, Routes, Route } from "react-router";
import Home from "./components/dashboard/Home";
import { CreateBanner } from "./components/dashboard/banner/CreateBanner";
import { BannerList } from "./components/dashboard/banner/BannerList";
import { CreateCategory } from "./components/dashboard/category/CreateCategory";
import { CategoryList } from "./components/dashboard/category/categoryList";
import { EditBanner } from "./components/dashboard/banner/EditBanner";
import { EditCategory } from "./components/dashboard/category/CategoryEdit";
import { CreateSubcategory } from "./components/dashboard/subcategory/CreateSubcategory";
import { SubCategoryList } from "./components/dashboard/subcategory/SubcategoryList";
import { EditSubCategory } from "./components/dashboard/subcategory/EditSubcategory";
import { CreateBrand } from "./components/dashboard/brand/CreateBrand";
import { BrandList } from "./components/dashboard/brand/BrandList";
import { EditBrand } from "./components/dashboard/brand/EditBrand";
import { CreateProduct } from "./components/dashboard/product/CreateProduct";
import { ProductList } from "./components/dashboard/product/ProductList";
import { EditProduct } from "./components/dashboard/product/EditProduct";
import { CreateVariant } from "./components/dashboard/variant/CreateVariant";
import { VariantList } from "./components/dashboard/variant/VariantList";
import SignupPage from "./components/dashboard/auth/Registration";
import { Login } from "./components/dashboard/auth/Login";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
// Create a client

const App = () => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}>
            <Route path="createBanner" element={<CreateBanner />} />
            <Route path="bannerlist" element={<BannerList />} />
            <Route path="editBanner/:slug" element={<EditBanner />} />
            <Route path="createCategory" element={<CreateCategory />} />
            <Route path="categorylist" element={<CategoryList />} />
            <Route path="editcategory/:id" element={<EditCategory />} />
            <Route path="createSubcategory" element={<CreateSubcategory />} />
            <Route path="subcategorylist" element={<SubCategoryList />} />
            <Route path="editsubcategory/:id" element={<EditSubCategory />} />
            <Route path="createBrand" element={<CreateBrand />} />
            <Route path="brandlist" element={<BrandList />} />
            <Route path="editbrand/:id" element={<EditBrand />} />
            <Route path="createProduct" element={<CreateProduct />} />
            <Route path="productlist" element={<ProductList />} />
            <Route path="editproduct/:id" element={<EditProduct />} />
            <Route path="createVariant" element={<CreateVariant />} />
            <Route path="variantlist" element={<VariantList />} />
          </Route>

          <Route>
            <Route path="*" element={<h1>404 Not Found</h1>} />
            <Route path="signup" element={<SignupPage />} />
            <Route path="signin" element={<Login />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
