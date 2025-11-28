import LoadingSVG from '../../assets/Vanilla@1x-0.9s-275px-118px.svg'

const Loader = () => {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white/80 backdrop-blur-sm">
      <img src={LoadingSVG} alt="Loading..." className="animate-pulse" />
    </div>
  )
}

export default Loader
