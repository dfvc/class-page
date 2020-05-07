<script lang="ts">
import {
  Component,
  Vue,
} from 'vue-property-decorator';
import firebase from 'firebase/app';
import 'firebase/auth';
import { EAuthProviders } from '@/enums/auth-providers.enum';

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

  public authProviders = {
    google: new firebase.auth.GoogleAuthProvider().setCustomParameters({ prompt: 'consent' }),
    twitter: new firebase.auth.TwitterAuthProvider().setCustomParameters({ prompt: 'consent' }),
    github: new firebase.auth.GithubAuthProvider().setCustomParameters({ prompt: 'consent' }),
  }

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
  public async signIn(provider: string, email?: string, password?: string): Promise<void> {
    try {
      this.isSigningIn = true;
      switch (provider) {
        case EAuthProviders.GOOGLE:
          await this.auth.signInWithPopup(this.authProviders.google);
          break;
        case EAuthProviders.TWITTER:
          await this.auth.signInWithPopup(this.authProviders.twitter);
          break;
        case EAuthProviders.GITHUB:
          await this.auth.signInWithPopup(this.authProviders.github);
          break;
        case EAuthProviders.EMAIL_PASSWORD:
        default:
          await this.auth.signInWithEmailAndPassword(email || '', password || '');
      }
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
