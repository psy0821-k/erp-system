'use client';

import React from 'react';
import { employeesType } from '../types/employeeType';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Building2, ShieldCheck, User } from 'lucide-react';

interface Props {
  employee: employeesType;
}

function EmployeeDetailDialog({ employee }: Props) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="h-8 text-xs font-semibold rounded-xl border-slate-200 text-indigo-600 bg-white hover:bg-slate-50 hover:text-indigo-700 transition-colors shadow-sm mr-2"
        >
          상세보기
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-md bg-white rounded-2xl border border-slate-200/80 shadow-lg p-6 overflow-hidden gap-0">
        <DialogHeader className="pb-4 border-b border-slate-100">
          <DialogTitle className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <User className="h-5 w-5 text-indigo-600" />
            <span>인사 정보 문서</span>
          </DialogTitle>
          <DialogDescription className="text-xs text-slate-400 mt-1">
            선택한 사내 임직원의 기본 인적 사항 및 발령 정보를 확인합니다.
          </DialogDescription>
        </DialogHeader>

        <div className="bg-slate-50/50 p-4 border-b border-slate-100 flex items-center gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-base font-bold text-slate-800">{employee.name}</span>
              <Badge variant="outline" className="rounded-full font-mono text-[10px] text-slate-400 border-slate-200 px-2 shadow-none">
                {employee.employee_number}
              </Badge>
            </div>
            <p className="text-xs font-medium text-slate-500 mt-0.5">
              {employee.department} · {employee.position}
            </p>
          </div>
        </div>

        <div className="p-6 grid grid-cols-2 gap-4 bg-white text-sm">
          <div className="space-y-1.5 p-3 rounded-xl bg-slate-50/30 border border-slate-100/80">
            <div className="flex items-center gap-1.5 text-slate-400">
              <Building2 className="h-3.5 w-3.5" />
              <span className="text-xs font-medium uppercase tracking-wider">소속 부서</span>
            </div>
            <p className="font-semibold text-slate-800">{employee.department}</p>
          </div>

          <div className="space-y-1.5 p-3 rounded-xl bg-slate-50/30 border border-slate-100/80">
            <div className="flex items-center gap-1.5 text-slate-400">
              <ShieldCheck className="h-3.5 w-3.5" />
              <span className="text-xs font-medium uppercase tracking-wider">직위/직급</span>
            </div>
            <p className="font-semibold text-slate-800">{employee.position}</p>
          </div>

          <div className="space-y-1.5 p-3 rounded-xl bg-slate-50/30 border border-slate-100/80 col-span-2">
            <div className="flex items-center gap-1.5 text-slate-400">
              <Calendar className="h-3.5 w-3.5" />
              <span className="text-xs font-medium uppercase tracking-wider">공식 입사일</span>
            </div>
            <p className="font-semibold font-mono text-slate-700">
              {new Date(employee.hire_date).toLocaleDateString('ko-KR', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>
          </div>
        </div>

        <div className="px-6 pb-2 pt-4 border-t border-slate-100 flex justify-end bg-slate-50/20">
          <DialogTrigger asChild>
            <Button variant="ghost" className="h-9 rounded-xl text-slate-500 text-xs font-semibold hover:bg-slate-100">
              창 닫기
            </Button>
          </DialogTrigger>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default EmployeeDetailDialog;
