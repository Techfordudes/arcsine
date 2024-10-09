"use client"
import dynamic from "next/dynamic";
import React, { useState,useEffect } from "react";
import * as math from "mathjs";// Import mathjs library for advanced calculations
import Decimal from 'decimal.js';
import evaluatex from 'evaluatex/dist/evaluatex';

const EditableMathField = dynamic(
  () => import("react-mathquill").then((mod) => mod.EditableMathField),
  { ssr: false }
);


function Home() {

  useEffect(() => {
    import("react-mathquill").then((mq) => {
      mq.addStyles();
    });
  }, []);

  const [latex, setLatex] = useState('');
  const [latexSine, setLatexSine] = useState('');
  const [arcsineValue, setArcsineValue] = useState("");
  const [sineValue, setSineValue] = useState("");
  const [resultValue, setResultValue] = useState("");

  const handleInputChange = (newLatex: string) => {

    if(newLatex){
      
      const fn = evaluatex(newLatex);
      const evaluatedValue = fn();
      setArcsineValue(evaluatedValue.toString());

    }

  }

  const handleInputChangeSine = (newLatex: string) => {

    if(newLatex){
      
      const fn = evaluatex(newLatex);
      const evaluatedValue = fn();
      setSineValue(evaluatedValue.toString());

    }

  }

  const calculateArcsine = () => {
    // try {

    const decimalValue = math.evaluate(arcsineValue);
    const evaluatedValue = new Decimal(decimalValue);


    if (evaluatedValue.toNumber() < -1 || evaluatedValue.toNumber() > 1) {
      alert(
        "Invalid input! Please enter a value between -1 and 1 for arcsine calculation."
      );
      return;
    }

    const resultDegrees = math.unit(math.asin(evaluatedValue), "rad").to("deg");
    const roundedResult = new Decimal(resultDegrees.toString().replace(" deg", "")).toFixed(10);

    const numberForMinutes = parseFloat(roundedResult);
    const decimalPartForMinutes = numberForMinutes - Math.floor(numberForMinutes);
    const degrees = parseFloat(roundedResult) - decimalPartForMinutes;
    const minutesWithDecimals = decimalPartForMinutes * 60;

    const numberForSeconds = minutesWithDecimals;
    const decimalPartForSeconds = numberForSeconds - Math.floor(numberForSeconds);
    const minutes = minutesWithDecimals - decimalPartForSeconds;
    const secondsWithDecimals = decimalPartForSeconds * 60;

    const roundedSeconds = Math.round(secondsWithDecimals);

    setResultValue(`The Arcsine of ${arcsineValue} is approximately ${degrees} degrees and ${minutes} minutes and ${roundedSeconds} seconds`);

    // } catch (error) {
    //   console.error("Error evaluating expression:", error);
    //   alert("Invalid expression! Please enter a valid mathematical expression.");
    // }
  };

  const calculateSine = () => {

    const decimalValue = math.evaluate(sineValue);

    //const decimalValueInRads = (decimalValue*3.14)/180;
    const sine = math.sin(math.unit(decimalValue, "deg").to("rad"));
    const roundedResult = new Decimal(sine.toString()).toFixed(6);
    
    //const sine = math.sin(decimalValueInRads);

    console.log(roundedResult);

  };

  function handleButtonToggle(targetDivId: string) {
    const arcSineDiv = document.getElementById('arcSine');
    const sineDiv = document.getElementById('sine');
  
    if(arcSineDiv && sineDiv){

      if (targetDivId === 'arcSine') {
        arcSineDiv.style.display = 'flex';
        sineDiv.style.display = 'none';
      } else if (targetDivId === 'sine') {
        arcSineDiv.style.display = 'none';
        sineDiv.style.display = 'flex';
      }

    }

  }
  
  function handleSineButtonClick() {
    handleButtonToggle('sine');
  }
  
  function handleArcsineButtonClick() {
    handleButtonToggle('arcSine');
  }

  return (
    <>
    <div id="arcSine" className="w-full h-screen flex justify-center items-center p-10">
      <div className=" flex justify-center items-center outline rounded-2xl p-10 gap-10 flex-col">
        <button onClick={handleSineButtonClick} style={{background:'#1b0a9e'}} >Sine</button>
        <label className="text-3xl">Arcsine Calculator</label>
        <div className="flex lg:flex-row flex-col justify-between items-center gap-10">
          <label htmlFor="">Arcsine Value:</label>
          <EditableMathField
              latex={latex}
              onChange={(mathField) => {
                const newLatex = mathField.latex(); // Get the new LaTeX expression
                setLatex(newLatex); // Update the latex state
                 // Pass the newLatex to handleInputChange
              }}
              onBlur={() => {
                handleInputChange(latex);
              }}
              />
        </div>
        <label htmlFor="">{resultValue}</label>
        <button onClick={calculateArcsine} className="w-full text-lg border p-2 rounded-lg">
          Calculate!
        </button>

      </div>
    </div>

    <div id="sine" style={{display:'none'}} className="w-full h-screen flex justify-center items-center p-10">
      <div className=" flex justify-center items-center outline rounded-2xl p-10 gap-10 flex-col">
        <button onClick={handleArcsineButtonClick} style={{background:'#1b0a9e'}} >Arcsine</button>
        <label className="text-3xl">Sine Calculator</label>
        <div className="flex lg:flex-row flex-col justify-between items-center gap-10">
          <label htmlFor="">Sine Value (degrees):</label>
          <EditableMathField
              latex={latexSine}
              onChange={(mathField) => {
                const newLatex = mathField.latex();
                setLatexSine(newLatex);
              }}
              onBlur={() => {
                handleInputChangeSine(latexSine);
              }}
              />
        </div>
        <label htmlFor="">{resultValue}</label>
        <button onClick={calculateSine} className="w-full text-lg border p-2 rounded-lg">
          Calculate!
        </button>

      </div>
    </div>
    </>
  );
}

export default Home;


// <div className="">
// <h1>Arcsine Calculator</h1>
// <table>
//   <tbody>
//     <tr>
//       <td style={{ fontSize: "25px" }}>Arcsine Value:</td>
//       <td>
//         <input
//           type="text"
//           value={arcsineValue}
//           onChange={handleInputChange}
//           style={{ fontSize: "25px" }}
//         />
//       </td>
//     </tr>
//     <tr>
//       <td>
//         <button onClick={calculateArcsine} style={{ fontSize: "25px" }}>
//           Calculate!
//         </button>
//       </td>
//     </tr>
//   </tbody>
// </table>
// <h1>
//   {resultValue}
// </h1>
// </div>
