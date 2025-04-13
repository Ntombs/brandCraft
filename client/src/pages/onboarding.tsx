import MainLayout from "@/components/layout/main-layout";
import OnboardingProcess from "@/components/onboarding/onboarding-process";
import { useAuth } from "@/hooks/use-auth";

export default function Onboarding() {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <MainLayout>
      <OnboardingProcess />
    </MainLayout>
  );
}
