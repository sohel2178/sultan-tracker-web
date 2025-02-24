'use client';

import React from 'react';

import { BsFillFuelPumpFill } from 'react-icons/bs';
import { FaCar, FaTruck, FaShip, FaBus, FaTractor } from 'react-icons/fa';
import { MdDirectionsBike, MdAddCall } from 'react-icons/md';
import { Button } from '../ui/button';
import OffOn from '../OffOn';
import { getStopDuration } from '@/lib/utils';
import ClientDeviceActionDropdown from '../dropdown/ClientDeviceActionDropdown';

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
    <div className="background-light900_dark200 light-border w-full  rounded-lg border border-gray-200 bg-white p-5 shadow-md">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          {device.registration_number}
        </h2>

        <div className="flex gap-2 p-2">
          {getVehicleIcon(device.vehicle_type)}

          <Button variant="outline" asChild>
            <ClientDeviceActionDropdown id={device._id} />
          </Button>
        </div>
      </div>

      <div className="mt-1 flex justify-between items-center text-sm text-gray-500 dark:text-gray-400">
        <p>{device.device_model || 'No Model'}</p>
        {device.driver_name && device.driver_phone && (
          <div className="flex gap-4 items-center">
            <p>{device.driver_name || 'No Driver'}</p>
            <a href={`tel:${device.driver_phone}`}>
              <Button variant="outline">
                <MdAddCall className="text-xl" />
              </Button>
            </a>
          </div>
        )}
      </div>

      {/* <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {device.deviceModel.name || "No Model"}
          </p> */}

      <div className="mt-3 flex flex-col gap-1 subtle-regular">
        <div className="flex justify-between">
          <p className="text-dark500_light700 uppercase">Device ID</p>
          <p className="text-dark500_light700">{device.id}</p>
        </div>

        <div className="flex justify-between">
          <p className="text-dark500_light700 uppercase">Number of sattelite</p>
          <p className="text-dark500_light700">
            {device.geo?.number_of_satellite || 0}
          </p>
        </div>

        <div className="flex justify-between">
          <p className="text-dark500_light700 uppercase">Voltage Level</p>
          <p className="text-dark500_light700">
            {device.geo?.voltage_level || 'Not Found'}
          </p>
        </div>

        <div className="flex justify-between">
          <p className="text-dark500_light700 uppercase">total distance</p>
          <p className="text-dark500_light700">
            {(device.geo?.milage ? device.geo.milage / 1000 : 0).toFixed(1) ||
              0}{' '}
            km
          </p>
        </div>

        <div className="flex justify-between">
          <p className="text-dark500_light700 uppercase">Milage</p>
          <p className="text-dark500_light700">{device.mileage || 'Not Set'}</p>
        </div>

        <div className="flex justify-between">
          <p className="text-dark500_light700 uppercase">Stop duration</p>
          <p className="text-dark500_light700">
            {device.geo ? getStopDuration(device.geo) : 'Undefined'}
          </p>
        </div>
      </div>

      {device.geo && (
        <div className="flex justify-between items-center mt-4">
          <div className="flex gap-4 items-center">
            <span className="body-medium text-dark500_light700 uppercase">
              acc
            </span>
            <OffOn state={device.geo.acc || 'OFF'} />
          </div>

          <div className="flex gap-4 items-center">
            <span className="body-medium text-dark500_light700 uppercase">
              charging
            </span>
            <OffOn state={device.geo.charging || 'OFF'} />
          </div>

          <div className="flex gap-4 items-center">
            <span className="body-medium text-dark500_light700 uppercase">
              relay
            </span>
            <OffOn state={device.geo.fuel_line || 'OFF'} />
          </div>
        </div>
      )}
    </div>
  );
}

export default ClientDeviceCard;
