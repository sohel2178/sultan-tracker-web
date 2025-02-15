'use client';

import React from 'react';

import { BsFillFuelPumpFill } from 'react-icons/bs';
import { FaCar, FaTruck, FaShip, FaBus, FaTractor } from 'react-icons/fa';
import { MdDirectionsBike, MdAddCall } from 'react-icons/md';
import { Button } from '../ui/button';
import AdminDeviceActionDropdown from '../dropdown/AdminDeviceActionDropdown';

interface DeviceCardProps {
  device: RedisDevice;
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

function ClientDeviceCard({ device }: DeviceCardProps) {
  return (
    <div className="background-light900_dark200 light-border w-full max-w-sm rounded-lg border border-gray-200 bg-white p-5 shadow-md">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          {device.registration_number}
        </h2>

        <div className="flex gap-2 p-2">
          {getVehicleIcon(device.vehicle_type)}

          <Button variant="outline" asChild>
            <AdminDeviceActionDropdown id={device._id} />
          </Button>
        </div>
      </div>

      <div className="mt-1 flex justify-between text-sm text-gray-500 dark:text-gray-400">
        <p>{device.device_model || 'No Model'}</p>
        <div className="flex gap-4 items-center">
          <p>{device.driver_name || 'No Driver'}</p>
          <a href="tel:+8801409962090">
            <Button variant="outline">
              <MdAddCall className="text-xl" />
            </Button>
          </a>
        </div>
      </div>

      {/* <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {device.deviceModel.name || "No Model"}
          </p> */}

      <div className="mt-3 flex flex-col gap-1">
        <div className="flex justify-between text-sm">
          <p className="font-bold">Device ID</p>
          <p>{device.id}</p>
        </div>
      </div>
    </div>
  );
}

export default ClientDeviceCard;
