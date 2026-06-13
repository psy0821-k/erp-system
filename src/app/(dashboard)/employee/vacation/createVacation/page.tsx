import VacationClientForm from '@/app/feature/vacations/components/vacationForm';
import { getCurrentEmployee } from '@/app/api/getEmployee';

const VacationCreatePage = async () => {
  const employee = await getCurrentEmployee();

  return (
    <main className="w-full h-full">
      <VacationClientForm employee={employee} />
    </main>
  );
};

export default VacationCreatePage;
