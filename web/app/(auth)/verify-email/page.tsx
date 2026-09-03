"use client";

export const dynamic = 'force-dynamic';

import { Suspense } from 'react';
import VerifyEmailForm from "./VerifyEmailForm";
import { useSearchParams } from "next/navigation";

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VerifyEmailSearchParams />
    </Suspense>
  );
}

function VerifyEmailSearchParams() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token") ?? "";
  return <VerifyEmailForm token={token} />;
}