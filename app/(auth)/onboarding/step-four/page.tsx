import StepFourForm from '@/components/onboarding-forms/step-form-four';
import { Slider } from '@/components/ui/slider';

const OnboardStepOne = () => {
  return (
    <div className="space-y-4 py-12">
      <p className="text-xs font-light text-[#888888]">STEP 4/4</p>
      <Slider defaultValue={[100]} max={100} step={1} disabled />
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
