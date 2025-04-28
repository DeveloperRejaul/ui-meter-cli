
  
  import { Component, createContext, ReactNode } from 'react';
import AudioRecord from 'react-native-audio-record';
import { check, PERMISSIONS, request } from 'react-native-permissions';

interface AudioProviderProps {
    children: ReactNode;
}

export interface IContextValuesTypes  {
    startRecording:() => Promise<void>
    PACKAGE_ID: 'recorder-salespype'
}


export const Context = createContext({} as IContextValuesTypes);
const PACKAGE_ID = 'recorder-salespype';
export default class AudioProvider extends Component<AudioProviderProps> {

    async componentDidMount(): Promise<void> {
        await this.checkPermission();
    }

    async checkPermission () {
        const result = await check(PERMISSIONS.ANDROID.RECORD_AUDIO);
            if(result !== 'granted') {
            await request(PERMISSIONS.ANDROID.RECORD_AUDIO);
        }
    }

    async startRecording() {
        try {
            const options = {
                sampleRate: 16000,
                channels: 1,
                bitsPerSample: 16,
                audioSource: 6,
                wavFile: `${PACKAGE_ID}-${Date.now()}.wav`,
              };
              AudioRecord.init(options);
            AudioRecord.start();
        } catch (error) {
            console.log(error);
        }
     }


  render() {
    return (
        <Context.Provider value={{startRecording: this.startRecording, PACKAGE_ID}}>
            {this.props.children}
        </Context.Provider>
    );
  }
}