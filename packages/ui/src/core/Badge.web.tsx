interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "blue" | "orange" | "green";
  className?: string;
}

export const Badge = ({
  children,
  variant = "default",
  className = "",
}: BadgeProps) => {
  const styles = {
    default: "bg-gray-100 text-gray-600 border-gray-200",
    blue: "bg-blue-100 text-blue-700 border-blue-200",
    orange: "bg-orange-100 text-orange-700 border-orange-200",
    green: "bg-green-100 text-green-700 border-green-200",
  };

  return (
    <span
      className={`px-3 py-1 text-xs font-bold rounded-full border ${styles[variant]} ${className}`}
    >
      {children}
    </span>
  );
};
