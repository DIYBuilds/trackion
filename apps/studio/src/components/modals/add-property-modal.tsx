'use client';
import { useState } from 'react';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogFooter,
  AlertDialogCancel,
} from '../ui/alert-dialog';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { Loader2 } from 'lucide-react';
import { useAddPropertyModal } from '@/store/modal-store';
import toast from 'react-hot-toast';

const formSchema = z.object({
  domain: z
    .string()
    .regex(
      /^(?!:\/\/)([a-zA-Z0-9-_]+\.)+[a-zA-Z]{2,}$/,
      'Invalid domain. Example: example.com',
    ),
});

export default function AddPropertyModel() {
  const [loading, setLoading] = useState(false); // Loading state for request
  const modal = useAddPropertyModal();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      domain: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setLoading(true);

      const res = await fetch('/api/property', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      const data = await res.json();
      if (res.status !== 200) {
        toast.error(data.error);
        return;
      }

      toast.success('Property added successfully');
      modal.onClose();
    } catch (error: any) {
      console.error('Failed to add property:', error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <AlertDialog open={modal.isOpen} onOpenChange={modal.onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-xl font-bold mb-4">
            Add Your Property
          </AlertDialogTitle>
        </AlertDialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 w-full"
          >
            <FormField
              control={form.control}
              name="domain"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Domain</FormLabel>
                  <FormControl>
                    <Input {...field} disabled={loading} />
                  </FormControl>
                  <FormMessage />
                  <FormDescription>
                    Enter the domain of your website. Don't include the protocol
                    (http:// or https://) example: example.com
                  </FormDescription>
                </FormItem>
              )}
            />

            <Button className="w-full" type="submit" disabled={loading}>
              {loading ? <Loader2 className="animate-spin" /> : 'Add Property'}
            </Button>
          </form>
        </Form>
        <AlertDialogFooter>
          <AlertDialogCancel className="w-full" disabled={loading}>
            Cancel
          </AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
