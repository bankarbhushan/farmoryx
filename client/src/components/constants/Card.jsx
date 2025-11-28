const Card = ({
  title,
  value,
  icon,
  bgColor = 'bg-gray-100',
  iconColor = 'text-green-600',
}) => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-5 flex flex-col items-center gap-4 border border-gray-100">
      {/* Icon */}
      <div className={`p-3 rounded-full w-fit mb-2  ${bgColor} ${iconColor} text-2xl`}>
        {icon}
      </div>

      {/* Text */}
      <div>
        <p className="text-sm text-center text-gray-500 font-medium">{title}</p>
        <p className="text-2xl  text-center font-semibold text-[#12202E]">{value}</p>
      </div>
    </div>
  )
}

export default Card
