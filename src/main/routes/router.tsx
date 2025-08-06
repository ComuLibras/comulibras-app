import { BrowserRouter, Route, Routes } from 'react-router';
import { AuthRoute } from './auth-route';
import { AuthLayout } from '@/application/domain/auth/pages/layout';
import { SignInPage } from '@/application/domain/auth/pages/sign-in';
import { CategoriesPage } from '@/application/domain/app/pages/categories/pages';
import { SentencesPage } from '@/application/domain/app/pages/sentences/pages';
import { HomePage } from '@/application/domain/auth/pages/home';
import { SignUpPage } from '@/application/domain/auth/pages/sign-up';
import { AppLayout } from '@/application/domain/app/layout';
import { SentencePage } from '@/application/domain/app/pages/sentences/pages/sentence';

export const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route 
          path="/" 
          element={
            <AuthLayout 
              title="Bem-vindo(a)!" 
              description="Acesse sua conta para salvar as suas frases mais usadas." 
            />} 
          >
            <Route path="/" element={<HomePage />} />
        </Route>

        <Route path="/auth" element={<AuthRoute />}>
          <Route 
            element={
              <AuthLayout 
                title="Bem vindo(a)!" 
                description="Acesse sua conta para salvar as suas frases mais usadas." 
              />}
            >
              <Route path="sign-in" element={<SignInPage />} />
          </Route>
          <Route 
            element={
              <AuthLayout 
                title="Bem vindo(a)!" 
                description="Crie sua conta para salvar as suas frases mais usadas." 
              />}
            >
              <Route path="sign-up" element={<SignUpPage />} />
          </Route>
        </Route>
        
        <Route path="app" element={<AppLayout />}>
          <Route path="categories" element={<CategoriesPage />} />
          <Route path="sentences/category/:categoryId" element={<SentencesPage />} />
          <Route path="sentences/sentence/:sentenceId" element={<SentencePage />} />
        </Route>
        
      </Routes>
    </BrowserRouter>
  )
}
