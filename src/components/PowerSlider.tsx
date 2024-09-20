import Slider from "rc-slider";
import "rc-slider/assets/index.css";

interface PowerSliderProps {
  value: number;
}

const PowerSlider = ({ value }: PowerSliderProps) => {
  return (
    <Slider
      vertical
      value={value}
      min={0}
      max={5}
      step={0.1}
      included
      marks={{
        0: <div style={{ marginLeft: "20px", fontSize: "15px" }}>0</div>,
        1: <div style={{ marginLeft: "20px", fontSize: "15px" }}>1</div>,
        2: <div style={{ marginLeft: "20px", fontSize: "15px" }}>2</div>,
        3: <div style={{ marginLeft: "20px", fontSize: "15px" }}>3</div>,
        4: <div style={{ marginLeft: "20px", fontSize: "15px" }}>4</div>,
        5: <div style={{ marginLeft: "20px", fontSize: "15px" }}>5</div>,
      }}
      style={{ height: "500px" }}
      styles={{
        rail: { width: "20px" },
        track: {
          width: "20px",
          background: `linear-gradient(to top, blue, red)`,
        },
        handle: { width: "30px", height: "30px", marginLeft: "-5px" },
      }}
      dotStyle={{ width: "10px", height: "10px", marginLeft: "15px" }}
    />
  );
};

export default PowerSlider;
