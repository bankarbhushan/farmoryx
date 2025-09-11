import LoadingSVG from "../../assets/Vanilla@1x-0.9s-275px-118px.svg"; 

const Loader = () => {
  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center bg-white">
    <img src={LoadingSVG} alt="Loading..." className=" animate-pulse" />
    </div>
  )
}

export default Loader;