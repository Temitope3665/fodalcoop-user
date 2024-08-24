'use client';
import EmptyComponent from '@/components/empty';
import ErrorComponent from '@/components/error-component';
import AddMessageForm from '@/components/forms/add-message-form';
import { MessagesLoading } from '@/components/loaders';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { getInboxMessages } from '@/config/apis/dashboard';
import { INBOX_MESSAGES_KEY } from '@/lib/query-keys';
import { cn } from '@/lib/utils';
import { useQuery } from '@tanstack/react-query';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import React, { useState } from 'react';
import { CircleDotDashed, Plus, Reply } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { IMessageResponse } from '@/types';

export default function Messages() {
  const [messageType, setMessageType] = useState<string>('inbox');

  const { data, isLoading, isError, error } = useQuery({
    queryFn: () => getInboxMessages(messageType),
    queryKey: [INBOX_MESSAGES_KEY, messageType],
  });
  console.log(data, 'data');

  if (isError) {
    return <ErrorComponent error={error} />;
  }

  return (
    <div className="w-full mt-2">
      <Tabs defaultValue="inbox" onValueChange={setMessageType}>
        <TabsList>
          <TabsTrigger value="inbox">Inbox</TabsTrigger>
          <TabsTrigger value="outbox">Outbox</TabsTrigger>
        </TabsList>
        <TabsContent value="inbox">
          <EachMessage data={data} isLoading={isLoading} />
        </TabsContent>
        <TabsContent value="outbox">
          <EachMessage data={data} isLoading={isLoading} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

export const EachMessage = ({
  data,
  isLoading,
}: {
  data: IMessageResponse[] | undefined;
  isLoading: boolean;
}) => {
  const [selectedMessage, setSelectedMessage] =
    useState<IMessageResponse | null>(null);
  const [open, setOpen] = useState<boolean>(false);

  if (isLoading) return <MessagesLoading />;
  return (
    <div>
      {data?.length === 0 ? (
        <div className="mx-auto w-full text-center space-y-3">
          <EmptyComponent
            title="No Messages yet"
            description="You have no inbox currently."
          />
          <Button onClick={() => setOpen(true)}>Create message</Button>
        </div>
      ) : (
        <React.Fragment>
          {data?.map((message) => (
            <div className="space-y-2 py-2">
              <div className="space-y-1">
                <div className="flex justify-between items-start">
                  <h1
                    className={cn(
                      'text-default font-medium text-sm',
                      message.message_status.name === 'Unread'
                        ? 'text-[#FF4500]'
                        : 'text-primary'
                    )}
                  >
                    {message.subject}
                  </h1>
                  {!message.replyId && (
                    <div
                      className="flex items-center space-x-1"
                      onClick={() => {
                        setSelectedMessage(message);
                        setOpen(true);
                      }}
                    >
                      <Reply size={12} />
                      <p className="text-[10px] font-light" role="button">
                        REPLY
                      </p>
                    </div>
                  )}
                </div>
                <p className="text-default font-light text-[10px]">
                  {message.body}
                </p>
                {message.file_path && (
                  <p className="text-default font-light text-[10px]">
                    View file: {message.file_path}
                  </p>
                )}
                <div
                  className={cn(
                    'flex justify-between items-center',
                    message.message_status.name === 'Unread'
                      ? 'text-[#FF4500]'
                      : 'text-primary'
                  )}
                >
                  <div className="flex items-center space-x-1">
                    <CircleDotDashed size={12} />
                    <p className="uppercase text-[10px] font-medium">
                      {message.message_status.name}
                    </p>
                  </div>
                  <p className="text-xs font-light">{message.sent_on}</p>
                </div>
              </div>

              <Separator />
            </div>
          ))}
          <div
            className="flex text-primary items-center"
            onClick={() => {
              setSelectedMessage(null);
              setOpen(true);
            }}
          >
            <Plus size={12} />
            <p className="text-xs font-light" role="button">
              Add new message
            </p>
          </div>
        </React.Fragment>
      )}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create Message</DialogTitle>
            <DialogDescription>
              Compose a new message or reply your previous message here
            </DialogDescription>
          </DialogHeader>
          <AddMessageForm setOpen={setOpen} message={selectedMessage} />
        </DialogContent>
      </Dialog>
    </div>
  );
};
