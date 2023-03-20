import { CommonAuth } from "../../../auth";
import { config } from "../../../config";
import {
  AxiosSWRConfiguration,
  AxiosSWRResponse,
  getAxiosInstance,
  mutate,
  useAxiosSWR,
} from "../../../http";
import { HouseholdMember, Tenure, TenureAsset, TenureType } from "./types";

export const useTenure = (
  id: string | null,
  auth: CommonAuth,
  options?: AxiosSWRConfiguration<Tenure>,
): AxiosSWRResponse<Tenure> => {
  return useAxiosSWR(id && `${config.tenureApiUrlV1}/tenures/${id}`, auth, options);
};

export interface TenureParams {
  startOfTenureDate: string;
  endOfTenureDate?: string | null;
  tenureType: TenureType;
}

export interface AddTenureParams extends TenureParams {
  tenuredAsset: TenureAsset;
}

export const addTenure = async (
  params: AddTenureParams,
  auth: CommonAuth,
): Promise<Tenure> => {
  const axiosInstance = getAxiosInstance(auth);
  const { data: tenure } = await axiosInstance.post<Tenure>(
    `${config.tenureApiUrlV1}/tenures`,
    params,
  );
  mutate(`${config.tenureApiUrlV1}/tenures/${tenure.id}`, tenure, false);

  return tenure;
};

export interface AddPersonToTenureParams {
  etag: string;
  tenureId: string;
  householdMember: HouseholdMember;
}

export const addPersonToTenure = async (
  { tenureId, householdMember, etag }: AddPersonToTenureParams,
  auth: CommonAuth,
): Promise<void> => {
  const axiosInstance = getAxiosInstance(auth);

  await axiosInstance.patch(
    `${config.tenureApiUrlV1}/tenures/${tenureId}/person/${householdMember.id}`,
    { ...householdMember, etag },
  );
};

export interface RemovePersonFromTenureParams {
  etag: string;
  tenureId: string;
  householdMemberId: string;
}

export const removePersonFromTenure = async (
  params: RemovePersonFromTenureParams,
  auth: CommonAuth,
): Promise<void> => {
  const axiosInstance = getAxiosInstance(auth);

  await axiosInstance.delete(
    `${config.tenureApiUrlV1}/tenures/${params.tenureId}/person/${params.householdMemberId}`,
  );
};
export interface EditTenureParams extends Partial<TenureParams> {
  id: string;
  etag: string;
}

export const editTenure = async (
  { id, ...data }: EditTenureParams,
  auth: CommonAuth,
): Promise<void> => {
  const axiosInstance = getAxiosInstance(auth);

  const response = await axiosInstance.patch(
    `${config.tenureApiUrlV1}/tenures/${id}`,
    data,
  );
  return response.data;
};
