import { faker } from '@faker-js/faker/locale/en';

export function mockUsers(length: number) {
  const createRowData = rowIndex => {
    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();
    const name = faker.name.findName(firstName, lastName);
    

    
    const email = faker.internet.email();
    const street = faker.address.country();
    const postcode = faker.address.zipCode();
    const vehicle = faker.vehicle.vehicle();
    const job = faker.name.jobTitle();
    const vehicleBrand = faker.vehicle.manufacturer();
    const vehicleModel = faker.vehicle.model(); 
    const vehicleType = faker.vehicle.type(); 
    const vehicleFuel = faker.vehicle.fuel();
    const vehicleMatricule = faker.random.numeric(4);
    const vehicleHorsepower = faker.random.numeric();
    const vehicleFuelConsumption = faker.random.numeric();
    const phoneNumber = faker.phone.number();
    const company= faker.company.name();
    const circulationDate = faker.date.month();
    const status = 'Assigned';
    const zone='Manouba';
    

    return {
      id: rowIndex + 1,
      name,
      firstName,
      status,
      lastName,
      phoneNumber,
      company,
      street,
      zone,
      postcode,
      email,
      vehicle,
      job,vehicleMatricule,
      vehicleBrand,vehicleModel,vehicleType,circulationDate,vehicleFuel,vehicleHorsepower,vehicleFuelConsumption
    };
  };

  return Array.from({ length }).map((_, index) => {
    return createRowData(index);
  });
}

export function mockTreeData(options: {
  limits: number[];
  labels: string | string[] | ((layer: number, value: string, faker) => string);
  getRowData?: (layer: number, value: string) => any[];
}) {
  const { limits, labels, getRowData } = options;
  const depth = limits.length;

  const data = [];
  const mock = (list, parentValue?: string, layer = 0) => {
    const length = limits[layer];

    Array.from({ length }).forEach((_, index) => {
      const value = parentValue ? parentValue + '-' + (index + 1) : index + 1 + '';
      const children = [];
      const label = Array.isArray(labels) ? labels[layer] : labels;

      let row: any = {
        label: typeof label === 'function' ? label(layer, value, faker) : label + ' ' + value,
        value
      };

      if (getRowData) {
        row = {
          ...row,
          ...getRowData(layer, value)
        };
      }

      list.push(row);

      if (layer < depth - 1) {
        row.children = children;
        mock(children, value, layer + 1);
      }
    });
  };

  mock(data);

  return data;
}
