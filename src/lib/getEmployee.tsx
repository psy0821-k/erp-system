import { employees } from '@/app/mock-data/hr';

export default function getEmployee(id: string) {
  return employees.find(employee => employee.id === id);
}
