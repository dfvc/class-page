<script lang="ts">
import {
  Component,
  Vue,
} from 'vue-property-decorator';
import firebase from 'firebase/app';
import 'firebase/storage';

@Component
export default class CpStorage extends Vue {
  /**
   * Data
   */
  public uploadProgress: number = 0;

  public uploadStatus: string = 'idle';

  private ref: firebase.storage.Reference = firebase.storage().ref();

  /**
   * Methods
   */
  public getFileNameFromPath(filePath: string): string {
    if (!filePath.length) {
      return '';
    }

    const filePathChunks = filePath.split('\\');
    const file = filePathChunks[filePathChunks.length - 1];
    const fileNameChunks = file.split('.');

    return fileNameChunks[0];
  }

  public async getDownloadUrl(path: string): Promise<string> {
    const url = await this.ref.child(path).getDownloadURL();

    return url;
  }

  public async uploadFile(path: string, file: File): Promise<void> {
    const uploadTask = this.ref.child(path).put(file);

    await uploadTask.on(
      firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot) => {
        this.uploadStatus = snapshot.state;
        this.uploadProgress = Math.round(((snapshot.bytesTransferred / snapshot.totalBytes) * 100) * 10) / 10;
      },
      (error: Error) => {
        // console.log(error.message);
        this.uploadStatus = 'idle';
        this.uploadProgress = 0;
      },
      () => {
        this.uploadStatus = 'idle';
        this.uploadProgress = 0;
      },
    );
  }
}
</script>
