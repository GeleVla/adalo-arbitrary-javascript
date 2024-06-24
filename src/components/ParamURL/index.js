import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet } from "react-native";

// This is a functional component in React that handles URL parameters
const ParamURL = (props) => {
  // Destructuring props to get the required values
  const {
    trigger,
    paramOne,
    //paramTwo,
    //paramThree,
    paramResult,
    onError,
    editor,
    styles,
  } = props;

  // State to store the result of the execution
  const [executionParamResult, setParamResult] = useState("");

  // Function to execute the URL parameter handling
  const execute = () => {
    try {
      // Getting the values of the parameters from the URL
      const paramOneValue = new URLSearchParams(window.location.search).get(paramOne);
      //const paramTwoValue = new URLSearchParams(window.location.search).get(paramTwo);
      //const paramThreeValue = new URLSearchParams(window.location.search).get(paramThree);

      // Creating strings with the parameter names and their values
      const paramOneResultArg = paramOneValue ? `${paramOne}: ${paramOneValue}` : null;
      //const paramTwoResultArg = paramTwoValue ? `${paramTwo}: ${paramTwoValue}` : null;
      //const paramThreeResultArg = paramThreeValue ? `${paramThree}: ${paramThreeValue}` : null;

      // Creating an array of the parameter strings
      //const params = [paramOneResultArg, paramTwoResultArg, paramThreeResultArg];
      const params = [paramOneResultArg];
      // Joining the parameter strings into a single string, separated by commas
      const combinedParams = params.filter((param) => param !== null).join(", ");

      // If a paramResult function is provided
      if (paramResult) {
        // If there are no parameters, do nothing
        if (combinedParams.length === 0) {
          // Do nothing
        }
        // If the parameters include 'via', call paramResult with the first parameter value
        else if (combinedParams.includes("via")) {
          paramResult(paramOneValue);
          setParamResult(paramOneValue);
        }
        // Otherwise, call paramResult with the combined parameters
        // else {
        //   paramResult(combinedParams);
        //   setParamResult(combinedParams);
        // }
      }
    } catch (error) {
      // If an error occurs, call the onError function if provided, and set the state with the error
      if (onError) {
        onError(JSON.stringify(error));
      }
      setParamResult(JSON.stringify(error));
    }
  };

  // useEffect hook to execute the function when the trigger or editor props change
  useEffect(() => {
    if (trigger === "true" && !editor) {
      execute();
    }
  }, [trigger, editor]);

  // The component returns a View with a Text component, styled according to the styles prop
  return (
    <View>
      <Text
        style={{
          color: styles.script?.color,
          fontFamily: styles.script?.fontFamily,
          fontSize: styles.script?.fontSize,
          fontWeight: styles.script?.fontWeight,
          textAlign: styles.script?.textAlign,
        }}
      ></Text>
    </View>
  );
};

export default ParamURL;
