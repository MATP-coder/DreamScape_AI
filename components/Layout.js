
import Header from './Header'
import Footer from './Footer'

export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col dark:bg-gray-900 dark:text-gray-100">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  )
}
