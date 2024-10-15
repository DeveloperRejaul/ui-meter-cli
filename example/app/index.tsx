import { Text } from 'react-native';
import React from 'react';
import Button from './components/button';
import { Box } from './components/box';
import { Center } from './components/center';
import Divider from './components/divider';
import { HStack } from './components/HStack';
import { VStack } from './components/VStack';

export default function index() {
  return (
    <Center>
      <VStack>
        <Text>Hello World1</Text>
        <Text>Hello World2</Text>
        <Text>Hello World3</Text>
      </VStack>
    </Center>
  );
}