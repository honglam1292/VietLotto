import { PATH } from "@/constants/path";
import { useAuthStore } from "@/store/authStore";
// import { useUserToken } from "@/store/authStore";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
// import { useModalStore } from "@/store/modalStore";

const ProtectedRoute = () => {
  const navigate = useNavigate();
  // const { openModal } = useModalStore();
  const isAuth = useAuthStore((state) => state.isAuth);
  const isToken = useAuthStore((state) => state.token);
  const isUsername = useAuthStore((state) => state.username);

  useEffect(() => {
    if (!isAuth) {
      navigate(PATH.home);
    }
  }, [isAuth, navigate]);

  return <>{isAuth && isToken && isUsername && <Outlet />}</>;
};

export default ProtectedRoute;
