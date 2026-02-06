import { Link } from "react-router-dom"

const AuthLayout = ({ children, title, subtitle, showImage = true }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-teal-50 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Pattern - Tree Shadows */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-40 h-40 bg-green-800 rounded-full blur-3xl"></div>
        <div className="absolute bottom-32 right-16 w-32 h-32 bg-green-700 rounded-full blur-2xl"></div>
        <div className="absolute top-1/2 right-32 w-24 h-24 bg-green-600 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 left-1/3 w-36 h-36 bg-orange-400 rounded-full blur-3xl"></div>
      </div>

      <div className="w-full max-w-7xl bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden border border-orange-100 relative z-10">
        <div className="flex flex-col lg:flex-row min-h-[700px]">
          {/* Left Side - Form */}
          <div className="flex-1 p-8 lg:p-16 flex flex-col justify-center bg-gradient-to-br from-white to-orange-50/30">
            {/* Header */}
            <div className="mb-10">
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

            {/* Form Content */}
            <div className="max-w-md">{children}</div>
          </div>

          {/* Right Side - Storefront Inspired Illustration */}
          {showImage && (
            <div className="flex-1 bg-gradient-to-br from-teal-600 via-teal-700 to-green-700 relative overflow-hidden hidden lg:block">
              {/* Storefront Background */}
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-i0GRzPwv2Q1S9PRpBYWxMbIfq4Bniw.png"
                alt="Charming storefront"
                className="absolute inset-0 w-full h-full object-cover opacity-20"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-teal-600/90 to-green-700/90"></div>

              {/* Decorative Elements */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-32 left-24 w-40 h-40 bg-orange-400 rounded-full blur-2xl"></div>
                <div className="absolute bottom-40 right-20 w-32 h-32 bg-amber-400 rounded-full blur-xl"></div>
                <div className="absolute top-1/2 right-40 w-24 h-24 bg-yellow-400 rounded-full blur-lg"></div>
              </div>

              {/* Content Overlay */}
              <div className="relative z-10 h-full flex flex-col justify-center items-center text-white p-16">
                <div className="text-center mb-12">
                  <div className="w-32 h-32 bg-white/20 backdrop-blur-sm rounded-3xl flex items-center justify-center mb-8 mx-auto border border-white/30">
                    <span className="text-6xl">🏪</span>
                  </div>
                  <h2 className="text-4xl font-bold mb-6 leading-tight">
                    Welcome to Your
                    <br />
                    <span className="text-orange-200">Digital Storefront</span>
                  </h2>
                  <p className="text-teal-100 text-xl leading-relaxed max-w-md">
                    Transform your retail business with our comprehensive POS and inventory management solution.
                  </p>
                </div>

                {/* Feature Highlights */}
                <div className="grid grid-cols-1 gap-6 w-full max-w-sm">
                  <div className="bg-white/15 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-orange-400/30 rounded-xl flex items-center justify-center">
                        <span className="text-2xl">📊</span>
                      </div>
                      <div>
                        <h3 className="font-bold text-lg">Smart Analytics</h3>
                        <p className="text-teal-100 text-sm">Real-time insights & reports</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white/15 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-amber-400/30 rounded-xl flex items-center justify-center">
                        <span className="text-2xl">🔄</span>
                      </div>
                      <div>
                        <h3 className="font-bold text-lg">Seamless Sync</h3>
                        <p className="text-teal-100 text-sm">Online & offline capabilities</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white/15 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-green-400/30 rounded-xl flex items-center justify-center">
                        <span className="text-2xl">🏪</span>
                      </div>
                      <div>
                        <h3 className="font-bold text-lg">Multi-Location</h3>
                        <p className="text-teal-100 text-sm">Manage all your stores</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default AuthLayout
