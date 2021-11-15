import { Method } from "axios";

export interface restApiCall {
  endPoints: string;
  params: any;
  method: Method;
  isLoaderRequired: boolean;
  token: string;
  dispatch: any;
}