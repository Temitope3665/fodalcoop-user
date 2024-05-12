import StepFourForm from '@/components/onboarding-forms/step-form-four';

const OnboardStepOne = () => {
  return (
    <div className="space-y-4 py-12">
      <div>
        <h1 className="text-[20px] font-semibold">
          Welcome to your cooperative portal
        </h1>
        <p className="font-light text-[13]">Update your records to proceed</p>
      </div>
      <StepFourForm />
    </div>
  );
};

export default OnboardStepOne;
