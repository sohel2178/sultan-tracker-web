"use client";
import { BsFillFuelPumpFill } from "react-icons/bs";
import {
  FaCar,
  FaMotorcycle,
  FaTruck,
  FaShip,
  FaBus,
  FaTractor,
} from "react-icons/fa";
import { IoMdSpeedometer, IoMdClose } from "react-icons/io";
import { MdDirectionsBike, MdOutlineAssignmentTurnedIn } from "react-icons/md";

import DeviceActionDropdown from "../dropdown/DeviceActionDropdown";
import { Button } from "../ui/button";

interface DeviceCardProps {
  device: Device;
}

const getVehicleIcon = (vehicleType: Device["vehicleType"]) => {
  const icons = {
    Car: <FaCar className="text-2xl text-blue-500" />,
    Bike: <MdDirectionsBike className="text-2xl text-green-500" />,
    "Micro-Bus": <FaBus className="text-2xl text-orange-500" />,
    Bus: <FaBus className="text-2xl text-yellow-500" />,
    Truck: <FaTruck className="text-2xl text-red-500" />,
    CNG: <BsFillFuelPumpFill className="text-2xl text-green-700" />,
    Ship: <FaShip className="text-2xl text-blue-700" />,
    Tractor: <FaTractor className="text-2xl text-gray-700" />,
    Others: <IoMdSpeedometer className="text-2xl text-gray-500" />,
  };
  return icons[vehicleType] || icons.Others;
};

const DeviceCardChat: React.FC<DeviceCardProps> = ({ device }) => {
  return (
    <div className="background-light900_dark200 light-border w-full max-w-sm rounded-lg border border-gray-200 bg-white p-5 shadow-md">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          {device.registrationNumber}
        </h2>

        <div className="flex gap-2 p-2">
          {device.user ? (
            <MdOutlineAssignmentTurnedIn className="text-2xl text-green-500" />
          ) : (
            <IoMdClose className="text-2xl text-red-500" />
          )}
          {getVehicleIcon(device.vehicleType)}

          <Button variant="outline" asChild>
            <DeviceActionDropdown id={device._id} />
          </Button>
        </div>
      </div>

      <div className="mt-1 flex justify-between text-sm text-gray-500 dark:text-gray-400">
        <p>{device.deviceModel.name || "No Model"}</p>
        <p>{device.user ? device.user.email : "No User"}</p>
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
          <p>{device.deviceSimNumber}</p>
        </div>

        <div className="flex justify-between text-sm">
          <p className="font-bold">Center Number</p>
          <p>{device.centerNumber ? device.centerNumber : "No Number"}</p>
        </div>

        <div className="flex justify-between text-sm">
          <p className="font-bold">Reference</p>
          <p>
            {device?.reference.name ? device?.reference.name : "No Reference"}
          </p>
        </div>

        <div className="flex justify-between text-sm">
          <p className="font-bold">Service Charge</p>
          <p>{device.serviceCharge || "Not Define"}</p>
        </div>
      </div>

      {/* <div className="mt-3 flex justify-between">
        <div className="flex flex-col items-center">
          <IoMdSpeedometer className="text-xl text-blue-500" />
          <p className="text-xs">{device.speedLimit || 0} km/h</p>
        </div>
        <div className="flex flex-col items-center">
          <BsFillFuelPumpFill className="text-xl text-green-500" />
          <p className="text-xs">{device.mileage || 0} km/l</p>
        </div>
        <div className="flex flex-col items-center">
          <FaTruck className="text-xl text-red-500" />
          <p className="text-xs">{device.congestionConsumption || 0} L</p>
        </div>
      </div>

      {device.driverName && (
        <div className="mt-3">
          <p className="text-sm">
            <strong>Driver:</strong> {device.driverName} (
            {device.driverPhone || "No Phone"})
          </p>
        </div>
      )}

      <button className="mt-4 w-full rounded-lg bg-blue-500 py-2 text-white hover:bg-blue-600">
        View Details
      </button> */}
    </div>
  );
};

export default DeviceCardChat;
