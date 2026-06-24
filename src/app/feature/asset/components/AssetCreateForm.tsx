'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, useWatch } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

import { useCreateAsset } from '../hooks/useCreateAsset';
import { AssetCreateInput, assetCreateSchema } from '../queryKey/assetSchema';
import { assetCreateDefaultValues } from '../queryKey/defaultValueAsset';
import { Textarea } from '@/components/ui/textarea';

interface Props {
  onSuccess: () => void;
}

export default function AssetCreateForm({ onSuccess }: Props) {
  const { mutate, isPending } = useCreateAsset();

  const {
    control,
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<AssetCreateInput>({
    resolver: zodResolver(assetCreateSchema),
    defaultValues: assetCreateDefaultValues,
  });

  const assetType = useWatch({
    control,
    name: 'asset_type',
  });

  const status = useWatch({
    control,
    name: 'status',
  });

  const onSubmit = (values: AssetCreateInput) => {
    mutate(values, {
      onSuccess: () => {
        reset();
        onSuccess();
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="asset_name">자산명</FieldLabel>
          <Input id="asset_name" placeholder="예: MacBook Pro 14" {...register('asset_name')} />
          {errors.asset_name && <FieldError>{errors.asset_name.message}</FieldError>}
        </Field>
        <Field>
          <FieldLabel htmlFor="asset_type">자산 종류</FieldLabel>
          <Select
            value={assetType}
            onValueChange={(value: AssetCreateInput['asset_type']) => setValue('asset_type', value, { shouldValidate: true })}
          >
            <SelectTrigger id="asset_type" className="w-full">
              <SelectValue placeholder="자산 종류 선택" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="LAPTOP">노트북</SelectItem>
              <SelectItem value="MONITOR">모니터</SelectItem>
              <SelectItem value="KEYBOARD">키보드</SelectItem>
              <SelectItem value="MOUSE">마우스</SelectItem>
              <SelectItem value="TABLET">태블릿</SelectItem>
              <SelectItem value="ETC">기타</SelectItem>
            </SelectContent>
          </Select>
          {errors.asset_type && <FieldError>{errors.asset_type.message}</FieldError>}
        </Field>
        <Field>
          <FieldLabel htmlFor="serial_number">시리얼 번호</FieldLabel>
          <Input id="serial_number" placeholder="예: SN-MBP-2026-001" {...register('serial_number')} />
          {errors.serial_number && <FieldError>{errors.serial_number.message}</FieldError>}
        </Field>
        <Field>
          <FieldLabel htmlFor="status">상태</FieldLabel>
          <Select value={status} onValueChange={(value: AssetCreateInput['status']) => setValue('status', value, { shouldValidate: true })}>
            <SelectTrigger id="status" className="w-full">
              <SelectValue placeholder="상태 선택" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="AVAILABLE">미사용</SelectItem>
              <SelectItem value="IN_USE">사용중</SelectItem>
              <SelectItem value="REPAIR">수리중</SelectItem>
              <SelectItem value="DISCARDED">폐기</SelectItem>
            </SelectContent>
          </Select>
          {errors.status && <FieldError>{errors.status.message}</FieldError>}
        </Field>
        <Field>
          <FieldLabel htmlFor="assigned_employee_id">사용자 ID</FieldLabel>
          <Input id="assigned_employee_id" placeholder="선택 사항" {...register('assigned_employee_id')} />
          {errors.assigned_employee_id && <FieldError>{errors.assigned_employee_id.message}</FieldError>}
        </Field>
        <Field>
          <FieldLabel htmlFor="memo">특이사항</FieldLabel>

          <Textarea id="memo" placeholder="특이사항을 입력하세요." {...register('memo')} />

          {errors.memo && <FieldError>{errors.memo.message}</FieldError>}
        </Field>
      </FieldGroup>

      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={() => reset()}>
          초기화
        </Button>

        <Button type="submit" disabled={isPending}>
          {isPending ? '등록 중...' : '등록'}
        </Button>
      </div>
    </form>
  );
}
