
interface AuthStore {
  token: string | null;
  business: BusinessResponse | null;

  register(): Promise<void>;
  login(): Promise<void>;
  logout(): void;
}