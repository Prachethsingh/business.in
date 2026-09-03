"use client";

export const dynamic = 'force-dynamic';

import { Suspense } from 'react';
import ResetPasswordForm from "./ResetPasswordForm";
import { useSearchParams } from "next/navigation";

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResetPasswordSearchParams />
    </Suspense>
  );
}

function ResetPasswordSearchParams() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token") ?? "";
  return <ResetPasswordForm token={token} />;
}