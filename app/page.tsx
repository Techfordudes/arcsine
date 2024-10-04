"use client"
import React, { useState } from "react";
import * as math from "mathjs";// Import mathjs library for advanced calculations
import Decimal from 'decimal.js';

function Home() {
  const [arcsineValue, setArcsineValue] = useState("");
  const [resultValue, setResultValue] = useState("");

  const handleInputChange = (event: { target: { value: any; }; }) => {
    const newValue = event.target.value;
    setArcsineValue(newValue);
  };

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

  return (
    <div className="w-full h-screen flex justify-center items-center p-10">
      <div className=" flex justify-center items-center outline rounded-2xl p-10 gap-10 flex-col">
        <label className="text-3xl">Arcsine Calculator</label>
        <div className="flex lg:flex-row flex-col justify-between items-center gap-10">
          <label htmlFor="">Arcsine Value:</label>
          <input
            type="text"
            value={arcsineValue}
            onChange={handleInputChange}
            className="rounded-2xl outline-none text-black p-2"
          />
        </div>
        <label htmlFor="">{resultValue}</label>
        <button onClick={calculateArcsine} className="w-full text-lg border p-2 rounded-lg">
          Calculate!
        </button>

      </div>
    </div>
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