import StepTwoForm from '@/components/onboarding-forms/step-form-two';

const OnboardStepOne = () => {
  return (
    <div className="space-y-4">
      <p className="text-xs font-light text-[#888888]">STEP 2/4</p>
      <div>
        <h1 className="text-[20px] font-semibold">
          Welcome to your cooperative portal
        </h1>
        <p className="font-light text-[13]">Update your records to proceed</p>
      </div>
      <StepTwoForm />
    </div>
  );
};

export default OnboardStepOne;
