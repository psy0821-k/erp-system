'use client';

import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

import { Plus } from 'lucide-react';

import { useCreateAssetReport } from '../hooks/useCreateAssetReport';
import { createAssetReportSchema, CreateAssetReportFormInput } from '../schema/assetReportSchema';
import { useMyAssets } from '../hooks/useMyAsset';
import { cn } from '@/lib/utils';
import { buttonStyle } from '@/app/style/buttonStyle';

interface Props {
  reporterId: string;
}

export default function AssetReportCreateDialog({ reporterId }: Props) {
  const [open, setOpen] = useState(false);

  const { mutate, isPending } = useCreateAssetReport();

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<CreateAssetReportFormInput>({
    resolver: zodResolver(createAssetReportSchema),
    defaultValues: {
      asset_id: '',
      reporter_id: reporterId,
      title: '',
      description: '',
    },
  });

  const { data: assets = [] } = useMyAssets(reporterId);

  const onSubmit = (values: CreateAssetReportFormInput) => {
    mutate(values, {
      onSuccess: () => {
        reset({
          asset_id: '',
          reporter_id: reporterId,
          title: '',
          description: '',
        });

        setOpen(false);
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className={cn(buttonStyle.delete, buttonStyle.base)}>
          <Plus className="mr-2 h-4 w-4" />
          고장 신고
        </Button>
      </DialogTrigger>

      <DialogContent className="bg-white sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>고장 신고</DialogTitle>
          <DialogDescription>자산의 고장 내용을 작성해주세요.</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <input type="hidden" {...register('reporter_id')} />

          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="asset_id">자산 선택</FieldLabel>

              <Controller
                name="asset_id"
                control={control}
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger id="asset_id">
                      <SelectValue placeholder="자산을 선택해주세요." />
                    </SelectTrigger>

                    <SelectContent className="bg-white" position="popper">
                      <SelectGroup>
                        {assets.map(asset => (
                          <SelectItem key={asset.id} value={asset.id}>
                            {asset.asset_name}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
              />

              {errors.asset_id && <FieldError>{errors.asset_id.message}</FieldError>}
            </Field>

            <Field>
              <FieldLabel htmlFor="title">제목</FieldLabel>

              <Input id="title" placeholder="고장 제목을 입력해주세요." {...register('title')} />

              {errors.title && <FieldError>{errors.title.message}</FieldError>}
            </Field>

            <Field>
              <FieldLabel htmlFor="description">고장 내용</FieldLabel>

              <Textarea id="description" className="min-h-32" placeholder="고장 증상을 자세히 작성해주세요." {...register('description')} />

              {errors.description && <FieldError>{errors.description.message}</FieldError>}
            </Field>
          </FieldGroup>

          <div className="flex justify-end gap-2">
            <Button className={cn(buttonStyle.create, buttonStyle.base)} type="submit" disabled={isPending}>
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
