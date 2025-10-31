import { BrowserRouter, Routes, Route } from "react-router";
import Home from "./components/dashboard/Home";
import { CreateBanner } from "./components/dashboard/banner/CreateBanner";
import { BannerList } from "./components/dashboard/banner/BannerList";
import { CreateCategory } from "./components/dashboard/category/CreateCategory";
import { CategoryList } from "./components/dashboard/category/categoryList";
import { EditBanner } from "./components/dashboard/banner/EditBanner";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path="createBanner" element={<CreateBanner />} />
          <Route path="bannerlist" element={<BannerList />} />
          <Route path="editBanner/:id" element={<EditBanner />} />
          <Route path="createCategory" element={<CreateCategory />} />
          <Route path="categorylist" element={<CategoryList />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
