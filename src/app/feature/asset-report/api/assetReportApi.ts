import { createClient } from '@/lib/client';

import { AssetReport, AssetReportListParams, CreateAssetReportInput, UpdateAssetReportStatusInput } from '../type/assetReportType';

const PAGE_SIZE = 10;

export const getAssetReports = async (params: AssetReportListParams) => {
  const supabase = createClient();

  const page = Number(params.page) || 1;
  const from = (page - 1) * PAGE_SIZE;
  const to = from + PAGE_SIZE - 1;

  let query = supabase
    .from('asset_reports')
    .select(
      `
      *,
      asset:assets!asset_reports_asset_id_fkey!inner (
        id,
        asset_name,
        asset_type,
        serial_number,
        status
      ),
      reporter:employees!asset_reports_reporter_id_fkey!inner (
        id,
        name,
        email,
        employee_number,
        department,
        position
      )
    `,
      { count: 'exact' }
    )
    .order('created_at', { ascending: false });

  if (params.status) {
    query = query.eq('status', params.status);
  }

  if (params.keyword) {
    query = query.or(`title.ilike.%${params.keyword}%,description.ilike.%${params.keyword}%`);
  }

  const { data, error, count } = await query.range(from, to);

  if (error) {
    throw error;
  }

  return {
    reports: data as AssetReport[],
    count,
    totalCount: count ?? 0,
    page,
    pageSize: PAGE_SIZE,
  };
};

export const createAssetReport = async (input: CreateAssetReportInput) => {
  const supabase = createClient();

  const { data, error } = await supabase
    .from('asset_reports')
    .insert({
      asset_id: input.asset_id,
      reporter_id: input.reporter_id,
      title: input.title,
      description: input.description,
      status: 'PENDING',
    })
    .select(
      `
      *,
      asset:assets!asset_reports_asset_id_fkey (
        id,
        asset_name,
        asset_type,
        serial_number,
        status
      ),
      reporter:employees!asset_reports_reporter_id_fkey (
        id,
        name,
        email,
        employee_number,
        department,
        position
      )
    `
    )
    .single();

  if (error) {
    throw error;
  }

  return data as AssetReport;
};

export const updateAssetReportStatus = async (input: UpdateAssetReportStatusInput) => {
  const supabase = createClient();

  const { id, status, admin_message } = input;

  const { data, error } = await supabase
    .from('asset_reports')
    .update({
      status,
      admin_message: admin_message ?? null,
      updated_at: new Date().toISOString(),
    })
    .eq('id', id)
    .select('*')
    .single();

  if (error) {
    throw error;
  }

  return data as AssetReport;
};
export const deleteAssetReport = async (id: string) => {
  const supabase = createClient();

  const { error } = await supabase.from('asset_reports').delete().eq('id', id);

  if (error) {
    throw error;
  }

  return id;
};

export const getMyAssets = async (employeeId: string) => {
  const supabase = createClient();

  const { data, error } = await supabase
    .from('assets')
    .select(
      `
      id,
      asset_name,
      asset_type,
      serial_number,
      status
    `
    )
    .eq('assigned_employee_id', employeeId)
    .order('asset_name');

  if (error) {
    throw error;
  }

  return data;
};
