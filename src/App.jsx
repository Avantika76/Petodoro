import { useState, useEffect  } from "react";
import PetScene from "./components/PetScene";
import PetPreview from "./components/PetPreview";

export default function App() {
  const [screen, setScreen] = useState("home");
  const [pet, setPet] = useState("cat");
  const [duration, setDuration] = useState(25);
  const [running, setRunning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(25 * 60);

  useEffect(() => {
  if (!running) return;

  const timer = setInterval(() => {
    setTimeLeft((prev) => {
      if (prev <= 1) {
        clearInterval(timer);
        return 0;
      }
      return prev - 1;
    });
  }, 1000);

  return () => clearInterval(timer);
}, [running]);

  const pets = [
    { name: "cat", label: "🐱 Cat" },
    { name: "bunny", label: "🐰 Bunny" },
    { name: "chick", label: "🐣 Chick" },
    { name: "dino", label: "🦖 Dino" },
    { name: "fox", label: "🦊 Fox" },
    { name: "sheep", label: "🐑 Sheep" },
    { name: "toothless", label: "🐉 Toothless" },
  ];

  const PetCard = ({ petName, label }) => (
    <div
      onClick={() => setPet(petName)}
      className="flex flex-col items-center cursor-pointer"
    >
      <div
        className={`
          w-64
          h-44
          border-4
          rounded-2xl
          overflow-hidden
          bg-white
          shadow-lg
          transition-all
          hover:scale-105

          ${
            pet === petName
              ? "border-red-500 ring-4 ring-red-200"
              : "border-gray-300"
          }
        `}
      >
        <PetPreview pet={petName} />
      </div>

      <p className="mt-3 text-xl font-bold">
        {label}
      </p>
    </div>
  );

  // HOME
  if (screen === "home") {
    return (
      <div
        className="
        min-h-screen
        flex
        flex-col
        justify-center
        items-center
        bg-gradient-to-b
        from-sky-300
        via-green-100
        to-green-300
      "
      >
        <h1 className="text-8xl font-bold">
          Petodoro 🐾
        </h1>

        <p className="text-2xl mt-4">
          Grow virtual pets while you focus
        </p>

        <button
          className="
            mt-10
            px-8
            py-4
            rounded-2xl
            bg-green-500
            text-white
            text-xl
          "
          onClick={() => setScreen("selectPet")}
        >
          Start Journey
        </button>
      </div>
    );
  }

  // PET SELECT
  if (screen === "selectPet") {
    return (
      <div
        className="
        min-h-screen
        flex
        flex-col
        items-center
        justify-center
        bg-gradient-to-b
        from-sky-300
        via-green-100
        to-green-300
        p-8
      "
      >
        <h1 className="text-5xl font-bold mb-10">
          Choose Your Companion
        </h1>

        <div className="grid grid-cols-3 gap-10">
          {pets.slice(0, 3).map((p) => (
            <PetCard
              key={p.name}
              petName={p.name}
              label={p.label}
            />
          ))}
        </div>

        <div className="grid grid-cols-3 gap-10 mt-10">
          {pets.slice(3, 6).map((p) => (
            <PetCard
              key={p.name}
              petName={p.name}
              label={p.label}
            />
          ))}
        </div>

        <div className="mt-10">
          <PetCard
            petName="toothless"
            label="🐉 Toothless"
          />
        </div>

        <button
          className="
            mt-10
            px-8
            py-4
            rounded-2xl
            bg-red-500
            text-white
            text-xl
          "
          onClick={() => setScreen("timer")}
        >
          Continue
        </button>
      </div>
    );
  }

  // TIMER
  if (screen === "timer") {
    return (
      <div
        className="
        min-h-screen
        flex
        flex-col
        justify-center
        items-center
        bg-gradient-to-b
        from-sky-300
        via-green-100
        to-green-300
      "
      >
        <h1 className="text-6xl font-bold mb-10">
          Focus Duration
        </h1>

        <div className="flex gap-6">
          <button
            className="px-8 py-4 bg-white rounded-xl shadow"
            onClick={() => setDuration(15)}
          >
            15 Min
          </button>

          <button
            className="px-8 py-4 bg-white rounded-xl shadow"
            onClick={() => setDuration(25)}
          >
            25 Min
          </button>

          <button
            className="px-8 py-4 bg-white rounded-xl shadow"
            onClick={() => setDuration(45)}
          >
            45 Min
          </button>
        </div>

        <p className="mt-6 text-2xl">
          Selected: {duration} Minutes
        </p>

        <button
          className="
            mt-8
            px-8
            py-4
            rounded-2xl
            bg-green-500
            text-white
            text-xl
          "
          onClick={() => {
                          setTimeLeft(duration * 60);
                          setRunning(true);
                          setScreen("focus");
          }}
        >
          Start Focus Session
        </button>
      </div>
    );
  }

  // FOCUS
  if (screen === "focus") {

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  const progress =
    ((duration * 60 - timeLeft) /
      (duration * 60)) *
    100;

  const growth =
    0.5 +
    ((duration * 60 - timeLeft) /
      (duration * 60)) *
      0.8;

  return (
    <div className="w-screen h-screen relative">

      {/* Timer */}
      <div
        style={{
          position: "absolute",
          top: 20,
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 10,
          textAlign: "center",
        }}
      >
        <h1
          style={{
            fontSize: "4rem",
            // color: "black",
            color: "#222",
            textShadow: "0 2px 8px rgba(255,255,255,0.8)",
            fontWeight: "bold",
          }}
        >
          {minutes}:
          {seconds
            .toString()
            .padStart(2, "0")}
        </h1>

        <div
          style={{
            width: 300,
            height: 16,
            background: "#ffffff55",
            borderRadius: 20,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              width: `${progress}%`,
              height: "100%",
              background: "#4ade80",
            }}
          />
        </div>
      </div>

      {/* Buttons */}
      <div
        style={{
          position: "absolute",
          bottom: 30,
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 10,
          display: "flex",
          gap: 15,
        }}
      >
        <button
          onClick={() =>
            setRunning(!running)
          }
        >
          {running ? "Pause" : "Resume"}
        </button>

        <button
          onClick={() => {
            setTimeLeft(duration * 60);
            setRunning(true);
          }}
        >
          Restart
        </button>

        <button
          onClick={() => {
            setRunning(false);
            setScreen("timer");
          }}
        >
          Stop
        </button>
      </div>

      <PetScene
        pet={pet}
        scale={growth}
      />
    </div>
  );
}

  return null;
}