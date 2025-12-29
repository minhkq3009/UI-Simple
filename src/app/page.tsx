import { AuthLayout } from "@/components/layout/AuthLayout";
import { LoginCard } from "@/components/auth/LoginCard";

export default function Home() {
  return (
    <AuthLayout>
      <LoginCard />
    </AuthLayout>
  );
}
