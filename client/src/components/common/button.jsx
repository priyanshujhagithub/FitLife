export function Button({
  children,
  onClick,
  className = "",
  variant = "default",
  size = "default",
  disabled = false,
  ...props
}) {
  const baseClasses =
    "font-semibold rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"

  const variants = {
    default: "bg-purple-600 hover:bg-purple-700 text-white focus:ring-purple-500",
    outline: "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:ring-purple-500",
    ghost: "text-gray-700 hover:bg-gray-100 focus:ring-purple-500",
  }

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    default: "px-4 py-2",
    lg: "px-6 py-3 text-lg",
  }

  const classes = `${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`

  return (
    <button onClick={onClick} className={classes} disabled={disabled} {...props}>
      {children}
    </button>
  )
}
