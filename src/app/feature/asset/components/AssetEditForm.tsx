'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm, useWatch } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

import { Asset, ASSET_STATUS_OPTIONS, ASSET_TYPE_OPTIONS } from '@/config/types/asset';
import { UpdateAssetInput, updateAssetSchema } from '../queryKey/assetSchema';
import { useUpdateAsset } from '../hooks/useUpdateAsset';

interface Props {
  asset: Asset;
  onSuccess: () => void;
}

const getAssetEditDefaultValues = (asset: Asset): UpdateAssetInput => ({
  id: asset.id,
  asset_name: asset.asset_name,
  asset_type: asset.asset_type,
  serial_number: asset.serial_number,
  status: asset.status,
  assigned_employee_id: asset.assigned_employee_id ?? null,
  memo: asset.memo ?? null,
});

export default function AssetEditForm({ asset, onSuccess }: Props) {
  const { mutate, isPending } = useUpdateAsset();

  const {
    control,
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<UpdateAssetInput>({
    resolver: zodResolver(updateAssetSchema),
    defaultValues: getAssetEditDefaultValues(asset),
  });

  const assetType = useWatch({
    control,
    name: 'asset_type',
  });

  const status = useWatch({
    control,
    name: 'status',
  });

  const onSubmit: SubmitHandler<UpdateAssetInput> = values => {
    mutate(values, {
      onSuccess: () => {
        onSuccess();
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <FieldGroup>
        <input type="hidden" {...register('id')} />

        <Field>
          <FieldLabel htmlFor="edit_asset_name">자산명</FieldLabel>
          <Input id="edit_asset_name" placeholder="예: MacBook Pro 14" {...register('asset_name')} />
          {errors.asset_name && <FieldError>{errors.asset_name.message}</FieldError>}
        </Field>

        <Field>
          <FieldLabel htmlFor="edit_asset_type">자산 종류</FieldLabel>
          <Select
            value={assetType}
            onValueChange={(value: UpdateAssetInput['asset_type']) =>
              setValue('asset_type', value, {
                shouldValidate: true,
                shouldDirty: true,
              })
            }
          >
            <SelectTrigger id="edit_asset_type" className="w-full">
              <SelectValue placeholder="자산 종류 선택" />
            </SelectTrigger>

            <SelectContent>
              {ASSET_TYPE_OPTIONS.map(item => (
                <SelectItem key={item.value} value={item.value}>
                  {item.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.asset_type && <FieldError>{errors.asset_type.message}</FieldError>}
        </Field>

        <Field>
          <FieldLabel htmlFor="edit_serial_number">시리얼 번호</FieldLabel>
          <Input
            tabIndex={-1}
            id="edit_serial_number"
            placeholder="예: SN-MBP-2026-001"
            className="text-gray-500 bg-gray-100"
            {...register('serial_number')}
            readOnly
          />
          {errors.serial_number && <FieldError>{errors.serial_number.message}</FieldError>}
        </Field>

        <Field>
          <FieldLabel htmlFor="edit_status">상태</FieldLabel>
          <Select
            value={status}
            onValueChange={(value: UpdateAssetInput['status']) =>
              setValue('status', value, {
                shouldValidate: true,
                shouldDirty: true,
              })
            }
          >
            <SelectTrigger id="edit_status" className="w-full">
              <SelectValue placeholder="상태 선택" />
            </SelectTrigger>

            <SelectContent>
              {ASSET_STATUS_OPTIONS.map(item => (
                <SelectItem key={item.value} value={item.value}>
                  {item.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.status && <FieldError>{errors.status.message}</FieldError>}
        </Field>

        <Field>
          <FieldLabel htmlFor="edit_assigned_employee_id">사용자 ID</FieldLabel>
          <Input id="edit_assigned_employee_id" placeholder="선택 사항" {...register('assigned_employee_id')} />
          {errors.assigned_employee_id && <FieldError>{errors.assigned_employee_id.message}</FieldError>}
        </Field>

        <Field>
          <FieldLabel htmlFor="edit_memo">특이사항</FieldLabel>
          <Textarea id="edit_memo" placeholder="특이사항을 입력하세요." {...register('memo')} />
          {errors.memo && <FieldError>{errors.memo.message}</FieldError>}
        </Field>
      </FieldGroup>

      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={() => reset(getAssetEditDefaultValues(asset))}>
          초기화
        </Button>

        <Button type="submit" disabled={isPending}>
          {isPending ? '수정 중...' : '수정'}
        </Button>
      </div>
    </form>
  );
}
