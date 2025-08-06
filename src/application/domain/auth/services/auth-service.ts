import { ApiService } from "@/application/shared/services/api-service";
import { type SignInDTO, type SignInResponse, type SignUpDTO, type SignUpResponse } from "./dto/auth-dto";
import type { Roles } from "../../dashboard/accounts/services/dto/account-dto";

export class AuthService extends ApiService {
  constructor(
    private readonly accessTokenKey: string = '@comulibras-dashboard:access-token',
    private readonly roleKey: string = '@comulibras-dashboard:role',
    private readonly baseUrl: string = '/auth',
  ) {
    super();
  }

  async signIn(dto: SignInDTO) {
    return this.httpClient.post<SignInResponse>(`${this.baseUrl}/sign-in`, dto);
  }

  async signUp(dto: SignUpDTO) {
    return this.httpClient.post<SignUpResponse>(`${this.baseUrl}/sign-up`, dto);
  }

  logout(props?: {shallRedirect?: boolean}) {
    localStorage.removeItem(this.accessTokenKey);

    if (props?.shallRedirect && window.location.pathname !== '/auth/sign-in') {
      window.location.href = '/auth/sign-in';
    }
  }

  setToken({ accessToken, role }: SignInResponse) {
    localStorage.setItem(this.accessTokenKey, accessToken);
    localStorage.setItem(this.roleKey, role);
  }

  getToken() {
    const accessToken = localStorage.getItem(this.accessTokenKey);
    const role = localStorage.getItem(this.roleKey) as unknown as Roles;

    return {
      accessToken, 
      role
    }
  }
}
