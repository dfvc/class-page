<script lang="ts">
import {
  Component,
  Vue,
} from 'vue-property-decorator';
import firebase from 'firebase/app';
import 'firebase/auth';

@Component
export default class CpAuth extends Vue {
  public isUserAuthenticated: boolean = false;

  private auth: firebase.auth.Auth = firebase.auth();

  /**
   * Events
   */
  private created(): void {
    this.auth.onAuthStateChanged((user) => {
      this.isUserAuthenticated = !!user;
    });
  }

  /**
   * Methods
   */
  public async signIn(): Promise<void> {
    await this.auth.signInWithEmailAndPassword('dfvc@test.com', 'abcABC123!"#');
  }

  public async signOut(): Promise<void> {
    await this.auth.signOut();
  }
}
</script>
