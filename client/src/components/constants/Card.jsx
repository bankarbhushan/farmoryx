const Card = ({ title, value, icon, className }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-5 flex items-center gap-4">
      <div className={`text-3xl ${className}`}>{icon}</div>

      <div>
        <p className="text-sm text-[#4B5563] font-medium">{title}</p>
        <p className="text-xl font-semibold text-[#12202E]">{value}</p>
      </div>
    </div>
  );
};


export default Card;
