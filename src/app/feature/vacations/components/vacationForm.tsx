'use client';

import { Button } from '@/components/ui/button';
import { Send } from 'lucide-react';
import Link from 'next/link';
import { useCreateVacation } from '../hooks/useCreateVacation';
import { VacationCreateInput, vacationCreateSchema } from '../schema/vacationSchema';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { getVacationCreateDefaultValues } from '../schema/vacationCreateDefaultValue';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FieldGroup } from '@/components/ui/field';
import { FormInputField } from '@/components/ui/form-input-field';
import { FormSelectField } from '@/components/ui/form-select-field';
import { vacationTypeOptions } from '../type/vacationOptionType';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface Employee {
  id: string;
  name: string;
}

interface Props {
  employee: Employee | null;
}

const VacationClientForm = ({ employee }: Props) => {
  const { mutate, isPending } = useCreateVacation();

  const onSubmit = (values: VacationCreateInput) => {
    mutate(values);
  };

  const form = useForm<VacationCreateInput>({
    resolver: zodResolver(vacationCreateSchema),
    defaultValues: getVacationCreateDefaultValues(employee),
  });
  if (!employee) {
    return <div>직원 정보를 불러올 수 없습니다.</div>;
  }

  return (
    <div className="max-w-xl mx-auto my-10 p-6 bg-white border border-gray-200 rounded-xl shadow-sm">
      <Card>
        <CardHeader className="space-y-3 text-center">
          <div>
            <CardTitle className="text-2xl font-bold tracking-tight">휴가 신청 폼</CardTitle>
          </div>
        </CardHeader>

        <CardContent>
          <form
            id="vacation-create-form"
            onSubmit={form.handleSubmit(onSubmit, errors => {
              console.log('검증 실패', errors);
            })}
          >
            <FieldGroup>
              <FormInputField name="vacation_title" control={form.control} label="제목" placeholder="제목을 입력해주세요" />

              <FormSelectField
                name="vacation_type"
                control={form.control}
                label="휴가 종류"
                placeholder="휴가 종류를 선택하세요"
                options={vacationTypeOptions}
              />
              <div className="flex gap-3">
                <FormInputField name="start_date" control={form.control} label="시작일" type="date" />
                <FormInputField name="end_date" control={form.control} label="종료일" type="date" />
              </div>

              <div className="flex flex-col gap-1.5">
                <div className="flex">
                  <Label htmlFor="reason" className="text-sm font-medium text-gray-700">
                    사유
                  </Label>
                </div>
                <Textarea
                  id="reason"
                  rows={4}
                  {...form.register('reason')}
                  placeholder="휴가 신청 사유를 입력해주세요."
                  className="w-full h-30 px-3.5 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:ring-2 outline-none transition-all resize-none"
                />
              </div>
            </FieldGroup>
            <p className="mt-10 text-center text-sm text-muted-foreground">
              이름 및 부서등의 정보는 자동으로 요청됩니다. <br />
              아래의 양식에 맞게 작성해주세요
            </p>

            <div className="flex justify-center items-center gap-2 mt-10">
              <Button
                form="vacation-create-form"
                type="submit"
                className="w-22 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-lg text-sm shadow-sm hover:shadow transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                <Send />
                {isPending ? '요청 중...' : '요청'}
              </Button>
              <Link
                href={'/employee/vacation'}
                className="w-22  text-center bg-red-600 hover:bg-red-700 text-white font-medium py-1.5 rounded-lg text-sm shadow-sm hover:shadow transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
              >
                취소
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default VacationClientForm;
