import { Link } from "react-router-dom"

const CenteredAuthLayout = ({ children, title, subtitle }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-teal-50 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Pattern - Tree Shadows */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-40 h-40 bg-green-800 rounded-full blur-3xl"></div>
        <div className="absolute bottom-32 right-16 w-32 h-32 bg-green-700 rounded-full blur-2xl"></div>
        <div className="absolute top-1/2 right-32 w-24 h-24 bg-green-600 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 left-1/3 w-36 h-36 bg-orange-400 rounded-full blur-3xl"></div>
      </div>

      <div className="w-full max-w-2xl bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden border border-orange-100 relative z-10">
        <div className="p-8 lg:p-16">
          {/* Header */}
          <div className="text-center mb-10">
            <Link to="/" className="inline-flex items-center space-x-4 mb-10 group">
              <div className="w-14 h-14 bg-gradient-to-br from-teal-600 to-teal-700 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-200">
                <span className="text-white font-bold text-2xl">🏪</span>
              </div>
              <div>
                <span className="text-3xl font-bold text-gray-900 block">SHOP Manager</span>
                <span className="text-sm text-teal-600 font-medium">Your Store, Simplified</span>
              </div>
            </Link>

            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">{title}</h1>
            <p className="text-gray-600 text-xl leading-relaxed">{subtitle}</p>
          </div>

          {/* Content */}
          {children}
        </div>
      </div>
    </div>
  )
}

export default CenteredAuthLayout
