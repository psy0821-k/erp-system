import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from './ui/select';

const Filtering = () => {
  return (
    <header className="flex justify-between mb-8">
      <div className="flex gap-4">
        <Select>
          <SelectTrigger className="w-26">
            <SelectValue placeholder="직급 선택" />
          </SelectTrigger>

          <SelectContent position="popper" className="bg-white">
            <SelectGroup>
              <SelectItem className="hover:bg-slate-100" value="STAFF">
                사원
              </SelectItem>
              <SelectItem className="hover:bg-slate-100" value="MANAGER">
                과장
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <Select>
          <SelectTrigger className="w-30">
            <SelectValue placeholder="부서 선택" />
          </SelectTrigger>

          <SelectContent position="popper" className="bg-white">
            <SelectGroup>
              <SelectItem className="hover:bg-slate-100" value="backend">
                백엔드
              </SelectItem>
              <SelectItem className="hover:bg-slate-100" value="frontend">
                프론트엔드
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </header>
  );
};

export default Filtering;
