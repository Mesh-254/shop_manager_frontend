const LoadingSpinner = ({ size = "sm" }) => {
  const sizeClasses = {
    sm: "w-5 h-5",
    md: "w-8 h-8",
    lg: "w-12 h-12",
  }

  return (
    <div className={`${sizeClasses[size]} animate-spin`}>
      <div className="w-full h-full border-3 border-white border-t-transparent rounded-full"></div>
    </div>
  )
}

export default LoadingSpinner
