function Button({ text, color, fontSize, handleClick }) {
    const buttonStyle = {
      color: color,
      fontSize: fontSize + "rem"
    };
  
    return <button  onClick={handleClick} style={buttonStyle}>{text}</button>;
}

export default Button;
  