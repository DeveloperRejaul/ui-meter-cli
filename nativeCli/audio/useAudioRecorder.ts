import { useContext, useState } from 'react';
import AudioRecord from 'react-native-audio-record';
import SoundPlayer from 'react-native-sound-player';
import { Context } from './AudionRecordProvider';
import fs from 'react-native-fs';

export default function useAudioRecorder() {
    const {startRecording, PACKAGE_ID} = useContext(Context);
    const [isPlaying, setIsPlaying] = useState(false);
    const [path, setPath] = useState<string | null>(null);

    /**
     * Stops the current audio recording and returns the file path.
     * @returns {Promise<string | undefined>} The saved audio file path or undefined on error.
     */
    const stopRecording = async () => {
        try {
            const filePath = await AudioRecord.stop();
            setPath(filePath);
            return filePath;
        } catch (error) {
            console.log(error);
        }
    };

    /**
     * Plays an audio file from a given URL or from the last recorded path.
     * @param {string} [playUrl] Optional URL to play audio from.
     */
    const playRecording = (playUrl?: string) => {
        try {
            setIsPlaying(true);
            if (playUrl) {
                SoundPlayer.playUrl(playUrl);
                return;
            }

            if (path) {
                SoundPlayer.playUrl(path);
                return;
            }
            console.log('file path not found');
        } catch (error) {
            console.log(error);
        }
    };

    /**
     * Stops the audio player if currently playing.
     */
    const stopPlayer = () => {
        try {
            if (!isPlaying) {
                return;
            }
            SoundPlayer.stop();
            setIsPlaying(false);
        } catch (error) {
            console.log(error);
        }
    };

    /**
     * Fetches all audio recordings from the app's document directory.
     * Filters files by PACKAGE_ID.
     * @returns {Promise<fs.ReadDirItem[] | undefined>} Array of file objects or undefined on error.
     */
    const getAllRecording = async () => {
        try {
            const files = await fs.readDir(fs.DocumentDirectoryPath);
            const recordFiles = files.filter(file => file.path.includes(PACKAGE_ID));
            console.log(recordFiles);
            return recordFiles;
        } catch (error) {
            console.log(error);
        }
    };

    /**
     * Gets the most recent audio recording file.
     * @returns {Promise<fs.ReadDirItem | undefined>} Last recording file or undefined on error.
     */
    const getLastRecording = async () => {
        try {
            const files = await getAllRecording();
            if (files) {
                return files.pop();
            }
        } catch (error) {
            console.log(error);
        }
    };

    /**
     * Deletes all audio recordings in the app's document directory.
     */
    const deleteAllRecording = async () => {
        try {
            const recordings = await getAllRecording();
            if (recordings) {
                for (const element of recordings) {
                    await fs.unlink(element.path);
                }
                console.log('All file delete success');
                return;
            }
            console.log('file not found');
        } catch (error) {
            console.log(error);
        }
    };

    /**
     * Deletes a specific recording by its file name.
     * @param {string} id The file name of the recording to delete.
     */
    const deleteRecordingById = async (id: string) => {
        try {
            await fs.unlink(`${fs.DocumentDirectoryPath}/${id}`);
        } catch (error) {
            console.log(error);
        }
    };

    return {
        isPlaying,
        stopRecording,
        startRecording,
        playRecording,
        stopPlayer,
        getAllRecording,
        getLastRecording,
        deleteAllRecording,
        deleteRecordingById,
        utils: { ...SoundPlayer, onRecording: AudioRecord.on },
    };
}