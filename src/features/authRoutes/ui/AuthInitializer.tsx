import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { clearCredentials, setUser } from "@/features/auth/model/authSlice";
import { useUserMeLazyQuery } from "@/shared/api/user/__generated__/userMe";
import { useAppSelector, type RootState } from "@/shared/store/store";
import type { GenderType } from "@/shared/types/api-types";

interface Props {
  children: React.ReactNode;
}

export const AuthInitializer = ({ children }: Props) => {
  const dispatch = useDispatch();
  const token = useAppSelector((state: RootState) => state.auth.token);

  const [fetchUserMe] = useUserMeLazyQuery();
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    if (!token) {
      dispatch(clearCredentials());
      setInitialized(true); 
      return;
    }

    const fetchUser = async () => {
      try {
        const userResult = await fetchUserMe();

        if (userResult.data?.userMe) {
            const user = userResult.data.userMe;
            dispatch(setUser({
              ...user,
              firstName: user.firstName ?? "",
              lastName: user.lastName ?? "",
              middleName: user.middleName ?? "",
              birthDate: user.birthDate ?? "",
              gender: (user.gender === "MALE" || user.gender === "FEMALE") 
              ? (user.gender as GenderType) 
              : undefined,
              phone: user.phone ?? "",
              country: user.country ?? "",
              avatarUrl: user.avatarUrl ?? null,
            }));
          } else {
          dispatch(clearCredentials());
        }
      } catch (err) {
        dispatch(clearCredentials());
      } finally {
        setInitialized(true);
      }
    };

    fetchUser();
  }, [token, dispatch, fetchUserMe]);

  if (!initialized) {
    return <p>User loading...</p>;
  }

  return <>{children}</>;
};
