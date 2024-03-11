import { OfficeHour } from "../dataclass/OfficeHour";


export function GetSampleList() {
  return [
    new OfficeHour(
      'John Doe',
      '1',
      '2:30',
      '3:30',
      '2:1:2024',
      '5:8:2024',
      'CS',
      100,
      1
    ),
    new OfficeHour(
      'Jane Doe',
      '3',
      '4:0',
      '6:0',
      '2:1:2024',
      '5:8:2024',
      'Chem',
      100,
      2
    ),
    new OfficeHour(
      'Ranbo',
      '1',
      '4:0',
      '6:0',
      '2:1:2024',
      '5:8:2024',
      'PHYS',
      200,
      3
    ),
    new OfficeHour(
      'Ranbo',
      '1',
      '1:0',
      '2:0',
      '2:1:2024',
      '5:8:2024',
      'PHYS',
      200,
      4
    ),
    new OfficeHour(
      'Alexandar',
      '1',
      '1:0',
      '2:0',
      '2:1:2024',
      '5:8:2024',
      'Math',
      233,
      5
    ),
    new OfficeHour(
      'Alexandar',
      '1',
      '3:0',
      '4:0',
      '2:1:2024',
      '5:8:2024',
      'Math',
      233,
      6
    )
  ];
}
