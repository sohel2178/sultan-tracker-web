import AutoSizer from 'react-virtualized-auto-sizer';
import React from 'react';
import { FixedSizeList as List, ListChildComponentProps } from 'react-window';
import { cn } from '@/lib/utils';
import Link from 'next/link';

interface RecyclerViewProps {
  items: RedisDevice[] | PopDevice[];
  selectedDevice: RedisDevice | PopDevice;
  pathname: string;
}

function DeviceRecyclerView({
  items,
  selectedDevice,
  pathname,
}: //   pathname,
RecyclerViewProps) {
  //   const pathname = usePathname();
  //   console.log(pathname, 'Path Name');
  const Row = ({ index, style }: ListChildComponentProps) => {
    // const escapeRegExp = (string: string) => {
    //   return string.replace(/[.*+?^=!:${}()|\[\]\/\\]/g, '\\$&'); // Escape special characters for regex
    // };

    const oldId = String(selectedDevice._id); // Escape special characters in the old ID
    const newId = String(items[index]._id); // Ensure new ID is a string

    // Use RegExp with global flag to replace all occurrences of old ID
    const newPathname = pathname.replace(new RegExp(oldId, 'g'), newId);

    return (
      <div
        style={style}
        className={cn('flex w-full p-1 background-light900_dark200')}
      >
        <Link href={newPathname} className="w-full">
          <div
            className={cn(
              'flex border rounded-md w-full h-full flex-col px-4 cursor-pointer',
              items[index]._id === selectedDevice._id
                ? 'bg-primary-500'
                : 'background-light900_dark200'
            )}
          >
            <span>{items[index].registration_number}</span>
            <span className="subtle-regular">{items[index].id}</span>
          </div>
        </Link>
      </div>
    );
  };
  return (
    <>
      {items.length > 0 && (
        <AutoSizer>
          {({ height, width }) => (
            <List
              height={height}
              itemCount={items.length}
              itemSize={60}
              width={width}
            >
              {Row}
            </List>
          )}
        </AutoSizer>
      )}
    </>
  );
}

export default DeviceRecyclerView;

// const RecyclerView: React.FC<RecyclerViewProps> = ({
//     items,
//     selectedDevice,
//   }) => {
//     const pathname = usePathname();
//     // console.log(pathname);
//     const Row = ({ index, style }: ListChildComponentProps) => (
//       <div
//         style={style}
//         className={cn('flex w-full p-1 background-light900_dark200')}
//       >
//         <Link
//           href={pathname.replace(selectedDevice._id, items[index]._id)}
//           className="w-full"
//         >
//           <div
//             className={cn(
//               'flex border rounded-md w-full h-full flex-col px-4 cursor-pointer',
//               items[index].id === selectedDevice.id
//                 ? 'bg-primary-500'
//                 : 'background-light900_dark200'
//             )}
//             // onClick={() => setSelectedDevice(items[index])}
//           >
//             <span>{items[index].registration_number}</span>
//             <span className="subtle-regular">{items[index].id}</span>
//           </div>
//         </Link>
//       </div>
//     );

//     return (
//       <List height={400} itemCount={items.length} itemSize={50} width="100%">
//         {Row}
//       </List>
//     );
//   };
