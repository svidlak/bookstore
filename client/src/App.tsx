import './App.scss'
import { Header, Footer } from './views'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AllBooks, BookOverview, BooksByCategory, Home, NotFound } from './pages'
import { ToastNotification } from './components'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 30,
    },
  },
})

function App() {
  return (
    <QueryClientProvider client={queryClient} >
      <Router>
          <Header />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/books' element={<AllBooks />} />
            <Route path='/category/:categoryName' element={<BooksByCategory />} />
            <Route path='/details/:bookId' element={<BookOverview />} />
            <Route path='/new-book' element={<BookOverview />} />
            <Route path='/not-found' element={<NotFound />} />
            <Route path='/*' element={<Navigate to='/not-found' replace />} />
          </Routes>
        <Footer />
        <ToastNotification />
      </Router>
    </QueryClientProvider>
  )
}

export default App
