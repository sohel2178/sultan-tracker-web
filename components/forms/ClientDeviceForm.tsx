'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { ReloadIcon } from '@radix-ui/react-icons';
import { useRouter } from 'next/navigation';
import React, { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import Image from 'next/image';

import ROUTES from '@/constants/route';
import { toast } from '@/hooks/use-toast';
import { EditClientDevice } from '@/lib/actions/device.action';
import { ClientEditDeviceSchema } from '@/lib/validation';

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

import { CldUploadWidget } from 'next-cloudinary';

interface Props {
  device?: EditClientDeviceParams;
  isEdit?: boolean;
}

function ClientDeviceForm({ device, isEdit = false }: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const [imageUrl, setImageUrl] = useState(device?.driver_photo || '');

  const form = useForm<z.infer<typeof ClientEditDeviceSchema>>({
    resolver: zodResolver(ClientEditDeviceSchema),
    defaultValues: {
      _id: device?._id,
      id: device?.id || '',
      device_sim_number: device?.device_sim_number || '',
      registration_number: device?.registration_number || '',
      vehicle_model: device?.vehicle_model || '',
      vehicle_type: device?.vehicle_type || 'Car',
      mileage: device?.mileage || 0,
      center_number: device?.center_number || '',
      driver_name: device?.driver_name || '',
      driver_phone: device?.driver_phone || '',
      driver_photo: imageUrl,
    },
  });

  // console.log(form.formState.errors);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleUploadSuccess = (result: any) => {
    // if (result.info?.secure_url) {
    //   setImageUrl(result.info.secure_url);
    // }

    if (result.info?.secure_url) {
      const { secure_url, coordinates } = result.info;

      if (coordinates?.custom) {
        // console.log(coordinates.custom[0], 'HHHH');
        const [x, y, width, height] = coordinates.custom[0];

        // console.log(x, y, width, height);

        // Create a cropped version using Cloudinary transformations
        const croppedImageUrl = secure_url.replace(
          '/upload/',
          `/upload/c_crop,x_${x},y_${y},w_${width},h_${height}/`
        );

        // console.log('Cropped Image URL:', croppedImageUrl);
        setImageUrl(croppedImageUrl); // Save the cropped image URL
        form.setValue('driver_photo', croppedImageUrl);
      } else {
        // console.warn('No cropping coordinates found, using original image.');
        setImageUrl(secure_url);
        form.setValue('driver_photo', secure_url);
      }
    }
  };

  const handleCreateDevice = async (
    data: z.infer<typeof ClientEditDeviceSchema>
  ) => {
    console.log(data);
    // console.log(croppedImage);

    startTransition(async () => {
      if (isEdit && device) {
        const result = await EditClientDevice({
          ...data,
        });
        if (result.success) {
          toast({
            title: 'Success',
            description: 'Device updated successfully',
          });
          router.push(ROUTES.CLIENT_DEVICES);
        } else {
          toast({
            title: `Error ${result.status}`,
            description: result.error?.message || 'Something went wrong',
            variant: 'destructive',
          });
        }
        return;
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
          disabled
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

        {/* Other Optional Fields */}

        <FormField
          control={form.control}
          name="center_number"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Customer Number</FormLabel>
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
          name="mileage"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Mileage (Distance traveled in kilometers per liter of fuel?)
              </FormLabel>
              <FormControl>
                <Input
                  type="number"
                  {...field}
                  onChange={(e) => field.onChange(Number(e.target.value) || 0)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormItem>
          <FormLabel>Driver Photo</FormLabel>

          {/* Button to upload the cropped image to Cloudinary */}

          <div className="w-full flex gap-8 items-end">
            {imageUrl && (
              <Image
                src={imageUrl}
                width={150}
                height={150}
                alt="Driver Photo"
                className="mt-4 w-40 h-40 object-cover rounded-lg"
              />
            )}
            <CldUploadWidget
              signatureEndpoint="/api/sign-image"
              onSuccess={handleUploadSuccess}
              options={{
                cropping: true,
                croppingAspectRatio: 1,
                croppingCoordinatesMode: 'custom', // Allow custom cropping
              }}
            >
              {({ open }) => (
                <Button
                  variant="outline"
                  onClick={(e) => {
                    e.preventDefault();
                    open();
                  }}
                  className="rounded"
                >
                  Upload Photo
                </Button>
              )}
            </CldUploadWidget>
          </div>

          <FormMessage />
        </FormItem>

        <FormField
          control={form.control}
          name="driver_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Driver Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="driver_phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Driver Contact</FormLabel>
              <FormControl>
                <Input {...field} />
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

export default ClientDeviceForm;
