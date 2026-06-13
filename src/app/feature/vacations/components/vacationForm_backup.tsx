'use client';

import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Asterisk, Save, Send } from 'lucide-react';
import Link from 'next/link';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { CreateVacationDTO, VACATION_TYPE, VacationType } from '../type/vacationType';
import { useState } from 'react';
import { useCreateVacation } from '../hooks/useCreateVacation';
interface Employee {
  id: string;
  name: string;
  email: string;
}

interface Props {
  employee: Employee | null;
}

const VacationClientForm = ({ employee }: Props) => {
  const { mutate, isPending } = useCreateVacation();

  const [vacationType, setVacationType] = useState<VacationType | ''>('');
  const createVacationMutation = useCreateVacation();
  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!employee) {
      return;
    }

    const formData = new FormData(e.currentTarget);

    if (!vacationType) {
      return;
    }

    const values: CreateVacationDTO = {
      employee_id: employee.id,
      vacation_title: formData.get('vacation-title')?.toString() ?? '',
      name: formData.get('name')?.toString() ?? '',
      vacation_type: vacationType,
      start_date: formData.get('start_date')?.toString() ?? '',
      end_date: formData.get('end_date')?.toString() ?? '',
      reason: formData.get('reason')?.toString() ?? '',
    };
    await createVacationMutation.mutate(values);
  };
  return (
    <div className="max-w-xl mx-auto my-10 p-6 bg-white border border-gray-200 rounded-xl shadow-sm">
      <form className="space-y-5" id="vacation-form" onSubmit={handleSubmit}>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-900 ">휴가 신청서 작성</h2>
          <div className="flex items-center gap-2">
            <Link href={'/employee/vacation'} className="border p-1 rounded-xl hover:bg-slate-100">
              <ArrowLeft />
            </Link>
            <Button className="w-22 bg-green-600 hover:bg-green-700 text-white font-medium py-2.5 rounded-lg text-sm shadow-sm hover:shadow transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
              <Save />
              저장
            </Button>
            <Button
              form="vacation-form"
              type="submit"
              className="w-22 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-lg text-sm shadow-sm hover:shadow transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              <Send />
              요청
            </Button>
          </div>
        </div>
        <div className="flex">
          <Asterisk className="text-red-600" />
          <Label htmlFor="vacation-title">제목</Label>
        </div>
        <div>
          <Input id="vacation-title" name="vacation-title" placeholder="제목을 입력해 주세요" />
          <p className="text-[14px] text-gray-700 mt-2">홍길도 yyyy.mm.dd 휴가종류 몇일 승인 요청드립니다</p>
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="applicant" className="text-sm font-medium text-gray-700">
            신청자
          </Label>
          <Input
            id="applicant"
            name="name"
            tabIndex={-1}
            value={employee?.name}
            readOnly
            className="w-full px-3.5 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-500 text-sm cursor-not-allowed outline-none"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <div className="flex">
            <Asterisk className="text-red-600" />
            <Label htmlFor="vacationType" className="text-sm font-medium text-gray-700">
              휴가 종류
            </Label>
          </div>
          <Select value={vacationType} onValueChange={value => setVacationType(value as VacationType)}>
            <SelectTrigger
              id="vacationType"
              className="w-full h-10 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
            >
              <SelectValue placeholder="휴가 종류를 선택하세요" />
            </SelectTrigger>
            <SelectContent position="popper" className="bg-white border border-gray-200 rounded-lg shadow-md">
              <SelectGroup>
                <SelectLabel className="text-gray-400 text-xs font-semibold px-2 py-1.5">휴가 종류</SelectLabel>
                <SelectItem value={VACATION_TYPE.ANNUAL}>연차</SelectItem>
                <SelectItem value={VACATION_TYPE.HALF_DAY_AM}>오전 반차</SelectItem>
                <SelectItem value={VACATION_TYPE.HALF_DAY_PM}>오후 반차</SelectItem>
                <SelectItem value={VACATION_TYPE.SICK}>병가</SelectItem>
                <SelectItem value={VACATION_TYPE.OFFICIAL}>공가</SelectItem>
                <SelectItem value={VACATION_TYPE.BUSINESS_TRIP}>출장</SelectItem>
                <SelectItem value={VACATION_TYPE.COMPENSATORY}>대체휴가</SelectItem>
                <SelectItem value={VACATION_TYPE.ETC}>기타</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <div className="flex">
              <Asterisk className="text-red-600" />
              <Label htmlFor="startDate" className="text-sm font-medium text-gray-700">
                시작일
              </Label>
            </div>
            <Input
              id="startDate"
              name="start_date"
              type="date"
              className="w-full px-3.5 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <div className="flex">
              <Asterisk className="text-red-600" />
              <Label htmlFor="endDate" className="text-sm font-medium text-gray-700">
                종료일
              </Label>
            </div>
            <Input
              id="endDate"
              name="end_date"
              type="date"
              className="w-full px-3.5 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            />
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <div className="flex">
            <Asterisk className="text-red-600" />
            <Label htmlFor="reason" className="text-sm font-medium text-gray-700">
              사유
            </Label>
          </div>
          <Textarea
            id="reason"
            name="reason"
            rows={4}
            placeholder="휴가 신청 사유를 입력해주세요."
            className="w-full px-3.5 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all resize-none"
          />
        </div>
      </form>
    </div>
  );
};

export default VacationClientForm;
