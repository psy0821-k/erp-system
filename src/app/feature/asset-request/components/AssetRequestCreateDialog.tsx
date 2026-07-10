'use client';

import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Plus } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

import { ASSET_TYPE_OPTIONS } from '@/config/types/asset';
import { useCreateAssetRequest } from '../hooks/useCreateAssetRequest';
import { createAssetRequestSchema, CreateAssetRequestFormInput } from '../schema/assetRequestSchema';
import { buttonStyle } from '@/app/style/buttonStyle';
import { cn } from '@/lib/utils';

interface Props {
  requesterId: string;
}

export default function AssetRequestCreateDialog({ requesterId }: Props) {
  const [open, setOpen] = useState(false);
  const { mutate, isPending } = useCreateAssetRequest();

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<CreateAssetRequestFormInput>({
    resolver: zodResolver(createAssetRequestSchema),
    defaultValues: {
      requester_id: requesterId,
      asset_type: undefined,
      request_title: '',
      reason: '',
    },
  });

  const onSubmit = (values: CreateAssetRequestFormInput) => {
    mutate(values, {
      onSuccess: () => {
        reset({
          requester_id: requesterId,
          asset_type: undefined,
          request_title: '',
          reason: '',
        });
        setOpen(false);
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className={cn(buttonStyle.createNew, buttonStyle.base)}>
          <Plus className="mr-2 h-4 w-4" />
          IT 물품 요청
        </Button>
      </DialogTrigger>

      <DialogContent className="bg-white sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>IT 물품 요청</DialogTitle>
          <DialogDescription>업무에 필요한 IT 물품을 요청합니다.</DialogDescription>
        </DialogHeader>

        <form
          onSubmit={handleSubmit(onSubmit, errors => {
            console.log('폼 에러:', errors);
          })}
          className="space-y-5"
        >
          <input type="hidden" {...register('requester_id')} />
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="asset_type">요청 물품</FieldLabel>

              <Controller
                name="asset_type"
                control={control}
                render={({ field }) => (
                  <Select value={field.value ?? ''} onValueChange={field.onChange}>
                    <SelectTrigger id="asset_type" className="w-full">
                      <SelectValue placeholder="요청할 물품을 선택해주세요." />
                    </SelectTrigger>

                    <SelectContent>
                      <SelectGroup>
                        {ASSET_TYPE_OPTIONS.map(option => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.title}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
              />

              {errors.asset_type && <FieldError>{errors.asset_type.message}</FieldError>}
            </Field>

            <Field>
              <FieldLabel htmlFor="request_title">제목</FieldLabel>
              <Input id="request_title" placeholder="예: 개발용 노트북 요청" {...register('request_title')} />
              {errors.request_title && <FieldError>{errors.request_title.message}</FieldError>}
            </Field>

            <Field>
              <FieldLabel htmlFor="reason">요청 사유</FieldLabel>
              <Textarea id="reason" className="min-h-32" placeholder="요청 사유를 자세히 작성해주세요." {...register('reason')} />
              {errors.reason && <FieldError>{errors.reason.message}</FieldError>}
            </Field>
          </FieldGroup>
          <div className="flex justify-end gap-2">
            <Button className={cn(buttonStyle.submit, buttonStyle.base)} type="submit" disabled={isPending}>
              {isPending ? '등록 중...' : '등록'}
            </Button>
            <Button className={cn(buttonStyle.delete, buttonStyle.base)} type="button" variant="outline" onClick={() => setOpen(false)}>
              취소
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
