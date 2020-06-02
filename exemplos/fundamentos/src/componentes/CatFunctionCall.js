import React from 'react';
import { Text } from 'react-native';

export default function CatFunctionCall() {
  function getFullName(firstName, secondName, thirdName) {
    return firstName + " " + secondName + " " + thirdName;
  }

  return (
    <Text>
      Hello, I am {getFullName("Rum", "Tum", "Tugger")}!
    </Text>
  );
}
