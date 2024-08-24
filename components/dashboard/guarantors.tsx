'use client';
import { getDashboardGuarantorRequest } from '@/config/apis/dashboard';
import { DASHBOARD_GUARANTOR_KEY } from '@/lib/query-keys';
import { useQuery } from '@tanstack/react-query';
import GuarantorRequestCard from '../guarantor-request-card';
import ErrorComponent from '../error-component';
import { DGuarantorRequestLoading } from '../loaders';
import EmptyComponent from '../empty';
import React from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

export default function DashboardGuarantors() {
  const { data, isLoading, isError, error } = useQuery({
    queryFn: getDashboardGuarantorRequest,
    queryKey: [DASHBOARD_GUARANTOR_KEY],
  });

  if (isLoading) return <DGuarantorRequestLoading />;

  if (isError) {
    return <ErrorComponent error={error} />;
  }

  return (
    <div className="w-full">
      {data?.data?.length === 0 ? (
        <EmptyComponent
          title="No guarantor request"
          description="You have guarantor request."
        />
      ) : (
        <Carousel
          opts={{
            align: 'end',
          }}
        >
          <CarouselContent>
            {data?.data?.map((each, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                <div className="p-1">
                  <GuarantorRequestCard key="" data={each} />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="absolute -top-8 right-12 z-10 flex items-center mt-2 space-x-1">
            <CarouselPrevious />
            <CarouselNext />
          </div>
        </Carousel>
      )}
    </div>
  );
}
