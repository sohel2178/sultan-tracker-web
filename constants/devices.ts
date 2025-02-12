const generateDevices = (count: number): Device[] => {
  const devices: Device[] = [];

  for (let i = 1; i <= count; i++) {
    devices.push({
      _id: `67a8969684031a0cb52d5a${i.toString().padStart(2, "0")}`,
      id: `54547845${i.toString().padStart(2, "0")}`,
      deviceSimNumber: `01944537${(7000 + i).toString()}`,
      registrationNumber: `DH_MET-KA-12-45${(70 + i).toString()}`,
      vehicleModel: ["Axios", "Toyota", "Suzuki", "Honda", "BMW"][i % 5],
      code: "",
      centerNumber: `01835645${(6200 + i).toString()}`,
      vehicleType: ["Car", "Bike", "Truck", "Bus", "CNG"][
        i % 5
      ] as Device["vehicleType"],
      mileage: Math.floor(Math.random() * 50),
      congestionConsumption: Math.floor(Math.random() * 5) + 1,
      serviceCharge: Math.floor(Math.random() * 500) + 100,
      speedLimit: Math.floor(Math.random() * 60) + 60,
      maxTemp: Math.floor(Math.random() * 50) + 30,
      minTemp: Math.floor(Math.random() * 15) + 10,
      deviceModel: {
        _id: `67a4b36fddc6071b07c7db${i.toString().padStart(2, "0")}`,
        name: `QB-${i.toString().padStart(3, "0")}`,
      } as Model,
      reference: {
        _id: `67a4dc111ee67c3374e5ad${i.toString().padStart(2, "0")}`,
        name: [
          "Abid Sobhan",
          "Rahim Uddin",
          "Karim Ali",
          "Nasir Khan",
          "Sohan Mia",
        ][i % 5],
      } as Reference,
    });
  }

  return devices;
};

// Generate 50 devices
const devices = generateDevices(50);

export default devices;
