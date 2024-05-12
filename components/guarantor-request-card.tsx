import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

interface IGuarantorRequestCard {
  data: { name: string; phone: string; liability: string };
}

const GuarantorRequestCard = ({ data }: IGuarantorRequestCard) => {
  const { name, phone, liability } = data;
  return (
    <div className="bg-white rounded-lg p-4 space-y-4">
      <div className="flex space-x-2 items-center">
        <Avatar className="w-8 h-8">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className="space-y-1">
          <h3 className="text-[#333333] font-semibold text-xs">{name}</h3>
          <p className="text-[10px] font-light text-[#555555]">{phone}</p>
        </div>
      </div>
      <div className="">
        <h3 className="text-[#333333] text-[10px] font-light">Liability</h3>
        <p className="text-default text-[13px] font-semibold">₦ {liability}</p>
      </div>

      <div className="space-y-2">
        <Button className="bg-[#E4FCEB] w-full text-[#333333] font-light text-sm hover:bg-[#def8e5]">
          Accept
        </Button>
        <div className="grid lg:grid-cols-2 gap-2">
          <Button className="bg-[#FFECEE] w-full text-[#333333] font-light text-sm hover:bg-[#f0dcde]">
            Decline
          </Button>
          <Button className="bg-[#FFF9D8] w-full text-[#333333] font-light text-sm hover:bg-[#f8f1ce]">
            Negotiate
          </Button>
        </div>
      </div>
    </div>
  );
};

export default GuarantorRequestCard;
