'use client';
import { useCallback } from "react";
import { loadSlim } from "tsparticles-slim";
import { Particles } from "react-tsparticles"; // Changed to named import

export default function ParticleBackground() {
  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  return (
    <Particles
      id="tsparticles"
      className="absolute inset-0"
      init={particlesInit}
      options={{
        particles: {
          number: { value: 15, density: { enable: true, value_area: 800 } },
          color: { value: "#00ff9d" },
          shape: { type: "circle" },
          opacity: {
            value: 0.5,
            random: true,
            animation: { enable: true, speed: 1, minimumValue: 0.1, sync: false }
          },
          size: {
            value: 3,
            random: true,
            animation: { enable: true, speed: 4, minimumValue: 0.3, sync: false }
          },
          line_linked: {
            enable: true,
            distance: 150,
            color: "#00ff9d",
            opacity: 0.2,
            width: 1
          },
          move: {
            enable: true,
            speed: 2,
            direction: "none",
            random: true,
            straight: false,
            outModes: { default: "bounce" },
          }
        },
        interactivity: {
          detectsOn: "canvas",
          events: {
            onHover: { enable: true, mode: "grab" },
            onClick: { enable: true, mode: "push" },
            resize: true
          },
          modes: {
            grab: { distance: 140, links: { opacity: 1 } },
            push: { quantity: 4 }
          }
        },
        retina_detect: true,
        background: {
          color: "transparent",
        }
      }}
    />
  );
}
