import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

import { EmployeeRoleSchema } from '@/app/feature/sign-up/schema/employeeSchema';
import { hasAllowedRole, isPermissionPathMatch, ROUTE_PERMISSIONS } from '@/config/permissions';

const PUBLIC_PATHS = ['/sign-in', '/forgot-password', '/reset-password', '/auth/callback'] as const;

function isPublicPath(pathname: string): boolean {
  return PUBLIC_PATHS.some(path => pathname === path || pathname.startsWith(`${path}/`));
}

export async function proxy(request: NextRequest) {
  let response = NextResponse.next({
    request,
  });

  const supabase = createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },

      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => {
          request.cookies.set(name, value);
        });

        response = NextResponse.next({
          request,
        });

        cookiesToSet.forEach(({ name, value, options }) => {
          response.cookies.set(name, value, options);
        });
      },
    },
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const pathname = request.nextUrl.pathname;
  const publicPath = isPublicPath(pathname);

  if (!user && !publicPath) {
    const signInUrl = request.nextUrl.clone();

    signInUrl.pathname = '/sign-in';
    signInUrl.search = '';
    signInUrl.searchParams.set('redirectTo', `${pathname}${request.nextUrl.search}`);

    return NextResponse.redirect(signInUrl);
  }

  if (user && pathname === '/sign-in') {
    const dashboardUrl = request.nextUrl.clone();

    dashboardUrl.pathname = '/';
    dashboardUrl.search = '';

    return NextResponse.redirect(dashboardUrl);
  }

  if (!user) {
    return response;
  }

  if (pathname === '/forbidden') {
    return response;
  }

  const { data: employee, error: employeeError } = await supabase.from('employees').select('role').eq('id', user.id).maybeSingle();

  if (employeeError || !employee) {
    return NextResponse.redirect(new URL('/forbidden', request.url));
  }

  const employeeRoleResult = EmployeeRoleSchema.safeParse(employee.role);

  if (!employeeRoleResult.success) {
    return NextResponse.redirect(new URL('/forbidden', request.url));
  }

  const employeeRole = employeeRoleResult.data;
  const requiredPermission = ROUTE_PERMISSIONS.find(({ path }) => isPermissionPathMatch(pathname, path));

  if (requiredPermission && !hasAllowedRole(employeeRole, requiredPermission.allowedRoles)) {
    return NextResponse.redirect(new URL('/forbidden', request.url));
  }

  return response;
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)'],
};
