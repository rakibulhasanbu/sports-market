import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "../redux/hook";
import { useCurrentToken } from "../redux/features/auth/authSlice";


interface TProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: TProtectedRouteProps) => {
  const token = useAppSelector(useCurrentToken);

  if (!token) {
    return <Navigate to={"/auth/sign-in"} replace />
  }

  return children;
};

export default ProtectedRoute;
