import VacationClientForm from '@/app/feature/vacations/components/vacationForm';
import { getCurrentEmployee } from '@/app/api/getEmployee';

const VacationCreatePage = async () => {
  const employee = await getCurrentEmployee();

  return (
    <div className="w-full h-full">
      <VacationClientForm employee={employee} />
    </div>
  );
};

export default VacationCreatePage;
