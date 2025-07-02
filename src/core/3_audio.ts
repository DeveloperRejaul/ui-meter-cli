import { audionRecordProvider, audioRecordHook } from "content"
import { Utils } from "./utils"
import { Chart } from "./4_chart"

export class Audio extends Chart {
   async audioRecord () {
    const pt = await this.createFolder('audio')
    await this.writeFile(audioRecordHook(), 'useAudioRecorder.ts', pt)
    await this.writeFile(audionRecordProvider(), 'AudionRecordProvider.tsx', pt)
   }
}