<script lang="ts">
import {
  Component,
  Vue,
} from 'vue-property-decorator';
import firebase from 'firebase/app';
import 'firebase/auth';

@Component
export default class CpAuth extends Vue {
  /**
   * Data
   */
  public isUserAuthenticated: boolean = false;

  public authenticatedUser: firebase.User|null = null;

  public authenticationError: string = '';

  public isSigningIn: boolean = false;

  public isSigningOut: boolean = false;

  private auth: firebase.auth.Auth = firebase.auth();

  /**
   * Events
   */
  public created(): void {
    this.auth.onAuthStateChanged((user) => {
      this.isUserAuthenticated = !!user;
      this.authenticatedUser = user;
    });
  }

  /**
   * Methods
   */
  public async signIn(email: string, password: string): Promise<void> {
    try {
      this.isSigningIn = true;
      await this.auth.signInWithEmailAndPassword(email, password);
    } catch (error) {
      this.authenticationError = error.message;
    } finally {
      this.isSigningIn = false;
    }
  }

  public async signOut(): Promise<void> {
    this.isSigningOut = true;
    await this.auth.signOut();
    this.isSigningOut = false;
  }

  public resetAuthenticationError(): void {
    this.authenticationError = '';
  }
}
</script>
