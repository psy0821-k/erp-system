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
import { cardStyle } from '@/app/style/tableStyle';
import { textStyle } from '@/app/style/textStyle';
import { cn } from '@/lib/utils';
import { buttonStyle } from '@/app/style/buttonStyle';

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
    <div className="mx-auto my-10 max-w-xl">
      <Card className={cardStyle.wrapper}>
        <CardHeader className="border-b border-slate-200 pb-6 text-center dark:border-slate-800">
          <CardTitle className={textStyle.title}>휴가 신청 폼</CardTitle>
          <p className={textStyle.muted}>휴가 신청 정보를 입력해주세요.</p>
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
                  <Label htmlFor="reason" className="text-sm font-medium text-slate-900 dark:text-slate-100">
                    사유
                  </Label>
                </div>
                <Textarea
                  id="reason"
                  rows={4}
                  {...form.register('reason')}
                  placeholder="휴가 신청 사유를 입력해주세요."
                  className=" h-30 resize-none border-slate-300 bg-background text-foreground placeholder:text-slate-400 focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2 dark:border-slate-700 dark:focus-visible:ring-slate-100 dark:focus-visible:ring-offset-slate-950"
                />
              </div>
            </FieldGroup>
            <p className="mt-10 text-center text-sm text-muted-foreground">
              이름 및 부서등의 정보는 자동으로 요청됩니다. <br />
              아래의 양식에 맞게 작성해주세요
            </p>

            <div className="flex justify-center items-center gap-2 mt-10">
              <Button form="vacation-create-form" type="submit" className={cn(buttonStyle.base, buttonStyle.submit)}>
                <Send />
                {isPending ? '요청 중...' : '요청'}
              </Button>
              <Button asChild variant="outline" className={cn(buttonStyle.base, buttonStyle.delete)}>
                <Link href="/employee/vacation">취소</Link>
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default VacationClientForm;
