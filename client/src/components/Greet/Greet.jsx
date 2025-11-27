import React, { useCallback } from "react";
import Particles from "react-particles";
import { loadSlim } from "tsparticles-slim";
import Business_Img from "../../assets/Images/Business_Img";

const Greet = () => {
  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  return (
    <div className="relative w-full h-full min-h-screen ">
      {/* Working Particle Animation */}
      <Particles
        id="tsparticles"
        init={particlesInit}
        className="absolute inset-0"
        options={{
          fullScreen: { enable: false },
          background: { color: "transparent" },
          particles: {
            number: { value: 40 },
            color: { value: "#17CF91" },
            shape: { type: "circle" },
            opacity: { value: 0.6 },
            size: { value: { min: 2, max: 5 } },
            move: {
              enable: true,
              speed: 2,
              direction: "none",
              random: true,
              straight: false,
              outModes: "out",
            }
          }
        }}
      />

      {/* Actual Page Content */}
      <div className="relative z-10 text-center">
        <h1 className="font-bold flex  pt-5 justify-center mb-5 mt-5 text-green-700 text-lg">
          🌿 माऊली भाजी भांडार, साकोली 🌿
        </h1>

        <hr className="text-2xl m-auto text-amber-700" />

        <Business_Img />
      </div>
    </div>
  );
};

export default Greet;
