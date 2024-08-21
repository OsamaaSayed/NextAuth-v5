'use client';

import { useState, useTransition } from 'react';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '../ui/input';
import { Button } from '../ui/button';

import CardWrapper from './card-wrapper';
import FormSuccess from '../form-success';
import FormError from '../form-error';

import { resetPassword } from '@/actions/reset-password';
import { ResetSchema } from '../../schemas';

const ResetPasswordForm = () => {
  const [success, setSuccess] = useState<string | undefined>('');
  const [error, setError] = useState<string | undefined>('');
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof ResetSchema>>({
    resolver: zodResolver(ResetSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = (values: z.infer<typeof ResetSchema>) => {
    setError('');
    setSuccess('');

    startTransition(() => {
      resetPassword(values).then((data) => {
        setError(data?.error);
        setSuccess(data?.success);
      });
    });
  };

  return (
    <CardWrapper
      headerLabel='Forgot your password?'
      backButtonLabel='Back to login'
      backButtonHref='/auth/login'
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='space-y-6'
        >
          <div className='space-y-4'>
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder='john.doe@example.com'
                      type='email'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormSuccess message={success} />
          <FormError message={error} />

          <Button
            disabled={isPending}
            className='w-full'
            type='submit'
          >
            Send reset email
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};

export default ResetPasswordForm;
