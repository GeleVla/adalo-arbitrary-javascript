import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet } from "react-native";

const ParamURL = (props) => {
  const {
    trigger,
    paramOne,
    paramTwo,
    paramThree,
    paramResult,
    onError,
    editor,
    styles,
  } = props;

  const [executionParamResult, setParamResult] = useState("");

  const execute = () => {
    try {
      const paramOneValue = new URLSearchParams(window.location.search).get(paramOne);
      const paramTwoValue = new URLSearchParams(window.location.search).get(paramTwo);
      const paramThreeValue = new URLSearchParams(window.location.search).get(paramThree);

      const paramOneResultArg = paramOneValue ? `${paramOne}: ${paramOneValue}` : null;
      const paramTwoResultArg = paramTwoValue ? `${paramTwo}: ${paramTwoValue}` : null;
      const paramThreeResultArg = paramThreeValue ? `${paramThree}: ${paramThreeValue}` : null;

      const params = [paramOneResultArg, paramTwoResultArg, paramThreeResultArg];
      const combinedParams = params.filter(param => param !== null).join(', ');

      if (paramResult) {
        if (combinedParams.length === 0) {
          // Do nothing
        } else if (combinedParams.includes('via')) {
          paramResult(paramOneValue);
          setParamResult(paramOneValue);
        } else {
          paramResult(combinedParams);
          setParamResult(combinedParams);
        }
      }
    } catch (error) {
      if (onError) {
        onError(JSON.stringify(error));
      }
      setParamResult(JSON.stringify(error));
    }
  };

  useEffect(() => {
    if (trigger === "true" && !editor) {
      execute();
    }
  }, [trigger, editor]);

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
      >
        {`${executionParamResult}`}
      </Text>
    </View>
  );
};

export default ParamURL;