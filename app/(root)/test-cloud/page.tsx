'use client';

import React, { useState } from 'react';

import Image from 'next/image';

import {
  CldUploadWidget,
  CloudinaryUploadWidgetResults,
  CloudinaryUploadWidgetInfo,
} from 'next-cloudinary';

function ClodenaryTest() {
  const [imageUrl, setImageUrl] = useState('');

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const isCloudinaryInfo = (info: any): info is CloudinaryUploadWidgetInfo => {
    return typeof info === 'object' && info !== null && 'secure_url' in info;
  };
  return (
    <div className="w-full">
      <h2>Upload Driver Photo</h2>
      <div className="flex w-full gap-4">
        {imageUrl && (
          <Image src={imageUrl} width={200} height={200} alt="driver photo" />
        )}

        <CldUploadWidget
          uploadPreset="sultan-tracker"
          onSuccess={(result: CloudinaryUploadWidgetResults) => {
            if (result && result.info && isCloudinaryInfo(result.info)) {
              const uploadedUrl = result.info.secure_url;

              console.log(uploadedUrl);
              setImageUrl(uploadedUrl);
              // form.setValue('driver_photo', uploadedUrl); // Set the value in the form
            }
            //   form.setValue('driver_photo', uploadedUrl);
          }}
        >
          {({ open }) => {
            return <button onClick={() => open()}>Upload an Image</button>;
          }}
        </CldUploadWidget>
      </div>
    </div>
  );
}

export default ClodenaryTest;
