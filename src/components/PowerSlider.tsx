import Slider from "rc-slider";
import "rc-slider/assets/index.css";

// Define the interface for the component props
interface PowerSliderProps {
  value: number; // The current value of the slider
}

// Style for the marks on the slider
const markStyle = { marginLeft: "20px", fontSize: "15px" };

// Styles for different parts of the slider
const sliderStyles = {
  rail: { width: "20px" }, // Style for the rail
  track: {
    width: "20px",
    background: "linear-gradient(to top, blue, red)", // Gradient background for the track
  },
  handle: { width: "30px", height: "30px", marginLeft: "-5px" }, // Style for the handle
};

// Style for the dots on the slider
const dotStyle = { width: "10px", height: "10px", marginLeft: "15px" };

// Functional component for the PowerSlider
const PowerSlider = ({ value }: PowerSliderProps) => (
  <Slider
    vertical // Vertical orientation
    value={value} // Current value of the slider
    min={0} // Minimum value
    max={5} // Maximum value
    step={0.1} // Step size
    included // Include the track
    marks={{
      0: <div style={markStyle}>0</div>,
      1: <div style={markStyle}>1</div>,
      2: <div style={markStyle}>2</div>,
      3: <div style={markStyle}>3</div>,
      4: <div style={markStyle}>4</div>,
      5: <div style={markStyle}>5</div>,
    }} // Marks on the slider
    style={{ height: "500px" }} // Height of the slider
    styles={sliderStyles} // Custom styles for the slider
    dotStyle={dotStyle} // Custom style for the dots
  />
);

export default PowerSlider;
