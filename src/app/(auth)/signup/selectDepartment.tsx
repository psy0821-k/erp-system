import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
const departments = ['프론트엔드', '백엔드', '디자이너', '기획', '인사'];

type DepartmentSelectProps = {
  value: string;
  onValueChange: (value: string) => void;
};

const SelectDepartment = ({ value, onValueChange }: DepartmentSelectProps) => {
  return (
    <div className="space-y-1.5">
      <label htmlFor="department" className="text-sm font-semibold text-foreground/90">
        직무
      </label>
      <div className="relative mt-2">
        <Select value={value} onValueChange={onValueChange}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="직무를 선택하세요" />
          </SelectTrigger>
          <SelectContent position={'popper'} className="bg-slate-50">
            <SelectGroup>
              <SelectLabel className="pt-2 pb-2">직무를 선택하세요</SelectLabel>
              {departments.map(department => (
                <SelectItem key={department} value={department} className="pt-2 pb-2 cursor-pointer hover:bg-slate-200">
                  {department}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default SelectDepartment;
