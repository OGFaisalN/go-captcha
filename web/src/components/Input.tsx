import { SyntheticEvent, useState } from "react";

const Input = () => {
  const [code, setCode] = useState("");
  const [input, setInput] = useState("");
  const [background, setBackground] = useState("white");
  const generateImage = async (e: SyntheticEvent) => {
    e.preventDefault();
    const response = await fetch("http://localhost:8080/captcha");
    const captcha = await response.json();
    setCode(captcha.code);
  };
  let captchaImage;
  if (code === "") {
    captchaImage = <></>;
  } else {
    captchaImage = (
      <div className="box">
        <img src={"http://localhost:8080/images/" + code} alt="captcha" />
      </div>
    );
  }
  const checkCaptcha = async (e: SyntheticEvent) => {
    e.preventDefault();
    if (input === code) {
      setBackground("lightgreen");
    } else {
      setBackground("red");
    }
  };
  return (
    <div className="background" style={{ backgroundColor: background }}>
      <section className="centered input-section">
        <form className="box input-box">
          <div className="field">
            <h1 className="input-heading">Captcha</h1>
            {captchaImage}
            <div className="control">
              <input
                className="input is-medium"
                type="text"
                placeholder="Captcha Code"
                onChange={(e) => setInput(e.target.value)}
              />
            </div>
          </div>
          <button
            onClick={checkCaptcha}
            className="button is-dark is-fullwidth is-medium block"
          >
            Check Captcha
          </button>
          <button
            onClick={generateImage}
            className="button is-dark is-fullwidth is-medium block"
          >
            Generate New Captcha
          </button>
        </form>
      </section>
    </div>
  );
};

export default Input;
