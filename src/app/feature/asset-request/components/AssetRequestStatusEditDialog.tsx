'use client';

import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Pencil } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

import { updateAssetRequestStatusSchema, UpdateAssetRequestStatusFormInput } from '../schema/assetRequestSchema';
import { ASSET_REQUEST_STATUS_OPTIONS, AssetRequest } from '../type/assetRequestType';
import { useUpdateAssetRequestStatus } from '../hooks/useUpdateAssetApi';

interface Props {
  request: AssetRequest;
}

export default function AssetRequestStatusEditDialog({ request }: Props) {
  const [open, setOpen] = useState(false);
  const { mutate, isPending } = useUpdateAssetRequestStatus();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<UpdateAssetRequestStatusFormInput>({
    resolver: zodResolver(updateAssetRequestStatusSchema),
    defaultValues: {
      id: request.id,
      status: request.status,
      admin_message: request.admin_message ?? '',
    },
  });

  const onSubmit = (values: UpdateAssetRequestStatusFormInput) => {
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
          <span className="sr-only">IT 물품 요청 상태 수정</span>
        </Button>
      </DialogTrigger>

      <DialogContent className="bg-white sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>요청 상태 수정</DialogTitle>
          <DialogDescription>IT 물품 요청의 처리 상태와 관리자 메세지를 수정합니다.</DialogDescription>
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

                    <SelectContent position="popper" className="bg-white">
                      <SelectGroup>
                        {ASSET_REQUEST_STATUS_OPTIONS.map(option => (
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
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              취소
            </Button>

            <Button type="submit" disabled={isPending}>
              {isPending ? '수정 중...' : '수정'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
