import client from '@/lib/axios-instance';
import {
  AGENCY_EP,
  LOGIN_EP,
  REGISTRATION_EP,
  RESET_PASSWORD_EP,
  SET_NEW_PASSWORD_EP,
  VERIFY_OTP_EP,
} from '../endpoints';
import { ApiResponse, IDefaultUser } from '@/types';

export const loginUser = (payload: {
  email: string;
  password: string;
}): Promise<ApiResponse> =>
  client.post(LOGIN_EP, payload).then((response) => response.data);

export const resetPassword = (payload: {
  email: string;
}): Promise<ApiResponse> =>
  client.post(RESET_PASSWORD_EP, payload).then((response) => response.data);

export const verifyOTP = (payload: {
  email: string;
  otp: string;
}): Promise<ApiResponse> =>
  client.post(VERIFY_OTP_EP, payload).then((response) => response.data);

export const setNewPassword = async (payload: {
  password: string;
  confirmPassword: string;
  id: string;
}): Promise<ApiResponse> => {
  const { id, ...rest } = payload;
  return client
    .post(`${SET_NEW_PASSWORD_EP}/${id}`, rest)
    .then((response) => response.data);
};

export const getAgencies = (): Promise<ApiResponse> =>
  client.get(AGENCY_EP).then((response) => response.data);

export const onboardNewUser = (payload: IDefaultUser): Promise<ApiResponse> =>
  client
    .post(REGISTRATION_EP, payload, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then((response) => response.data);
