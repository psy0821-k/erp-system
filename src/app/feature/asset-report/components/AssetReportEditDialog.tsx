'use client';

import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

import { Pencil } from 'lucide-react';

import { useUpdateAssetReportStatus } from '../hooks/useUpdateAssetReportStatus';
import { updateAssetReportStatusSchema, UpdateAssetReportStatusFormInput } from '../schema/assetReportSchema';
import { AssetReport } from '../type/assetReportType';
import { ASSET_REPORT_STATUS_OPTIONS } from '../type/assetReportOption';

interface Props {
  report: AssetReport;
}

export default function AssetReportStatusEditDialog({ report }: Props) {
  const [open, setOpen] = useState(false);

  const { mutate, isPending } = useUpdateAssetReportStatus();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<UpdateAssetReportStatusFormInput>({
    resolver: zodResolver(updateAssetReportStatusSchema),
    defaultValues: {
      id: report.id,
      status: report.status,
      admin_message: report.admin_message ?? '',
    },
  });

  const onSubmit = (values: UpdateAssetReportStatusFormInput) => {
    mutate(values, {
      onSuccess: () => {
        setOpen(false);
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon">
          <Pencil className="h-4 w-4" />
          <span className="sr-only">처리 상태 수정</span>
        </Button>
      </DialogTrigger>

      <DialogContent className="bg-white sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>처리 상태 수정</DialogTitle>
          <DialogDescription>고장 신고의 처리 상태와 관리자 메세지를 수정합니다.</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <input type="hidden" {...register('id')} />

          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="status">처리 상태</FieldLabel>

              <Controller
                name="status"
                control={control}
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger id="status" className="w-full">
                      <SelectValue placeholder="처리 상태를 선택해주세요." />
                    </SelectTrigger>

                    <SelectContent>
                      <SelectGroup>
                        {ASSET_REPORT_STATUS_OPTIONS.map(option => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.title}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
              />

              {errors.status && <FieldError>{errors.status.message}</FieldError>}
            </Field>

            <Field>
              <FieldLabel htmlFor="admin_message">관리자 메세지</FieldLabel>

              <Textarea
                id="admin_message"
                className="min-h-28"
                placeholder="처리 내용이나 안내 메세지를 입력해주세요."
                {...register('admin_message')}
              />

              {errors.admin_message && <FieldError>{errors.admin_message.message}</FieldError>}
            </Field>
          </FieldGroup>

          <div className="flex justify-end gap-2">
            <Button className="bg-blue-600 text-white focus-visible:ring-4 ring-black ring-offset-2" type="submit" disabled={isPending}>
              {isPending ? '수정 중...' : '수정'}
            </Button>

            <Button
              className="bg-red-600 text-white focus-visible:ring-4 ring-black ring-offset-2"
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              취소
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
