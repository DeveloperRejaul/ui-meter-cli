import { audionRecordProvider, audioRecordHook } from "content"
import { Utils } from "./utils"

export class Audio extends Utils {
   async audioRecord () {
    const pt = await this.createFolder('audio')
    await this.writeFile(audioRecordHook(), 'useAudioRecorder.ts', pt)
    await this.writeFile(audionRecordProvider(), 'AudionRecordProvider.tsx', pt)
   }

}