import { OfficeHour } from '../dataclass/OfficeHour';

export function GetSampleList() {
  return [
    new OfficeHour('John Doe', 1, '14:30', '15:30', '02:01:2024', '05:08:2024', 'CS', 100, 1),
    new OfficeHour('Jane Doe', 3, '16:00', '18:00', '02:01:2024', '05:08:2024', 'Chem', 100, 2),
    new OfficeHour('Ranbo', 1, '16:00', '18:00', '02:01:2024', '05:08:2024', 'PHYS', 200, 3),
    new OfficeHour('Ranbo', 4, '13:00', '14:00', '02:01:2024', '05:08:2024', 'PHYS', 200, 4),
    new OfficeHour('Alexandar', 1, '13:00', '14:00', '02:01:2024', '05:08:2024', 'Math', 233, 5),
    new OfficeHour('Alexandar', 1, '15:00', '16:00', '02:01:2024', '05:08:2024', 'Math', 233, 6),
  ];
}
