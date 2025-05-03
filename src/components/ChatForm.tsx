'use client';

import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem } from './ui/form';
import { Textarea } from './ui/textarea';
import { useForm } from 'react-hook-form';
import { Button } from './ui/button';
import { Send } from 'lucide-react';
import { z } from 'zod';

const ChatForm = () => {
  const formSchema = z.object({
    prompt: z.string().min(1, {
      message: 'Prompt is required',
    }),
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: '',
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values.prompt);
  };

  return (
    <div className="p-3">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex gap-2 items-center">
            <FormField
              control={form.control}
              name="prompt"
              render={({ field }) => (
                <FormItem className="w-full flex-1">
                  <FormControl>
                    <Textarea {...field} className="bg-stone-300 rows-1" />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button>
              <Send />
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ChatForm;
