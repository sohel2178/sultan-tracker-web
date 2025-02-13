'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Input } from '../ui/input';

interface Props<T> {
  imgSrc: string;
  placeholder: string;
  data: T[]; // Generic array instead of any[]
  callback: (data: T[]) => void; // Generic callback function
  fields: (keyof T)[];
  otherClasses?: string;
  iconPosition?: 'left' | 'right';
}

const ClientSearch = <T,>({
  imgSrc,
  placeholder,
  otherClasses,
  data,
  fields,
  callback,
  iconPosition = 'left',
}: Props<T>) => {
  const [search, setSearch] = useState('');
  //   const [state, setState] = useState([...data]);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (search === '') {
        callback(data);
      } else {
        // data.filter(x=>)
        callback(
          data.filter((item) =>
            fields.some((field) =>
              String(item[field]).toLowerCase().includes(search.toLowerCase())
            )
          )
        );
      }
    }, 1000);

    return () => clearTimeout(delayDebounce);
  }, [search, callback, data, fields]);
  return (
    <div
      className={`background-light800_darkgradient flex min-h-[56px] grow items-center gap-4 rounded-[10px] px-4 ${otherClasses}`}
    >
      {iconPosition === 'left' && (
        <Image
          src={imgSrc}
          width={24}
          height={24}
          alt="Search"
          className="cursor-pointer"
        />
      )}

      <Input
        className="paragraph-regular no-focus placeholder text-dark400_light700 border-none shadow-none outline-none"
        placeholder={placeholder}
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {iconPosition === 'right' && (
        <Image
          src={imgSrc}
          width={24}
          height={24}
          alt="Search"
          className="cursor-pointer"
        />
      )}
    </div>
  );
};

export default ClientSearch;
