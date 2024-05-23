import StepThreeForm from '@/components/onboarding-forms/step-form-three';

const OnboardStepOne = () => {
  return (
    <div className="space-y-4">
      <p className="text-xs font-light text-[#888888]">STEP 3/4</p>
      <div>
        <h1 className="text-[20px] font-semibold">
          Welcome to your cooperative portal
        </h1>
        <p className="font-light text-[13]">Update your records to proceed</p>
      </div>
      <StepThreeForm />
    </div>
  );
};

export default OnboardStepOne;
