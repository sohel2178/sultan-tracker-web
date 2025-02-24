'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { ReloadIcon } from '@radix-ui/react-icons';
import { useRouter } from 'next/navigation';
import React, { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import ROUTES from '@/constants/route';
import { toast } from '@/hooks/use-toast';
import { CreateDevice, EditDevice } from '@/lib/actions/device.action';
import { CreateDeviceSchema } from '@/lib/validation';

import { Button } from '../ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

interface Props {
  models: Model[] | undefined;
  references: Reference[] | undefined;
  device?: EditDeviceParams;
  isEdit?: boolean;
}

function DeviceForm({ models, references, device, isEdit = false }: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof CreateDeviceSchema>>({
    resolver: zodResolver(CreateDeviceSchema),
    defaultValues: {
      id: device?.id || '',
      device_sim_number: device?.device_sim_number || '',
      registration_number: device?.registration_number || '',
      vehicle_model: device?.vehicle_model || '',
      vehicle_type: device?.vehicle_type || 'Car',
      mileage: device?.mileage || 0,
      congestion_consumption: device?.congestion_consumption || 0.5,
      service_charge: device?.service_charge || 300,
      device_model: device?.device_model || '',
      reference: device?.reference || '',
      center_number: device?.center_number || '',
    },
  });

  //   console.log(form.formState.errors);

  const handleCreateDevice = async (
    data: z.infer<typeof CreateDeviceSchema>
  ) => {
    startTransition(async () => {
      if (isEdit && device) {
        const result = await EditDevice({
          _id: device._id,
          ...data,
        });
        if (result.success) {
          toast({
            title: 'Success',
            description: 'Device updated successfully',
          });
          router.push(ROUTES.DEVICES);
        } else {
          toast({
            title: `Error ${result.status}`,
            description: result.error?.message || 'Something went wrong',
            variant: 'destructive',
          });
        }
        return;
      }
      const result = await CreateDevice(data);
      if (result.success) {
        toast({
          title: 'Success',
          description: 'Device created successfully',
        });
        if (result.data) router.push(ROUTES.DEVICES);
      } else {
        toast({
          title: `Error ${result.status}`,
          description: result.error?.message || 'Something went wrong',
          variant: 'destructive',
        });
      }
    });
  };
  return (
    <Form {...form}>
      <form
        className="flex w-full flex-col gap-6 sm:w-3/4"
        onSubmit={form.handleSubmit(handleCreateDevice)}
      >
        {/* Device ID */}
        <FormField
          control={form.control}
          name="id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Device ID <span className="text-primary-500">*</span>
              </FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Device SIM Number */}
        <FormField
          control={form.control}
          name="device_sim_number"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Device SIM Number <span className="text-primary-500">*</span>
              </FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Registration Number */}
        <FormField
          control={form.control}
          name="registration_number"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Registration Number <span className="text-primary-500">*</span>
              </FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Vehicle Type (Dropdown) */}
        <FormField
          control={form.control}
          name="vehicle_type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Vehicle Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger>
                  <SelectValue placeholder="Select vehicle type" />
                </SelectTrigger>
                <SelectContent>
                  {[
                    'Car',
                    'Bike',
                    'Micro-Bus',
                    'Bus',
                    'Truck',
                    'CNG',
                    'Ship',
                    'Tractor',
                    'Others',
                  ].map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="device_model"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Device Model</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger>
                  <SelectValue placeholder="Select device Model" />
                </SelectTrigger>
                <SelectContent>
                  {models &&
                    models.map((model) => (
                      <SelectItem key={model._id} value={model._id}>
                        {model.name}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="reference"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Reference</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Reference" />
                </SelectTrigger>
                <SelectContent>
                  {references &&
                    references.map((reference) => (
                      <SelectItem key={reference._id} value={reference._id}>
                        {reference.name}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Other Optional Fields */}

        <FormField
          control={form.control}
          name="center_number"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Center Number</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="vehicle_model"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Vehicle Model</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Numeric Fields */}

        <FormField
          control={form.control}
          name="service_charge"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Service Charge</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  {...field}
                  value={field.value ?? ''}
                  onChange={(e) => {
                    const value = e.target.value;
                    field.onChange(value === '' ? undefined : Number(value)); // ✅ Convert string to number
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="mileage"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mileage</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  {...field}
                  value={field.value ?? ''}
                  onChange={(e) => {
                    const value = e.target.value;
                    field.onChange(value === '' ? undefined : Number(value)); // ✅ Convert string to number
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="congestion_consumption"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Jam Consumption</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  {...field}
                  value={field.value ?? ''}
                  onChange={(e) => {
                    const value = e.target.value;
                    field.onChange(value === '' ? undefined : Number(value)); // ✅ Convert string to number
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Submit Button */}
        <div className="mt-8 flex justify-end">
          <Button
            type="submit"
            className="primary-gradient w-fit !text-light-900"
          >
            {isPending ? (
              <>
                <ReloadIcon className="mr-2 size-4 animate-spin" />
                <span>Submitting</span>
              </>
            ) : (
              <>{isEdit ? 'Edit Device' : 'Create Device'}</>
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default DeviceForm;
