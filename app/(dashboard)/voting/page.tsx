'use client';
import SearchInput from '@/components/ui/search-input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import CheckIcon from '@/components/check-icon';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import NellyImage from '@/assets/images/nelly-image.png';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import Image from 'next/image';

export default function Voting() {
  const [selectedCandidate, setSelectedCandidate] = useState<string>('');
  const names: string[] = [
    'DJ Maphorisa',
    'Brenda Fassie',
    'Ed Sheeran',
    'Shank Comics',
    'African Giant',
    'Nelly Furtado',
  ];
  const voteLists: string[] = [
    'President',
    'Vice-President',
    'Secretary',
    'Treasurer',
  ];
  return (
    <div className="px-4 py-2 space-y-8">
      <h1 className="text-default font-semibold text-sm">Voting</h1>
      <div className="lg:flex space-y-4 lg:space-y-0 justify-between items-center">
        <div className="flex space-x-2 w-[100%] overflow-x-auto">
          {voteLists.map((each) => (
            <div
              className={cn(
                'bg-white py-2 trans border px-4 font-light text-xs rounded-[4px] flex items-center',
                each === voteLists[0] && 'bg-primary text-white'
              )}
              style={{ boxShadow: '0px 2px 10px 0px #2F4A891A' }}
              key={each}
            >
              {each}
            </div>
          ))}
        </div>
        <div className="lg:w-[25%] w-full">
          <SearchInput placeholder="Search" />
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-4 p-4">
        <div className="p-4 space-y-2 bg-white rounded-lg border overflow-y-auto h-fit max-h-[70vh]">
          <div className="text-[13px]">
            <h1 className="font-semibold">Vote for your preferred candidate</h1>
            <p className="font-light">
              Select your preferred candidate from the list below.
            </p>
          </div>
          <div className="p-4 space-y-4">
            {names.map((name) => (
              <div
                key={name}
                className={cn(
                  'flex justify-between border rounded-lg bg-[#FAFAFA] hover:bg-[#F4F7FF] cursor-pointer p-4 items-center',
                  name === selectedCandidate && 'border-[#7C91D0] bg-[#F4F7FF]'
                )}
                onClick={() => setSelectedCandidate(name)}
              >
                <div className="flex space-x-3">
                  <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-[13px] font-semibold">{name}</p>
                    <Dialog>
                      <DialogTrigger asChild>
                        <p className="text-[11px] font-light text-primary">
                          View profile
                        </p>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Profile</DialogTitle>
                          <DialogDescription className="grid grid-cols-3 gap-4">
                            <div className="col-span-1 space-y-2">
                              <Image src={NellyImage} alt="Nelly" />
                              <div className="">
                                <p className="text-[13px] font-semibold">
                                  Nelly Furtado
                                </p>
                                <p className="text-[11px] font-light text-primary">
                                  President
                                </p>
                              </div>
                            </div>
                            <div className="col-span-2 space-y-3">
                              <div className="space-y-1">
                                <h2 className="text-sm font-semibold">Bio</h2>
                                <p className="font-light text-xs">
                                  Nelly Kim Furtado ComIH is a Canadian singer
                                  and songwriter. Furtado has sold over 40
                                  million records worldwide making her one of
                                  the most successful Canadian artists. She is
                                  widely known for her musical versatility and
                                  genre experimentation.
                                </p>
                              </div>
                              <div className="space-y-1">
                                <h2 className="text-sm font-semibold">
                                  Manifesto
                                </h2>
                                <p className="font-light text-xs">
                                  Nelly Kim Furtado ComIH is a Canadian singer
                                  and songwriter. Furtado has sold over 40
                                  million records worldwide making her one of
                                  the most successful Canadian artists. She is
                                  widely known for her musical versatility and
                                  genre experimentation.
                                </p>
                              </div>
                            </div>
                          </DialogDescription>
                        </DialogHeader>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
                <CheckIcon
                  className={cn(name !== selectedCandidate && 'opacity-25')}
                />
              </div>
            ))}
          </div>
        </div>
        <div
          className=" space-y-4 bg-[#FAFAFA] rounded-lg border h-fit"
          style={{ boxShadow: '8px 8px 64px 0px #2F4A890D' }}
        >
          <div
            className="text-[13px] bg-white p-4 rounded-t-lg"
            style={{ boxShadow: '0px 2px 2px 0px #334DAA0D' }}
          >
            <h1 className="font-semibold">Your preferred candidates</h1>
            <p className="font-light">
              These are the candidates you have selected.
            </p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 px-4">
            {names.map((name, index) => (
              <div
                key={`${name}-${index}`}
                className="border border-[#F5F5F5] bg-white p-4 rounded-lg text-center space-y-3"
              >
                <Avatar className="mx-auto">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div className="">
                  <p className="text-[12px] font-medium">{name}</p>
                  <p className="text-[11px] font-light text-primary">
                    President
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div
            className="bg-white rounded-b-lg py-4 px-4"
            style={{ boxShadow: '2px 0px 0px 2px #334DAA0D' }}
          >
            <Label className="font-light text-sm">
              Enter accreditation here
            </Label>
            <div className="lg:flex lg:space-x-2 space-y-2 lg:space-y-0">
              <Input
                placeholder="Enter accreditation number"
                className="lg:w-[45%] w-full"
              />
              <Button className="h-12 font-light lg:w-[55%] w-full">
                Cast vote
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
