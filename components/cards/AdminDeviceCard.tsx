'use client';
import { BsFillFuelPumpFill } from 'react-icons/bs';
import { FaCar, FaTruck, FaShip, FaBus, FaTractor } from 'react-icons/fa';
import { IoMdClose } from 'react-icons/io';
import { MdDirectionsBike, MdOutlineAssignmentTurnedIn } from 'react-icons/md';

import AdminDeviceActionDropdown from '../dropdown/AdminDeviceActionDropdown';
import { Button } from '../ui/button';

interface DeviceCardProps {
  device: Device;
}

const getVehicleIcon = (vehicle_type: Device['vehicle_type']) => {
  const icons = {
    Car: <FaCar className="text-2xl text-blue-500" />,
    Bike: <MdDirectionsBike className="text-2xl text-green-500" />,
    'Micro-Bus': <FaBus className="text-2xl text-orange-500" />,
    Bus: <FaBus className="text-2xl text-yellow-500" />,
    Truck: <FaTruck className="text-2xl text-red-500" />,
    CNG: <BsFillFuelPumpFill className="text-2xl text-green-700" />,
    Ship: <FaShip className="text-2xl text-blue-700" />,
    Tractor: <FaTractor className="text-2xl text-gray-700" />,
    Others: <FaCar className="text-2xl text-gray-500" />,
  };
  return icons[vehicle_type] || icons.Others;
};

const DeviceCardChat: React.FC<DeviceCardProps> = ({ device }) => {
  return (
    <div className="background-light900_dark200 light-border w-full max-w-sm rounded-lg border border-gray-200 bg-white p-5 shadow-md">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          {device.registration_number}
        </h2>

        <div className="flex gap-2 p-2">
          {device.user ? (
            <MdOutlineAssignmentTurnedIn className="text-2xl text-green-500" />
          ) : (
            <IoMdClose className="text-2xl text-red-500" />
          )}
          {getVehicleIcon(device.vehicle_type)}

          <Button variant="outline" asChild>
            <AdminDeviceActionDropdown id={device._id} />
          </Button>
        </div>
      </div>

      <div className="mt-1 flex justify-between text-sm text-gray-500 dark:text-gray-400">
        <p>{device.device_model.name || 'No Model'}</p>
        <p>{device.user ? device.user.email : 'No User'}</p>
      </div>

      {/* <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
        {device.deviceModel.name || "No Model"}
      </p> */}

      <div className="mt-3 flex flex-col gap-1">
        <div className="flex justify-between text-sm">
          <p className="font-bold">Device ID</p>
          <p>{device.id}</p>
        </div>
        <div className="flex justify-between text-sm">
          <p className="font-bold">SIM Number</p>
          <p>{device.device_sim_number}</p>
        </div>

        <div className="flex justify-between text-sm">
          <p className="font-bold">Center Number</p>
          <p>{device.center_number ? device.center_number : 'No Number'}</p>
        </div>

        <div className="flex justify-between text-sm">
          <p className="font-bold">Reference</p>
          <p>
            {device?.reference.name ? device?.reference.name : 'No Reference'}
          </p>
        </div>

        <div className="flex justify-between text-sm">
          <p className="font-bold">Service Charge</p>
          <p>{device.service_charge || 'Not Define'}</p>
        </div>
      </div>
    </div>
  );
};

export default DeviceCardChat;
