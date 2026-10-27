import { Route, Routes } from 'react-router'
import { Layout } from '@/components/layout/Layout/Layout'
import { CategoriesPage } from '@/pages/CategoriesPage'
import { CategoryPage } from '@/pages/CategoryPage'
import { ContactPage } from '@/pages/ContactPage'
import { HomePage } from '@/pages/HomePage'
import { ProductPage } from '@/pages/ProductPage'
import { ProductsPage } from '@/pages/ProductsPage'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="categories" element={<CategoriesPage />} />
        <Route path="products" element={<ProductsPage />} />
        <Route path="products/:id" element={<CategoryPage />} />
        <Route path="products/:categoryId/:productId" element={<ProductPage />} />
      </Route>
    </Routes>
  )
}
