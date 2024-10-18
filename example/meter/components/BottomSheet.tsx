  
/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable func-names */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef, useState } from 'react';
import { Animated, View, StyleSheet, useWindowDimensions, Text, StatusBar } from 'react-native';

interface IShowParams {
    render: React.JSX.Element,
    duration?:number;
}
interface IHideParams {
    duration?:number;
}

interface IBottomSheet {
    show: (ele: IShowParams) => void;
    hide: (ele?:IHideParams) => void;
}

export const bottomSheet:IBottomSheet = { show: () => {}, hide: () => {} };

export function BottomSheetContainer() {
  const { height: HEIGHT, width: WIDTH } = useWindowDimensions();
  const TOTAL_HEIGHT = (HEIGHT + (StatusBar?.currentHeight || 0));
  const translateY = useRef(new Animated.Value(0)).current;
  const opacity = useRef(new Animated.Value(0)).current;
  const blurRef = useRef<View | null>(null);
  const [content, setContent] = useState<React.JSX.Element>();

  useEffect(() => {
    bottomSheet.show = function (ele) {
      setContent(ele.render);
      blurRef.current?.setNativeProps({ zIndex: 999 });
      Animated.parallel([
        Animated.timing(translateY, {
          toValue: -TOTAL_HEIGHT,
          useNativeDriver: true,
          duration: ele.duration || 100,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          useNativeDriver: true,
          duration: ele.duration || 100,
        }),
      ]).start();
    };

    bottomSheet.hide = function (data) {
      Animated.parallel([
        Animated.timing(translateY, {
          toValue: 0,
          useNativeDriver: true,
          duration: data?.duration || 100,
        }),
        Animated.timing(opacity, {
          toValue: 0,
          useNativeDriver: true,
          duration: data?.duration || 100,
        }),
      ]).start(() => {
        blurRef.current?.setNativeProps({ zIndex: -999 });
      });
    };
  }, []);

  return (
    <>
      <Animated.View ref={blurRef} style={{ backgroundColor: '#8080803f', zIndex: -999, position: 'absolute', height: TOTAL_HEIGHT, width: WIDTH, opacity }} />
      <Animated.View style={[styles.container, { height: TOTAL_HEIGHT, width: WIDTH, bottom: -TOTAL_HEIGHT, transform: [{ translateY }], zIndex: 1000 }]}>
        <View style={[styles.sheet]}>
          <Text onPress={() => bottomSheet.hide()} style={styles.close}>X</Text>
          {content}
        </View>
      </Animated.View>
    </>

  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    backgroundColor: 'transparent',
    justifyContent: 'flex-end',
  },
  sheet: {
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 30,
    borderTopStartRadius: 15,
    borderTopEndRadius: 15,
  },
  close: {
    position: 'absolute',
    right: 10,
    top: 10,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4b4a4a',
  },
});  
  