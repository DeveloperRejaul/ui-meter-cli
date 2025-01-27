
  /* eslint-disable react-hooks/exhaustive-deps */
import { Keyboard,  ScrollViewProps, ScrollView, TextInput, useWindowDimensions} from 'react-native';
import React, { useEffect, useRef } from 'react';

interface IKeyboardAvoidingViewProps  extends ScrollViewProps{
    children: React.ReactNode;
    refs:  React.RefObject<TextInput>[]
    inputPadding?:number
}

/*
* @example
* // Example usage of KeyboardAvoidingScrollView
* export default function Example() {
*   const refs = Array.from({length: 20}, () => createRef<TextInput>());
*   return (
*     <KeyboardAvoidingScrollView
*       inputPadding={15}
*       refs={refs}
*       contentContainerStyle={{paddingBottom: 280}}
*     >
*       {refs.map((ele, index) => (
*         <TextInput key={index} ref={ele} style={{borderWidth: 1, padding: 10}} placeholder={index} />
*       ))}
*     </KeyboardAvoidingScrollView>
*   );
* }
*/

export default function KeyboardAvoidingScrollView(props : IKeyboardAvoidingViewProps) {
  const {children, refs,inputPadding = 0, ...extra} = props;
  const scrollViewRef = useRef<ScrollView | null>(null);
  const {height: HEIGHT} = useWindowDimensions();


  useEffect(()=>{
    Keyboard.addListener('keyboardDidShow', (params) => {
      for (const inputRef of refs) {
        if(inputRef.current?.isFocused()) {
          inputRef.current?.measure((...pr) =>{
            const inputY = pr[5];
            const keyboardHeight = params.endCoordinates.height;
            const offset = HEIGHT - keyboardHeight;
            if(inputY > offset) {
              const scrollHeight = (inputY - offset) + inputPadding;
              scrollViewRef.current?.scrollTo({y:scrollHeight});
            }
          });
        }
      }
    });
    Keyboard.addListener('keyboardDidHide', () => {
      scrollViewRef.current?.scrollTo({y:0});
    });

    return () => {
      Keyboard.removeAllListeners('keyboardDidShow');
      Keyboard.removeAllListeners('keyboardDidHide');
    };
  },[]);

  return (
    <ScrollView ref={scrollViewRef}{...extra}>
      {children}
    </ScrollView>
  );
}
  