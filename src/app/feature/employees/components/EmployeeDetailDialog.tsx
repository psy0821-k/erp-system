'use client';

import React from 'react';
import { Calendar, Building2, ShieldCheck, User } from 'lucide-react';

import { employeesType } from '../types/employeeType';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

import { cn } from '@/lib/utils';
import { buttonStyle } from '@/app/style/buttonStyle';
import { textStyle } from '@/app/style/textStyle';

interface Props {
  employee: employeesType;
}

function EmployeeDetailDialog({ employee }: Props) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button type="button" variant="outline" size="sm" className={cn(buttonStyle.base, buttonStyle.detail)}>
          상세보기
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-md gap-0 overflow-hidden rounded-2xl p-0">
        <DialogHeader className="border-b border-slate-200 p-6 pb-4 dark:border-slate-800">
          <DialogTitle className={cn('flex items-center gap-2 text-xl font-bold', textStyle.title)}>
            <User className="h-5 w-5 text-indigo-600 dark:text-indigo-400" aria-hidden="true" />
            <span>인사 정보 문서</span>
          </DialogTitle>

          <DialogDescription className={cn('mt-1 text-xs', textStyle.muted)}>
            선택한 사내 임직원의 기본 인적 사항 및 발령 정보를 확인합니다.
          </DialogDescription>
        </DialogHeader>

        <div className="flex items-center gap-4 border-b border-slate-200 bg-slate-50/60 p-4 dark:border-slate-800 dark:bg-slate-900/60">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className={cn('text-base font-bold', textStyle.primary)}>{employee.name}</span>

              <Badge
                variant="outline"
                className="rounded-full border-slate-300 px-2 font-mono text-[10px] text-slate-600 shadow-none dark:border-slate-700 dark:text-slate-300"
              >
                {employee.employee_number}
              </Badge>
            </div>

            <p className={cn('mt-0.5 text-xs font-medium', textStyle.muted)}>
              {employee.department} · {employee.position}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 bg-white p-6 text-sm dark:bg-slate-950">
          <div className="space-y-1.5 rounded-xl border border-slate-200 bg-slate-50/50 p-3 dark:border-slate-800 dark:bg-slate-900/60">
            <div className={cn('flex items-center gap-1.5', textStyle.subtle)}>
              <Building2 className="h-3.5 w-3.5" aria-hidden="true" />
              <span className="text-xs font-medium uppercase tracking-wider">소속 부서</span>
            </div>

            <p className={cn('font-semibold', textStyle.primary)}>{employee.department}</p>
          </div>

          <div className="space-y-1.5 rounded-xl border border-slate-200 bg-slate-50/50 p-3 dark:border-slate-800 dark:bg-slate-900/60">
            <div className={cn('flex items-center gap-1.5', textStyle.subtle)}>
              <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" />
              <span className="text-xs font-medium uppercase tracking-wider">직위/직급</span>
            </div>

            <p className={cn('font-semibold', textStyle.primary)}>{employee.position}</p>
          </div>

          <div className="col-span-2 space-y-1.5 rounded-xl border border-slate-200 bg-slate-50/50 p-3 dark:border-slate-800 dark:bg-slate-900/60">
            <div className={cn('flex items-center gap-1.5', textStyle.subtle)}>
              <Calendar className="h-3.5 w-3.5" aria-hidden="true" />
              <span className="text-xs font-medium uppercase tracking-wider">공식 입사일</span>
            </div>

            <p className={cn('font-mono font-semibold', textStyle.secondary)}>
              {new Date(employee.hire_date).toLocaleDateString('ko-KR', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>
          </div>
        </div>

        <div className="flex justify-end border-t border-slate-200 bg-slate-50/40 px-6 pb-4 pt-4 dark:border-slate-800 dark:bg-slate-900/50">
          <DialogClose asChild>
            <Button type="button" variant="ghost" className={cn(buttonStyle.base, buttonStyle.delete)}>
              창 닫기
            </Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default EmployeeDetailDialog;
